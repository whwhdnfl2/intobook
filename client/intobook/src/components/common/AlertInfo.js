import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material'

class TransitionUp extends React.Component {
  render() {
    return <Slide {...this.props} direction="up" />;
  }
}

const AlertInfo = ({ text, openAlert, setOpenAlert, closeAlert, type }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
    closeAlert()
  };

  let backgroundColor;

  switch (type) {
    case 'success':
      backgroundColor = 'rgba(76, 175, 80, 0.6)';
      break;
    case 'error':
      backgroundColor = 'rgba(220, 53, 69, 0.6)';
      break;
    case 'warning':
      backgroundColor = 'rgba(255, 193, 7, 0.6)';
      break;
    case 'info':
      backgroundColor = 'rgba(0, 123, 255, 0.6)';
      break;
    default:
      backgroundColor = 'rgba(0, 0, 0, 0.6)';
  }

  return (
    <div>
      <Snackbar TransitionComponent={TransitionUp} open={openAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={2000} onClose={handleClose}
      >
        <Alert severity={type}
          sx={{
            backgroundColor: backgroundColor,
            color: 'var(--white)',
            borderRadius: '20px',
            maxWidth: '100%',
            minWidth: '9rem',
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
