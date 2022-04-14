import { useDispatch, useSelector } from 'react-redux'
import { incrementVoteOf } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterBy = useSelector(state => {
    console.log(state)
    return state.filterBy.toLowerCase()
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    return () => {
      dispatch(incrementVoteOf(anecdote.id))
      const msg = `You voted '${anecdote.content}'`
      dispatch(setNotification(msg))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
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

