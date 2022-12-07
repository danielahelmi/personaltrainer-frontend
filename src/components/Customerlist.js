import React from 'react';
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import AddCustomer from './AddCustomer';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CSVExporter from './CSV';

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');

    useEffect(() => fetchCustomers(), []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => response.json())
        .then(data => fetchCustomers())
        .catch(err => console.error(err))
        setSnackMsg('Customer saved');
        setOpen(true);
    }

    const editCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(data => fetchCustomers())
        .catch(err => console.error(err))
        setOpen(true);
        setSnackMsg('Customer saved');
    }

    const deleteCustomer = (link) => {
        if(window.confirm('Are you sure you want to delete this customer?')){
            fetch(link, { method: 'DELETE' })
                .then(response => fetchCustomers())
                .catch(err => console.error(err));
                setOpen(true);
                setSnackMsg('Customer deleted');
            }
    }

    const saveTraining = (training) => {
        console.log(training);
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(training)
        })
        .then(res => {
            setSnackMsg('Training added');
            setOpen(true);
        })
        .catch(err => console.error(err))
       
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      }

    const columns = [
        {headerName: 'First name', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Last name', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Postal code', field: 'postcode', sortable: true, filter: true},
        {headerName: 'City', field: 'city', sortable: true, filter: true},
        {headerName: 'Email', field: 'email', sortable: true, filter: true},
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
        {headerName: 'Add training', field: 'add', cellRenderer: function (params) {
            return (
                <div>
                    <AddTraining customer={params.data} saveTraining={saveTraining}/>
                </div>
            );}
        },
        {headerName: 'Edit customer', field: 'edit', cellRenderer: function (params) {
            return (
                <div>
                    <EditCustomer customer={params.data} editCustomer={editCustomer}/>
                </div>
            );}
        },
        {headerName: 'Delete customer', field: 'delete', cellRenderer: function (params) {
            return (
                <div>
                    <Button onClick={() => deleteCustomer(params.data.links[0].href)} color="error" size="small">
                        <DeleteForeverIcon />
                    </Button>
                    </div>
            );}
    }
    ]

    const gridOptions = {
        rowSelection:'single',
        animateRows:true,
        onGridReady: (event) => event.api.sizeColumnsToFit()
       };

    return (
        <div>
            <h2>List of customers</h2>
            <AddCustomer saveCustomer={saveCustomer} />
            <div className="ag-theme-material" style={{height: 400, margin: '0 auto'}}>
            <AgGridReact rowData={customers} columnDefs={columns} gridOptions={gridOptions} />
            </div>
            <CSVExporter customers={customers} />
            <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            message={snackMsg} /> 
        </div>
    )
}