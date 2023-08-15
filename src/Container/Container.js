import './Container.css';
import Die from '../Die/Die';
import ModalContainer from '../modals/ModalContainer';
import Counters from '../Counters/Counters';
import axios from 'axios'
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

export default function Container(props) {
  const [rollCount, setRollCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState({ milliseconds: 0, seconds: 0, minutes: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);

  const isVisible = usePageVisibility();

  const startTimer = useCallback(() => {
    const newTimerInterval = setInterval(() => {
      setStartTime((oldTime) => ({
        milliseconds: oldTime.milliseconds === 100 ? 0 : oldTime.milliseconds + 1,
        seconds: oldTime.milliseconds === 100 ? oldTime.seconds + 1 : oldTime.seconds === 60 ? 0 : oldTime.seconds,
        minutes: oldTime.seconds === 60 ? oldTime.minutes + 1 : oldTime.minutes === 60 ? 0 : oldTime.minutes,
      }));
    }, 10);
    setTimerInterval(newTimerInterval)
  }, []);

  const stopTimer = useCallback(() => {
    clearInterval(timerInterval)
    setTimerInterval(null)
  }, [timerInterval]);

  function gameButtonHandler() {
    props.rollDice();
    if (props.won) {
      setRollCount(0);
      setIsStarted(false);
      props.setWon(false);
      setStartTime({ milliseconds: 0, seconds: 0, minutes: 0 });
    } else {
      setRollCount((prevRollCount) => prevRollCount + 1);
      if (!isStarted) {
        setIsStarted(true);
        startTimer();
      }
    }
  }
  let navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem('user_data')) {
      navigate('/signin')
    }
    function toDate() {
      const time = new Date(0);
      time.setMinutes(startTime.minutes, startTime.seconds, startTime.milliseconds * 10);
      return time.getTime()
    }
    if(props.won) {
      const url = process.env.REACT_APP_SERVER_URL
      axios.put(url + '/updateRecord', {
        username: JSON.parse(localStorage.getItem('user_data')).username,
        best_time: toDate()})
        .then(result => localStorage.setItem('user_data', JSON.stringify(result.data)))
    }
  }, [navigate, props.won, startTime])

  useEffect(() => {
    if (isOpen) stopTimer()
    else if(isOpen) startTimer();
    if (props.won) stopTimer();
    else if (!isOpen && isVisible && isStarted && !timerInterval) startTimer();
    else if (isOpen && !isVisible && timerInterval) stopTimer();
  }, [props.won, isVisible, isStarted, timerInterval, startTimer, stopTimer, isOpen, startTime]);
  
  const diceElements = props.dice.map((e) => (
    <Die
    key={e.id}
    id={e.id}
    value={e.value}
    isHeld={e.isHeld}
    holdDie={props.holdDie}
      isStarted={isStarted}
      setIsStarted={setIsStarted}
      startTimer={startTimer}
    />
  ));

  return (
    <>
      <div className="game-container">
        <Counters won={props.won} isStarted={isStarted} startTime={startTime} rollCount={rollCount} />
        <ModalContainer won={props.won} startTimer={startTimer} stopTimer={stopTimer} isStarted={isStarted} setIsOpen={setIsOpen}/>
        <div className="text-header">{props.won ? "You Won!" : "Tenzies"}</div>
        <div className="dice-container">{diceElements}</div>
        <button className="game-button" onClick={gameButtonHandler}>
          {props.won ? "New Game" : "Roll"}
        </button>
      </div>
    </>
  );
}
