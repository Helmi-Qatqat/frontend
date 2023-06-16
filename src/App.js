import { useEffect, useState } from 'react';
import { nanoid } from "nanoid"
import './App.css';
import Background from './Background/Background';
import Container from './Container/Container';

function App() {
  const [dice, setDice] = useState(generateDices())
  const [won, setWon] = useState(false)
  
  // Check if the user won the game
  useEffect(()=> {
    const allHeld = dice.every(die => die.isHeld)
    const sameValue = dice.every(die => die.value === dice[0].value)
    if(allHeld && sameValue) {
      setWon(true)
    }
  }, [dice])

  //Generating Dice
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

  // Roll & Hold functions
  function rollDice() {
    if (won) {
      setDice(generateDices())
      setWon(false)
    } else {
      setDice(oldDice => oldDice.map(die => die.isHeld ? die : generateDice()))
    }
  }
  function holdDie(id) {
    const newDice = dice.map(die => die.id === id ? {...die, isHeld: !die.isHeld }: die)
    setDice(newDice)
  }

  return (
    <div className='tenzies-container'>
      <Container
        dice={dice}
        setDice={setDice}
        holdDie={holdDie}
        rollDice={rollDice}
        won={won}/>
      <Background won={won}/>
    </div>
  );
}

export default App;
