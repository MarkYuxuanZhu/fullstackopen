import { useState } from 'react'

const Statistics = (props) => {
  const {bad, neutral, good} = props
  const getTotal = () => (good + neutral + bad)
  const getAverage = () => (good*1 + neutral*0 + bad * -1)/getTotal()
  return (
    <div>
      <table>
          <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={getTotal()}/>
          <StatisticLine text="average" value={getAverage()}/>
          <StatisticLine text="positive" value={good/getTotal()*100 + "%"}/>
          </tbody>
      </table>   
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handler}>{props.text}</button>
  )
}

const Header = (props) => {
  return (
    <h2>{props.text}</h2>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text} </td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let statistics;
  if (good === 0 && neutral === 0 && bad === 0){
    statistics = <div>No feedback given</div>
  } else {
    statistics = <Statistics good={good} bad={bad} neutral={neutral}/>
  }

  return (
    <div>
      <Header text="give feedback"/>
      <Button text="good" handler={() => setGood(good+1)}/>
      <Button text="neutral" handler={() => setNeutral(neutral+1)}/>
      <Button text="bad" handler={() => setBad(bad+1)}/>
      <Header text="statistics"/> 
      {statistics}
    </div>
  )
}

export default App