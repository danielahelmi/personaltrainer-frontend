import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import 'moment/locale/fi';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: ''
    });
      
    const handleClickOpen = () => {
        setTraining({...training, duration: '', customer: props.customer.links[0].href})
        setOpen(true);
        };
      
    const handleClose = () => {
        setOpen(false);
        };

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value})
    };

    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    };
      
    return (
          <div>
            <Button color="primary" size="small" onClick={handleClickOpen}>
            <AddCircleIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new training to {props.customer.firstname + ' ' + props.customer.lastname}</DialogTitle>
                <DialogContent>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker 
                    label="Date and time" 
                    inputFormat="DD/MM/YYYY HH:mm" 
                    onChange={dateFromPicker => setTraining({ ...training, date: dateFromPicker })} 
                    value={training.date} 
                    renderInput={(params) => <TextField {...params} />} />
                </LocalizationProvider>
                 <TextField
                  margin="dense"
                  name="duration"
                  value={training.duration}
                  label="Duration (min)"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
                 <TextField
                  margin="dense"
                  name="activity"
                  value={training.activity}
                  label="Activity"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addTraining}>Save</Button>
              </DialogActions>
            </Dialog>
          </div>
        );
}