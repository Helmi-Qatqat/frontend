import './Die.css'

export default function Dice(props) {
  function dieHandler() {
    props.holdDie(props.id)
    if(!props.isStarted) {
      props.setIsStarted(true)
      props.startTimer()
    }
  }
  return (
    <div
      className={`die ${props.isHeld ? 'held' : ""}`}
      onClick={dieHandler}
      >
      {props.value}
    </div>
  )
}