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
  const [newSearch, setNewSearch] = useState('')

  const handleSearch = (e) => {
    setNewSearch(e.target.value)
    console.log(e.target.value)
  }


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
        <div>
          filter shown with: <input onChange={handleSearch} />
        </div>
      <h2>add a new</h2>
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
      {persons.filter(person => person.name.toLowerCase().includes(newSearch)).map(person => (  
        <p>{person.name}  {person.number}</p>
      ))}
    </div>
  )
}

export default App