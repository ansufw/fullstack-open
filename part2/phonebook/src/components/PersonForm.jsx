import { useState } from 'react'


const PersonForm = ({persons, setPersons}) => {

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
  )

}

export default PersonForm;