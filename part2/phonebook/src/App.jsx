import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '03432343' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  const handleInputNum = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
     
    const p = persons.concat({name: newName, number: newNumber})
    setNewName('')
    setPersons(p)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleInput} value={newName} />
        </div>
        <div>
          number: <input onChange={handleInputNum} value={newNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (  
        <p>{person.name}  {person.number}</p>
      ))}
    </div>
  )
}

export default App