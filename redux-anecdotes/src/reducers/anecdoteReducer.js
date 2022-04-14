import { createSlice } from '@reduxjs/toolkit'

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
      const id = action.payload
      let votedAnecdote = state.find(a => a.id === id) 
      votedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      const anecdotes = state.filter(a => a.id !== id)
      return sortAnecdotes([...anecdotes, votedAnecdote])
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, incrementVoteOf, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer