import { useState } from 'react'

// Components
const Header = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Buttons = ({options, handleClick}) => (
  <div>
    {options.map((option) => (
      <Button key={option.button_id} onClick={handleClick(option)} text={option.text} />
    ))}
  </div>
)

const Total = ({options}) => (
  <p>
    {options.map((option) => (<span key={option.total_id}>{option.text} {option.state_var}<br /></span>))}
  </p>
)


const App = () => {
  // This application displays the total number of collected feedback for each category: good, neutral and bad.

  // state definition
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // event handlers
  const handleClick = (option) => () => {
    console.log('Pressed', option.text, 'button. Previous value:', option.state_var)
    const updatedVar = option.state_var + 1
    option.state_func(updatedVar)
    console.log('New value is:', updatedVar)
  }

  // var definition
  const header1 = 'Give feedback'
  const header2 = 'Statistics'
  const feedback_options = [
    {
      button_id: 'good_button',
      total_id: 'good_total',
      text: 'GOOD',
      state_var: good,
      state_func: setGood
    },
    {
      button_id: 'neutral_button',
      total_id: 'neutral_total',
      text: 'NEUTRAL',
      state_var: neutral,
      state_func: setNeutral
    },
    {
      button_id: 'bad_button',
      total_id: 'bad_total',
      text: 'BAD',
      state_var: bad,
      state_func: setBad
    }
  ]

  // app body
  return (
    <div>
      <Header text={header1} />
      <Buttons options={feedback_options} handleClick={handleClick} />
      <Header text={header2} />
      <Total options={feedback_options} />
    </div>
  )
}

export default App