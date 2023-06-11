import './Container.css'
import Die from '../Die/Die'

export default function Container(props) {
  const diceElements = props.dice.map(e => (
    <Die/>
  ))
  return (
    <>
      <div className='game-container'>
        {diceElements}
      </div>
    </>
  )
}