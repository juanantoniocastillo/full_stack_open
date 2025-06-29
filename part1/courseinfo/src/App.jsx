const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
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
      <Part part_name={props.course.parts[0].name} excercises_number={props.course.parts[0].exercises} />
      <Part part_name={props.course.parts[1].name} excercises_number={props.course.parts[1].exercises} />
      <Part part_name={props.course.parts[2].name} excercises_number={props.course.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course} />
    </>
  )
}

export default App