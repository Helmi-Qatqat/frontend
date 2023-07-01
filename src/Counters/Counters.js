import './Counters.css'
import Timer from "./Time/Timer"
import RollCounter from "./Roll/RollCounter"

export default function Counters(props) {
  return (
    <div className="counters-container">
      <Timer won={props.won} isStarted={props.isStarted} startTime={props.startTime}/>
      <RollCounter rollCount={props.rollCount}/>
    </div>
  )
}