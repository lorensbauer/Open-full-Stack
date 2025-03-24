const Header = (props) => <h1>{props.course}</h1>

const Content = ({ parts }) => {
  

  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)
const Total = (props) => <p><b>Number of exercises {props.total}</b></p>

const Course = (props) => {
  // const arr_exercises = parts.map(part => part.exercises)
  // const total = arr_exercises.reduce((p,s) => p+s,0)
  const total = props.course.parts.reduce((p, part) => p + part.exercises, 0);
  
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total total={total} />
    </div>
  )
}

export default Course