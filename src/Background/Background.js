import './Background.css'
import Confetti from 'react-confetti'
export default function Background(props) {
  return (
    <>
      {props.won && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
      <div className="area" >
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    </>
      
  )
}