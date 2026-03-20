const PersonForm = ({
  onSubmit,
  newName,
  onNameChange,
  onNumberChange,
  newNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input type="text" value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input type="tel" value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
