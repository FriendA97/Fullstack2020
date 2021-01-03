import axios from "axios";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/Personform";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    const getFetchUrl = () => {
      return "http://localhost:3001/persons";
    };
    axios.get(getFetchUrl()).then((response) => setPersons(response.data));
  }, []);

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newPhone }));
      setNewName("");
      setNewPhone("");
    }
  };

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
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
      <Persons persons={persons} />
    </div>
  );
};
export default App;
