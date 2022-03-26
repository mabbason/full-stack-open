import { useState, useEffect } from 'react'
import personService from './services/persons'

const Persons = ({ persons, onClick }) => {
  return (
    <>
      {persons.map(person => <Person key={person.id} 
                                     person={person}
                                     onClick={onClick} />)}
    </>
  )
}

const Person = ({ person, onClick }) => {
  return (
    <p>{person.name} {person.number} 
      <button onClick={onClick} data-id={person.id}>
        delete
      </button>
    </p>
  )
}

const FilterPpl = ({ filterBy, onChange }) => {
  return (
    <div>
      filter people by... <input 
        value={filterBy}
        onChange={onChange}
      />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterBy, setFilterBy] = useState('')

  const initialDatabaseGet = () => {
    personService
    .getAll()
    .then(initContactList => setPersons(initContactList))
  }
  useEffect(initialDatabaseGet, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (isUniqueName(newName)) {
      const personObj = {
        name: newName,
        number: newNum,
      }

      personService
        .create(personObj)
        .then(newContact => {
          setPersons([...persons, newContact])
          setNewName('')
          setNewNum('')
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const contact = persons.find(p => p.name.toLowerCase() === 
                                          newName.toLowerCase())
        const updatedInfo = { ...contact, number: newNum}
        
        personService
          .update(contact.id, updatedInfo)
          .then(updatedContact => {
            const listWithoutUpdated = persons.filter(p => p.id !== contact.id)
            setPersons([...listWithoutUpdated, updatedContact])
            setNewName('')
            setNewNum('')
          })
      }
    }
    
  }

  const handleNameChange = e => setNewName(e.target.value)

  const handleNumChange = e => setNewNum(e.target.value)
  
  const handleFilterChange = e => setFilterBy(e.target.value)
 
  const handleDeleteBtn = e => {
    const contactId = e.target.getAttribute('data-id')
    const contactName = persons.find(p => p.id === Number(contactId)).name
    if (window.confirm(`Delete ${contactName}?`)) {
      personService
        .remove(contactId)
        .then(res => {
          if (res.status === 200) {
            const newPersons = persons.filter(p => p.id !== Number(contactId))
            setPersons(newPersons)
          }
        })
        .catch(_ => console.log('failed to remove'))
    }
  }

  const pplToShow = (() => {
    const filterInput = filterBy.trim()
    return persons.filter( person => 
      person.name.toLowerCase().includes(filterInput) )
  })()

  const isUniqueName = (name) => {
    return persons.every(p => {
      return p.name.toLowerCase() !== name.toLowerCase() 
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <FilterPpl 
          filterBy={filterBy} 
          onChange={handleFilterChange}
        />
        
      <h2>Add Someone</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNum}
            onChange={handleNumChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Persons</h2>
      <Persons persons={pplToShow} onClick={handleDeleteBtn}/>
    </div>
  )
}

export default App