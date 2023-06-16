import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import './info-modal.css'

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

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      
      <InfoIcon className='info-button' onClick={handleOpen}/>
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
              How to play?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Roll until all dice are the same. Click each die to freeze it at its current value between rolls.            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
