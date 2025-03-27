import { useEffect, useState } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccesMessage] = useState(null)

  useEffect(() => {
    console.log('efect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(persons)
    console.log(personObject.name);

    if (!persons.map(person => person.name).includes(personObject.name)) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccesMessage(
            `${personObject.name} succesfully added`
          )
          setTimeout(() => {
            setSuccesMessage(null)
          }, 5000);
        })

    }
    else {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personOld = persons.find(p => p.name === personObject.name)
        const changedPersonNum = { ...personOld, number: personObject.number }

        personService
          .update(personOld.id, changedPersonNum)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== personOld.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setSuccesMessage(
              `${returnedPerson.name} succesfully updated`
            )
            setTimeout(() => {
              setSuccesMessage(null)
            }, 5000);
          })

      }
    }

  }

  const deletePerson = (person) => {
    if (window.confirm(`Quieres borrar a ${person.name}?`)) {
      console.log(person)
      personService
        .del(person.id)
        .then(returnedData => {
          console.log(`Borrado: ${returnedData.name} con id: ${returnedData.id}`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLocaleLowerCase()))



  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App