import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });
    const [scroll, setScroll] = useState('paper');
      
    const handleClickOpen  = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
        };
      
    const handleClose = () => {
        setOpen(false);
        };

    const inputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value})
    }

    const addCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    }
      
    return (
          <div>
            <Button color="primary" variant="contained" size="small" style={{margin: 15}} onClick={handleClickOpen('paper')}>
             Add customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add new customer</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="firstname"
                  value={customer.firstname}
                  label="First name"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
                 <TextField
                  margin="dense"
                  name="lastname"
                  value={customer.lastname}
                  label="Last name"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
                 <TextField
                  margin="dense"
                  name="streetaddress"
                  value={customer.streetaddress}
                  label="Street address"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
                 <TextField
                  margin="dense"
                  name="postcode"
                  value={customer.postcode}
                  label="Postal code"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
                 <TextField
                  autoFocus
                  margin="dense"
                  name="city"
                  value={customer.city}
                  label="City"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
                 <TextField
                  margin="dense"
                  name="email"
                  value={customer.email}
                  label="Email"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
                 <TextField
                  margin="dense"
                  name="phone"
                  value={customer.phone}
                  label="Phone"
                  onChange={e => inputChanged(e)}
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addCustomer}>Save</Button>
              </DialogActions>
            </Dialog>
          </div>
        );
}