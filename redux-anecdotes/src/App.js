import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import anecdoteService from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll()
      .then(notes => dispatch(setAnecdotes(notes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App