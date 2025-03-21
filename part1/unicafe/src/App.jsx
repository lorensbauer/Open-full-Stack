import { useState } from 'react'

const Title = (props) => <h1>{props.text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

//Already had Statitics component
const Statistics = (props) => {
  if (props.good + props.bad + props.neutral === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
      <>
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>
    <p>all {props.good + props.bad + props.neutral}</p>
    <p>average {(props.good + props.bad + props.neutral)/3}</p>
    <p>positive {props.good / (props.good + props.bad + props.neutral)} %</p>
  </>
  )
}

const StatisticLine = (props) => (
  <p>{props.text} {props.value}</p>
)

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => { setGood(good + 1) }
  const handleNeutralClick = () => { setNeutral(neutral + 1) }
  const handleBadClick = () => { setBad(bad + 1) }

  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Title text="statistics" />
      {/* <Statistics good={good} neutral={neutral} bad={bad}/> */}
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={good + neutral + bad}/>
      <StatisticLine text="average" value={good + bad*-1}/>
      <StatisticLine text="positive" value={good === 0 ? 0:good/(good + neutral + bad)*100}/>
    </div>
  )
}

export default App