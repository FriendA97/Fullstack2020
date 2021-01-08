import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/Personform";
import Persons from "./components/Persons";
import {
  getAllPersons,
  createPerson,
  deletePerson,
  updatePerson,
} from "./services";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getAllPersons().then((persons) => setPersons(persons));
  }, []);

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      const changedPerson = {
        ...persons.find((person) => person.name === newName),
        number: newPhone,
      };
      updatePerson(changedPerson)
        .then((personid) => {
          setPersons(
            persons.map((person) =>
              person.id !== personid.id ? person : changedPerson
            )
          );
          setNewName("");
          setNewPhone("");
          setSuccessMessage("Changed phone number successfully");
          setTimeout(() => setSuccessMessage(null), 3000);
        })
        .catch((error) => {
          setErrorMessage(
            `the person ${changedPerson.name} was already deleted from server`
          );
          setPersons(
            persons.filter((person) => person.id !== changedPerson.id)
          );
          setTimeout(() => setErrorMessage(null), 3000);
        });
    } else {
      const newPerson = { name: newName, number: newPhone };
      createPerson(newPerson)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
        })
        .catch((error) => setErrorMessage(error.response.data));
      setNewName("");
      setNewPhone("");
      setSuccessMessage(`Added ${newPerson.name}`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleDeletePerson = (name, id) => {
    window.confirm(`Delete ${name}`);
    deletePerson(id).then((deletedPerson) =>
      setPersons(persons.filter((person) => person.id !== id))
    );
  };

  const hanldeFilterInputChange = (e) => {
    setFilterInput(e.target.value);
    const filtered = persons.filter(
      (person) =>
        e.target.value && person.name.toLowerCase().includes(e.target.value)
    );
    setFilteredPersons(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage ? (
        <Notification message={successMessage} type="success" />
      ) : errorMessage ? (
        <Notification message={errorMessage} type="error" />
      ) : null}
      <Filter
        value={filterInput}
        handleChange={hanldeFilterInputChange}
        filteredPersons={filteredPersons}
      />
      <h2>Add a new</h2>
      <PersonForm
        handleAddPerson={handleAddPerson}
        handleInputChange={handleInputChange}
        handlePhoneChange={handlePhoneChange}
        name={newName}
        number={newPhone}
      />
      <h2>Numbers</h2>
      <Persons handleDeletePerson={handleDeletePerson} persons={persons} />
    </div>
  );
};
export default App;
