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

const StatisticRow = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({clickValues, good, neutral, bad}) => {
  // No feedback message
  if (clickValues.length === 0) {
    return (<p>No feedback given</p>)
  }

  // Average calculation
  let sum = 0
  clickValues.map((value) => (sum += value))
  const average = sum / clickValues.length

  // Positive calculation
  const positive = String((good/clickValues.length)*100) + '%'

  // Satistics render
  return (
    <table>
      <tbody>
        <StatisticRow text={'GOOD:'} value={good} />
        <StatisticRow text={'NEUTRAL:'} value={neutral} />
        <StatisticRow text={'BAD:'} value={bad} />
        <StatisticRow text={'All:'} value={clickValues.length} />
        <StatisticRow text={'Average:'} value={average} />
        <StatisticRow text={'Positive:'} value={positive} />
      </tbody>
    </table>
  )
}

// This application displays the total number of collected feedback for each category: good, neutral and bad; the total number of feedback; the average feedback; and the positive feedback percentage.
const App = () => {
  // state definition
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [clickValues, setClickvalues] = useState([])

  // var definition
  const header1 = 'Give feedback'
  const header2 = 'Statistics'
  const feedback_options = [
    {
      button_id: 'good_button',
      total_id: 'good_total',
      text: 'GOOD',
      state_var: good,
      state_func: setGood,
      value: 1
    },
    {
      button_id: 'neutral_button',
      total_id: 'neutral_total',
      text: 'NEUTRAL',
      state_var: neutral,
      state_func: setNeutral,
      value: 0
    },
    {
      button_id: 'bad_button',
      total_id: 'bad_total',
      text: 'BAD',
      state_var: bad,
      state_func: setBad,
      value: -1
    }
  ]

  // event handlers
  const handleClick = (option) => () => {
    console.log('Pressed', option.text, 'button. Previous count:', option.state_var)
    const updatedVar = option.state_var + 1
    const updatedClickvalues = clickValues.concat(option.value)
    setClickvalues(updatedClickvalues)
    option.state_func(updatedVar)
    console.log('New count is:', updatedVar)
    console.log('Stored values are:', updatedClickvalues)
  }

  // app body
  return (
    <div>
      <Header text={header1} />
      <Buttons options={feedback_options} handleClick={handleClick} />
      <Header text={header2} />
      <Statistics clickValues={clickValues} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App