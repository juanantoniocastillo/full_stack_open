import { useState } from 'react'

//aux functions
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min)

//components
const Header = ({text}) => (
  <h1>{text}</h1>
)

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

const BestAnecdote = ({anecdotes, votes}) => {
  const maxVotes = Math.max(...votes)
  if (maxVotes === 0) {
    return <p>No anecdotes have been voted for yet.</p>
  }
  const bestAnecdoteIndex = votes.indexOf(maxVotes)
  console.log('Best anecdote index:', bestAnecdoteIndex)
  return (
    <div>
      <p>{anecdotes[bestAnecdoteIndex]}</p>
      <p>Has {maxVotes} votes.</p>
    </div>
  )
}


/*This application shows random anecdotes of Software Engineering;
allow the user to vote them;
and shows the most voted anecdote*/

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
  const title1 = 'Anecdote of the day'
  const title2 = 'Anecdote with most votes'

  // state definition 
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  // event handlers
  const handleNextClick = () => {
    let randomNumber = getRandomInt(0, anecdotes.length)
    while (randomNumber === selected) {
      console.log('Repeated number')
      randomNumber = getRandomInt(0, anecdotes.length)
    }
    console.log('Random number is:', randomNumber)
    setSelected(randomNumber)
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
      <Header text={title1} />
      <Anecdote anecdotes={anecdotes} selected={selected} />
      <Votes votes={votes} selected={selected} />
      <Button onClick={handleVoteClick} text={'vote'} />
      <Button onClick={handleNextClick} text={'next anecdote'} />
      <Header text={title2} />
      <BestAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App