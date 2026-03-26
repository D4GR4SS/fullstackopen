const PersonForm = ({
  onSubmit,
  newName,
  onNameChange,
  onNumberChange,
  newNumber,
}) => {
  const flexStyle = {
    display: 'flex',
    gap: '20px',
  };

  return (
    <form onSubmit={onSubmit} style={flexStyle}>
      <div>
        name: <input type='text' value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input type='tel' value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
