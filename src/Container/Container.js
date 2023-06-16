import './Container.css'
import Die from '../Die/Die'
import TextModal from '../info-modal/info-modal';
export default function Container(props) {
  const diceElements = props.dice.map(e => (
    <Die
      key={e.id}
      id={e.id}
      value={e.value}
      isHeld={e.isHeld}
      holdDie={props.holdDie}
      />
  ))
  return (
    <>
      <div className='game-container'>
        <TextModal/>
        
        <div className='text-header'>{props.won ? "You Won!" : "Tenzies"}</div>
        <div className='dice-container'>
          {diceElements}
        </div>
        <button
          className='game-button'
          onClick={props.rollDice}
          >{props.won ? "New Game":"Roll"}</button>
      </div>
    </>
  )
}