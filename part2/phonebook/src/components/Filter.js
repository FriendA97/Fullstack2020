const Filter = ({ value, handleChange, filteredPersons }) => {
  return (
    <div>
      filter shown with: <input onChange={handleChange} value={value} />
      {filteredPersons.map((person) => (
        <p key={person.number}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Filter;
