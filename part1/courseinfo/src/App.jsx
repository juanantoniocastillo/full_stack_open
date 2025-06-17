const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
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
      <Part part_name={props.parts[0].name} excercises_number={props.parts[0].exercises} />
      <Part part_name={props.parts[1].name} excercises_number={props.parts[1].exercises} />
      <Part part_name={props.parts[2].name} excercises_number={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts} />
    </>
  )
}

export default App