import { useState, useEffect } from 'react'
import Note from "./components/Note"
import Notification from './components/Notification'
import noteService from './services/notes'

const App = () => {
  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState('a new note...')
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMsg, setErrorMsg ] = useState('some error happened...')

  const initialDatabaseGet = () => {
    noteService
    .getAll()
    .then(initialNotes => setNotes(initialNotes))
  }
  useEffect(initialDatabaseGet, [])
  
  const notesToShow = showAll ?
    notes : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(addedNote => {
        setNotes([...notes, addedNote])
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}
    
    noteService
      .update(id, changedNote)
      .then(updatedNote => {
        setErrorMsg(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
 
  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
      </div>
    )
  }

  return ( 
    <>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)} />
          )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </>
    )
}

export default App