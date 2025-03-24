const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => {
  // const arr_exercises = parts.map(part => part.exercises)
  // const total = arr_exercises.reduce((p,s) => p+s,0)
  const total = parts.reduce((p, part) => p + part.exercises, 0);

  
  
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part}/>)}
      <Total total={total}/>
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Course = (props) => (
  <div>
    <Header course={props.course.name} />
    <Content parts={props.course.parts} />
  </div>
)

const Total = (props) => <p><b>Number of exercises {props.total}</b></p>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App