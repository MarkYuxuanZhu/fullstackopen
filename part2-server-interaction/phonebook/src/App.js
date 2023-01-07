import { useState, useEffect } from 'react'
import { deepEqual } from './utils/DeepEqual'
import axios from 'axios'


const Filter = (props) => {
  return (
    <div>
      filter shown with<input value={props.filter}
        onChange={props.handleChange} />
    </div>
  )
}

const Form = ({ onSubmit, newName, newNumber, setNewName, setNewNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName}
          onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>number: <input value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ personsToShow }) =>
  personsToShow.map((person, i) => <div key={i}>{person.name} {person.number}</div>)


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const setNew = () => {
    setNewName('')
    setNewNumber('')
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const newObject = { name: `${newName}`, number: `${newNumber}` }
    for (const person of persons) {
      if (deepEqual(person.name, newObject.name)) {
        alert(`${person.name} is already added to phonebook`)
        setNew()
        return
      }
    }
    setPersons(persons.concat(newObject))
    setNew()
  }
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(
      (response) => setPersons(response.data)
    )
  }, [])
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={(e) => setFilter(e.target.value)} />
      <h2>Add a new</h2>
      <Form onSubmit={onSubmit} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Person personsToShow={personsToShow} />
    </div>
  )
}

export default App