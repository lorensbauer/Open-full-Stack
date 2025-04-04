import { useState } from 'react'

const Ganador = (props) => {
  const index = props.votes.indexOf(Math.max(...props.votes))
  console.log(props.votes)
  console.log(index)
  return (
    <>
    <p>{props.anecdotes[index]} has {props.votes[index]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  
  const getRandomInt = (min,max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const handleNextClick = () => {
    const n_rand = getRandomInt(0,anecdotes.length - 1)
    setSelected(n_rand)
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  
    
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleNextClick}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Ganador anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App