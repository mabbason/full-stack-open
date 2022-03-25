import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

// const DisplayStat = (props) => {
//   return (
//     <p>{props.text} {props.value}</p>
//   )
// }

const DisplayTableRow = (props) => {
  return (
    <tr>
      <td>{props.heading}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  const { good, neutral, bad } = props.statsData
  const all = good + neutral + bad

  const getAverage = () => (good + (bad * -1)) / all
  const getPosPercnt = () => `${good / all}%`

  // const tableData = {
  //   ...props.statsData,
  //   all, 
  //   average: getAverage(),
  //   positive: getPosPercnt(),
  // }
  
  if (!all) {
    return (
      <>
        <h1>statistics</h1>

        <p>No feedback given</p>
    </>
    )
  }

  return (
    <>
      <h1>statistics</h1>

       <table >
        <tbody>
          <DisplayTableRow heading="good" value={good} />
          <DisplayTableRow heading="neutral" value={neutral} />
          <DisplayTableRow heading="bad" value={bad} />
          <DisplayTableRow heading="all" value={all} />
          <DisplayTableRow heading="average" value={getAverage()} />
          <DisplayTableRow heading="positive" value={getPosPercnt()} />
        </tbody>
      </table>

      {/* <DisplayStat text="good" value={good} />
      <DisplayStat text="neutral" value={neutral} />
      <DisplayStat text="bad" value={bad} />
      <DisplayStat text="all" value={all} />
      <DisplayStat text="average" value={getAverage()} />
      <DisplayStat text="positive" value={getPosPercnt()} /> */}
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const updateSelected = () => setSelected(Math.floor((Math.random() * 7)))
  const handleClick = (handler, value) => handler(value + 1)
  
  const statsData = { good, neutral, bad }

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={() => handleClick(setGood, good)} text="good"/>
      <Button onClick={() => handleClick(setNeutral, neutral)} text="neutral"/>
      <Button onClick={() => handleClick(setBad, bad)} text="bad"/>

      <Statistics statsData={statsData} />

      <Button onClick={updateSelected} text="random anecdote" />
      <div>
        {anecdotes[selected]}
      </div>
    </div>
  )
}

export default App