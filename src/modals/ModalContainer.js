import './ModalContainer.css'
import HowToPlay from './HowToPlay/HowToPlay';
import Leaderboard from './Leaderboard/Leaderboard';

export default function ModalContainer(props) {
  return (
    <div className="modals-container">
      <HowToPlay startTimer={props.startTimer} stopTimer={props.stopTimer} isStarted={props.isStarted} setIsOpen={props.setIsOpen}/>
      <Leaderboard startTimer={props.startTimer} stopTimer={props.stopTimer} isStarted={props.isStarted} setIsOpen={props.setIsOpen}/>
    </div>
  )
}