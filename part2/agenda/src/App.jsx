import { useEffect, useState } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'


let messageType = "success"
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)



  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(personObject)
    if (!persons.map(person => person.name).includes(personObject.name)) {
      console.log("Entra aqui")
      personService
        .create(personObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNewMessage(
            `${personObject.name} succesfully added`
          )
          setTimeout(() => {
            setNewMessage(null)
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
            setNewMessage(
              `${returnedPerson.name} succesfully updated`
            )
            setTimeout(() => {
              setNewMessage(null)
            }, 5000);
          }).catch(error => {
            setNewMessage(`Information of ${personOld.name} has already been removed from server`)
            messageType = "error"
            setNewName('')
            setNewNumber('')
            setPersons(persons.filter(p => p.id !== personOld.id))
            setTimeout(() => {
              setNewMessage(null)
            }, 5000);
          }

          )

      }
    }

  }

  const deletePerson = (person) => {
    if (window.confirm(`Quieres borrar a ${person.name}?`)) {
      personService
        .del(person.id)
        .then(returnedData => {
          console.log(`Borrado: ${returnedData.name} con id: ${returnedData.id}`)
          setPersons(persons.filter(p => p.id !== person.id))
        }).catch(
          error => {
            setNewMessage(`Information of ${person.name} has already been removed from server`)
            messageType = "error"
            setNewName('')
            setNewNumber('')
            setPersons(persons.filter(p => p.id !== person.id))
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)
          }
        )
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

      <Notification className={messageType} message={newMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App