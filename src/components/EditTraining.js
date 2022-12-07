import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';

export default function EditTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: ''
    });
      
    const handleClickOpen = () => {
        setTraining({
            date: props.training.date,
            duration: props.training.duration,
            activity: props.training.activity,
            customer: props.training.customer
        })
        setOpen(true);
        };
      
    const handleClose = () => {
        setOpen(false);
        };

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value})
    }

    const updateTraining = () => {
        props.editTraining(training);
        handleClose();
    }
      
    return (
          <div>
            <Button color="primary" size="small" onClick={handleClickOpen}>
             <EditIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add new training</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="date"
                  value={training.date}
                  label="Date"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
                 <TextField
                  margin="dense"
                  name="duration"
                  value={training.duration}
                  label="Duration"
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
                 <TextField
                  margin="dense"
                  name="customer"
                  value={training.customer}
                  label="Customer"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={updateTraining}>Save</Button>
              </DialogActions>
            </Dialog>
          </div>
        );
}