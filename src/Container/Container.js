import './Container.css'
import Die from '../Die/Die'

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
        <div className='dice-container'>
          {diceElements}
        </div>
        <button className='game-button'>Roll</button>
      </div>
    </>
  )
}