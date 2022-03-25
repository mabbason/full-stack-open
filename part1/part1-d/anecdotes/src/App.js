import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const DisplayTopAnecdote = ({ votes, anecdotes }) => {
  const maxVotes = votes.reduce((max, cv) => max > cv ? max: cv)
  const topAnecdote = anecdotes[votes.indexOf(maxVotes)]
  if (!votes.every(tally => tally === 0)) {
    return (
      <>
        <p>{topAnecdote}</p>
        <p>has {maxVotes} votes</p>
      </>
      
    )
  }
  return (
    <p>None of the anecdotes currently have votes</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const zeroVotesArr = new Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [votes, tallyVote] = useState(zeroVotesArr)

  const updateSelected = () => setSelected(Math.floor((Math.random() * 7)))
  const castVote = () => {
    let newVotes = [...votes]
    newVotes[selected] += 1
    tallyVote(newVotes)
  }
  
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <p>has {votes[selected]} votes</p>
      <Button onClick={castVote} text="vote" />
      <Button onClick={updateSelected} text="random anecdote" />

      <h1>Anecdote with most votes</h1>
      <DisplayTopAnecdote votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App