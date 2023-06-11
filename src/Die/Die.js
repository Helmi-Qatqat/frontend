import './Die.css'

export default function Dice(props) {

  return (
    <div
      className={`die ${props.isHeld ? 'held' : ""}`}
      onClick={() => props.holdDie(props.id)}
      >
      {props.value}
    </div>
  )
}