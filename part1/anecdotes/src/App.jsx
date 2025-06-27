import { useState } from 'react'

//functions
const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

//components
const Anecdote = ({anecdotes, selected}) => (
  <p>
    {anecdotes[selected]}
  </p>
)

const Votes = ({votes, selected}) => (
  <p>
    Has {votes[selected]} votes.
  </p>
)

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)


/*This application shows random anecdotes of Software Engineering */
const App = () => {
  // var definition
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // state definition 
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  // event handlers
  const handleNextClick = () => {
    let random_number = getRandomInt(0, anecdotes.length)
    while (random_number === selected) {
      console.log('Repeated number')
      random_number = getRandomInt(0, anecdotes.length)
    }
    console.log('Random number is:', random_number)
    setSelected(random_number)
  }
  const handleVoteClick = () => {
      const updatedVotes = [...votes]
      updatedVotes[selected] += 1
      console.log('Updated votes are:', updatedVotes)
      setVotes(updatedVotes)
  }

  // app body
  return (
    <div>
      <Anecdote anecdotes={anecdotes} selected={selected} />
      <Votes votes={votes} selected={selected} />
      <Button onClick={handleVoteClick} text={'vote'} />
      <Button onClick={handleNextClick} text={'next anecdote'} />
    </div>
  )
}

export default App