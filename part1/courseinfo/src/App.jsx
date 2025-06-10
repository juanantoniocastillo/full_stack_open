const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      {Object.entries(props).map(([key, value]) => (
        <p key={key}>
          {value}
        </p>
      ))}
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header text={course} />
      <Content par1={part1 + ' ' + exercises1} par2={part2 + ' ' + exercises2} par3={part3 + ' ' + exercises3}/>
      <Total total={exercises1 + exercises2 + exercises3} />
    </>
  )
}

export default App