import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';

export default function EditCustomer(props) {
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
      
    const handleClickOpen = (scrollType) => () => {
        setCustomer({
        firstname: props.customer.firstname, 
        lastname: props.customer.lastname,
        streetaddress: props.customer.streetaddress,
        postcode: props.customer.postcode,
        city: props.customer.city,
        email: props.customer.email,
        phone: props.customer.phone})
        setOpen(true);
        setScroll(scrollType);
        };
      
    const handleClose = () => {
        setOpen(false);
        };

    const inputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value})
    }

    const updateCustomer = () => {
        props.editCustomer(customer, props.customer.links[0].href);
        handleClose();
    }
      
    return (
          <div>
            <Button color="primary" size="small" onClick={handleClickOpen('paper')}>
             <EditIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit customer</DialogTitle>
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
                <Button onClick={updateCustomer}>Save</Button>
              </DialogActions>
            </Dialog>
          </div>
        );
}