import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const [open, setOpen] = useState(false);
  // useContext we have to use {} because it gives us back a dictionary 
  const {alert, setAlert} = useContext(AppContext)

  useEffect(
    ()=>{
      setOpen(true)
    },[alert]
  )

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    // When we close the alert, we don't want it to be there anymore so we have to clear it out
    setAlert({})
  };

  if(!alert?.msg) return <></>

  return (

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.cat} sx={{ width: '100%' }}>
          {alert.msg}
        </Alert>
      </Snackbar>

  );
}