import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  const showNotification = (message, type = 'success') => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(p => setPersons(p))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    )
    
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {

        const changedPerson = {...existingPerson, number: newNumber}
        personService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((p) => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${existingPerson.name}`, "success")
          })
          .catch(error => {
            showNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error')
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            console.error(error)
          })
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1
    }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${newPerson.name}`, 'success')
      })

      // setPersons(persons.concat(newPerson))
      // setNewName('')
      // setNewNumber('')
      // showNotification(`Added ${newPerson.name}`, 'success')

  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
        showNotification(`information of ${person.name} has already removed from server`, 'error')
        setPersons(persons.filter(p => p.id !== id))
        console.log(`error: ${error}`)
      })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} type={notificationType} />

      <Filter value={newSearch} onChange={handleSearchChange} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} search={newSearch} deletePerson={deletePerson}  />
    </div>
  )
}

export default App