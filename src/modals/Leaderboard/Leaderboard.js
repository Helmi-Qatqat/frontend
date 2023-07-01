import './Leaderboard.css'
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { useState } from 'react';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Minimize } from '@mui/icons-material';


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

  function abstractTime(str) {
    if(+str === 0) {
      return `--:--.--`
    } else {
      const time = new Date(+str)
      const minutes = time.getMinutes().toString().padStart(2, '0');
      console.log(str)
      console.log(minutes)
      const seconds = time.getSeconds().toString().padStart(2, '0');
      const milliseconds = (time.getMilliseconds() / 10).toString().padStart(2, '0');
      return `${minutes}:${seconds}.${milliseconds}`
    }
  }

  const handleOpen = () => {
    setOpen(true);
    props.setIsOpen(true)
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
                  <span>Your best Time: {abstractTime(localStorage.getItem('best-time'))}</span>
                </div>
              </div>
            </div>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
