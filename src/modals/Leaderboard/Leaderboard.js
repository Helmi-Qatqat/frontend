import './Leaderboard.css'
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import axios from 'axios'
import { useState, useEffect } from 'react';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import { Minimize } from '@mui/icons-material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid ',
  outline: 0,
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

export default function Leaderboard(props) {
  const [open, setOpen] = useState(false);
  const [leaderboardTimes, setLeaderboardTimes] = useState(null)
  const [bestTime, setBestTime] = useState(() => {
    if(localStorage.getItem('user_data')) {
      return JSON.parse(localStorage.getItem('user_data')).best_time
    } else return null
  })

  useEffect(() => {
    setBestTime( (oldTime) => {
      return JSON.parse(localStorage.getItem('user_data')).best_time
    })
  },[bestTime, props.won, open])

  function abstractTime(str) {
    if(+str === 0) {
      return `--:--.--`
    } else {
      const time = new Date(+str)
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const seconds = time.getSeconds().toString().padStart(2, '0');
      const milliseconds = (time.getMilliseconds() / 10).toString().padStart(2, '0');
      return `${minutes}:${seconds}.${milliseconds}`
    }
  }
  const handleOpen = async () => {
    setOpen(true);
    props.setIsOpen(true)
    const url = process.env.REACT_APP_SERVER_URL
    const records = await axios.get(url + '/leaderboard')
    setLeaderboardTimes(records.data)
  };
  const handleClose = () => {
    setOpen(false)
    props.setIsOpen(false);
  };

  return (
    <div>
      <LeaderboardIcon className='info-button' onClick={handleOpen}/>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        
        <Fade in={open}>
          <Box sx={style}>
          <ArrowCircleRightRoundedIcon className='back-button' onClick={handleClose}/>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <div className='leaderboard-text-header'>
              <EmojiEventsIcon/> <span>Leaderboard</span>
              </div>
            </Typography> 
            <div className='leaderboard-grid'>
              <div className='user-scores'>
                <div>
                  <span>Your best Time: {abstractTime(bestTime)}</span>
                </div>
              </div>
            </div>
            <div className='leaderboard-scores'>
              <div className='leaderboard-scores-header'>
                <span>#</span><span>name</span><span>time record</span>
              </div>
              {leaderboardTimes && leaderboardTimes.map((e,i) => (                
                <div>
                  <span>{i + 1}</span>
                  <span>{e.username}</span>
                  <span>{abstractTime(e.best_time)}</span>
                </div>
              )
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
