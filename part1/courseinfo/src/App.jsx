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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const content_info = [
    {part_name: part1.name, excercises_number: part1.exercises},
    {part_name: part2.name, excercises_number: part2.exercises},
    {part_name: part3.name, excercises_number: part3.exercises},
  ]

  return (
    <>
      <Header text={course} />
      <Content content_info={content_info}/>
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </>
  )
}

export default App