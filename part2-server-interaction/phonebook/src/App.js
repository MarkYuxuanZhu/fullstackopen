import { useState, useEffect } from 'react'
import { deepEqual } from './utils/DeepEqual'
import phonebook from './services/phonebook'
import './index.css'


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

const Person = ({ personsToShow, remove }) => {

  return (
    personsToShow.map((person) =>
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => remove(person.id, person.name)}>delete</button>
      </div>
    )
  )
}

const Notification = ({ message }) => {
  if (message === null || deepEqual(message, {})) {
    return null
  } else if (message.type === "message") {
    return (
      <div className='message'>
        {message.text}
      </div>
    )
  } else if (message.type === "error") {
    return (
      <div className="error">
        {message.text}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({})

  const alreadyRemovedNote = (persons, name, id) => {
    setMessage({text: `Information of ${name} has already been removed from server`,
                        type: "error"})
    setPersons(persons.filter((p) => p.id !== id))
    setTimeout(() => setMessage(null), 5000)
  }

  const addSuccessNote = (person) => {
    setPersons(persons.concat(person))
    setMessage({ text: `Added ${person.name}`, type: "message" })
    setTimeout(() => setMessage(null), 5000) 
  }

  const setNew = () => {
    setNewName('')
    setNewNumber('')
  }

  const remove = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      phonebook.remove(id).then(_ => {
        const newPersons = persons.filter((person) => person.id !== id)
        setPersons(newPersons)
      }).catch( (error) =>
        alreadyRemovedNote(persons, name, id)
      )
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const newObject = { name: `${newName}`, number: `${newNumber}` }
    for (const person of persons) {
      if (deepEqual(person.name, newObject.name)) {
        if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
          phonebook.update(person.id, newObject).then(returnedPerson => {
            const newPersons = persons.map((p) => p.id !== returnedPerson.id ? p : returnedPerson)
            setPersons(newPersons)
          }).catch(_ => {
            alreadyRemovedNote(persons, person.name, person.id)
          }) 
        }
        setNew()
        return
      }
    }
    phonebook.create(newObject).then((person) => {
      addSuccessNote(person)
    })
    setNew()
  }

  useEffect(() => {
    phonebook.getAll().then(personResponse => setPersons(personResponse))
  }, [])

  const personsToShow = persons.filter((p) => {
    return (p.hasOwnProperty('name')) ?
      p.name.toLowerCase().includes(filter.toLowerCase()) : false
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleChange={(e) => setFilter(e.target.value)} />
      <h2>Add a new</h2>
      <Form onSubmit={onSubmit} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Person personsToShow={personsToShow} remove={remove} />
    </div>
  )
}

export default App