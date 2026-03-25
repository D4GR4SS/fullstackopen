import { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase(),
      )
    ) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');

      return;
    }

    const newObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    axios.post('http://localhost:3001/persons', newObject).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName('');
      setNewNumber('');
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
