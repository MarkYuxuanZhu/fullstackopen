import React  from 'react';
import { useState } from 'react'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  let initPoints = {}
  anecdotes.forEach((_, i) => {
    initPoints[i] = 0
  })
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initPoints)
  const findMax = () => {
    let maxIndex = 0
    for (let i = 1; i < anecdotes.length; i++){
      if (points[i] > points[maxIndex]){
        maxIndex = i
      }
    }
    return maxIndex
  } 
  const addPoints = () => {
    const newPoints = {... points}
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  return (
    <div>
      <h3>Anecdotes of the day</h3>
      {anecdotes[selected]}
      <div>has {points[selected]} votes</div>
      <div>
        <button onClick={() => addPoints()}>vote</button>
        <button onClick={() => setSelected(getRandomInt(0, anecdotes.length))}>next anecdote</button>
      </div>
      <h3>Anecdotes with the most vote</h3>
      {anecdotes[findMax()]}
      <div>has {points[findMax()]} votes</div>

    </div>
  )
}

export default App
