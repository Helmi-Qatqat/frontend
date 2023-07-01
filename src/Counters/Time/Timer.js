import './Timer.css'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

export default function Timer(props) {
  const minutes = props.startTime.minutes.toString().padStart(2, '0');
  const seconds = props.startTime.seconds.toString().padStart(2, '0');
  const milliseconds = props.startTime.milliseconds.toString().padStart(2, '0');
  
  return (
    <>
        <div className="timer-container">
          <AccessTimeRoundedIcon/>
          <div className='time-container'>
          <span className="minutes">{minutes}</span>
          :<span className="seconds">{seconds}</span>
          .<span className="milliseconds">{milliseconds}</span>
          </div>
        </div>
    </>
  )
}