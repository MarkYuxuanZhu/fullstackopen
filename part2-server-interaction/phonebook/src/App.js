import { useState } from 'react'
import { deepEqual } from './utils/DeepEqual'


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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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