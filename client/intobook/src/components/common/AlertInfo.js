import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material'

const AlertInfo = ({ text, openAlert, setOpenAlert, closeAlert }) => {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
    closeAlert()
  };

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <div>
      <Snackbar TransitionComponent={TransitionUp} open={openAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={2000} onClose={handleClose}
      >
        <Alert severity="success"
          sx={{
            backgroundColor: 'rgba(76, 175, 80, 0.6)',
            color: 'var(--white)',
            borderRadius: '20px',
            width: '9rem',
            marginBottom: '3rem',
            "& .MuiAlert-icon": {
              color: 'var(--white)'
            }
          }}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertInfo;