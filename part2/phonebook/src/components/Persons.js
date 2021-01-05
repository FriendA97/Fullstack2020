const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <>
      {persons.map((person) => (
        <div
          key={person.id}
          style={{
            display: "flex",
            width: "30%",
            justifyContent: "space-between",
          }}
        >
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={() => handleDeletePerson(person.name, person.id)}>
            delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Persons;
