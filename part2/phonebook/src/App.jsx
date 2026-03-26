import { useState, useEffect } from 'react';
// import axios from 'axios';
import personService from './services/persons';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingObject = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase(),
    );

    if (existingObject) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const updatedObject = { ...existingObject, number: newNumber };

        personService
          .update(existingObject.id, updatedObject)
          .then((response) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingObject.id ? p : response.data,
              ),
            );
            setNewName('');
            setNewNumber('');
          });
      }
      return;
    }

    const newObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    personService.create(newObject).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName('');
      setNewNumber('');
    });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
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

      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
