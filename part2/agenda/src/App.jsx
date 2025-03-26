import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(persons)
    console.log(personObject.name);

    if (!persons.map(person => person.name).includes(personObject.name)) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(`${personObject.name} is already added to phonebook`)
    }

  }

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLocaleLowerCase()))
  

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input  value={newFilter} onChange={handleFilterChange}/>
      <form onSubmit={addPerson}>
        <h2>Add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default App