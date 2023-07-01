import './RollCounter.css'
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';

export default function RollCounter(props) {
  return (
    <div className='roll-count-container'>
      <CasinoRoundedIcon/>{props.rollCount < 10 ? `0${props.rollCount}` : props.rollCount}
    </div>
  )
}