import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

const sortAnecdotes = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    incrementVoteOf(state, action) {
      const upVotedAnecdote = action.payload
      const anecdotes = state.filter(a => a.id !== upVotedAnecdote.id)
      return sortAnecdotes([...anecdotes, upVotedAnecdote])
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return sortAnecdotes(action.payload)
    }
  }
})

export const { incrementVoteOf, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = (id, anecdotes) => {
  return async dispatch => {
    let votedAnecdote = anecdotes.find(a => a.id === id) 
    votedAnecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1
    }
    const upVotedAnecdote = await anecdoteService.upVote(id, votedAnecdote)
    dispatch(incrementVoteOf(upVotedAnecdote))
  }
}

export default anecdoteSlice.reducer