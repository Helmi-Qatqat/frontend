import { useState } from 'react';
import { nanoid } from "nanoid"
import './App.css';
import Background from './Background/Background';
import Container from './Container/Container';

function App() {
  const [dice, setDice] = useState(generateDices())

  function generateDices() {
    const diceArray = []
    for(let i = 0; i < 10; i++) {
      diceArray.push(generateDice())
    }
    return diceArray
  }
  function generateDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }
  }
  console.log(dice)
  function holdDie(id) {
    const newDice = dice.map(die => die.id === id ? {...die, isHeld: true }: die)
    setDice(oldDice => newDice)
  }

  return (
    <>
      <Container dice={dice} setDice={setDice} holdDie={holdDie}/>
      <Background/>
    </>
  );
}

export default App;
