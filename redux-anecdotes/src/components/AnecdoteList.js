import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterBy = useSelector(state => {
    return state.filterBy.toLowerCase()
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    return () => {
      dispatch(voteFor(anecdote.id, anecdotes))
      dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
    }
  }

  const showAnecdotes = () => {

    return filterBy
      ? anecdotes.filter(a => a.content.toLowerCase().includes(filterBy))
      : anecdotes 
  }

  return (
    <>
    {showAnecdotes().map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteList

