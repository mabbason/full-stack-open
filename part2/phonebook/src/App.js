import { useState } from 'react'

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(person => <Person key={person.name} person={person}/>)}
    </>
  )
}

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterBy, setFilterBy] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumChange = (event) => setNewNum(event.target.value)
  
  const handleFilterChange = (event) => setFilterBy(event.target.value)
 
  const pplToShow = (() => {
    const filterInput = filterBy.trim()
    return persons.filter( person => 
      person.name.toLowerCase().includes(filterInput) )
  })()

  const addPerson = (event) => {
    event.preventDefault()
    if (isUniqueName(newName)) {
      const personObj = {
        name: newName,
        number: newNum,
      }
      setPersons([...persons, personObj])
      setNewName('')
      setNewNum('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    
  }

  const isUniqueName = (name) => {
    return persons.every(p => {
      console.log(p.name, name)
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
      <Persons persons={pplToShow} />
    </div>
  )
}

export default App