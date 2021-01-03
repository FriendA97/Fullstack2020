const Personform = ({
  handleAddPerson,
  handleInputChange,
  handlePhoneChange,
  name,
  number,
}) => {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input onChange={handleInputChange} value={name} />
      </div>
      <div>
        number: <input onChange={handlePhoneChange} value={number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Personform;
