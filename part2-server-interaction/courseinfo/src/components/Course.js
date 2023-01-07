const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><b>Number of exercises {sum}</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((part) => <Part key={part.id} part={part}/>)}
  </>


const Course = (props) => {
    const {name, parts} = props.course
    const sum = parts.reduce((s, p) => {
       return s + p.exercises
    }, 0)
    return (
      <>
        <Header course={name} />
        <Content parts={parts} />
        <Total sum={sum} />
      </>
    )
}
export default Course