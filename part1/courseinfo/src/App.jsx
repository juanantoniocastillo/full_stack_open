const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <p>{props.part_name} {props.excercises_number}</p>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part part_name={props.content_info[0].part_name} excercises_number={props.content_info[0].excercises_number} />
      <Part part_name={props.content_info[1].part_name} excercises_number={props.content_info[1].excercises_number} />
      <Part part_name={props.content_info[2].part_name} excercises_number={props.content_info[2].excercises_number} />
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

  const content_info = [
    {part_name: part1, excercises_number: exercises1},
    {part_name: part2, excercises_number: exercises2},
    {part_name: part3, excercises_number: exercises3},
  ]

  return (
    <>
      <Header text={course} />
      <Content content_info={content_info}/>
      <Total total={exercises1 + exercises2 + exercises3} />
    </>
  )
}

export default App