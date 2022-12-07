import React from 'react';
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState('');

    useEffect(() => fetchTrainings(), []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const dateFormat = (params) => {
        require('dayjs');
        return dayjs(params.value).format('DD/MM/YYYY HH:mm');
    }

    const deleteTraining = (id) => {
        if(window.confirm('Are you sure you want to delete this training?')){
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, { method: 'DELETE' })
                .then(response => fetchTrainings())
                .catch(err => console.error(err));
                setOpen(true);
                setSnackMsg('Training deleted');
            }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      }

    const customerName = (params) => {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }

    const columns = [
        {headerName: 'Date', field: 'date', valueFormatter: dateFormat, sortable: true, filter: true},
        {headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true},
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
        {headerName: 'Customer', field: 'customer', valueGetter: customerName, sortable: true, filter: true},
        {headerName: 'Delete', field: 'id', cellRenderer: function (params) {
            return (
                <div>
                    <Button onClick={() => deleteTraining(params.value)} color="error" size="small">
                        <DeleteForeverIcon />
                    </Button>
                    </div>
            );}, width: 100
    }
    ]

    const gridOptions = {
        rowSelection:'single',
        animateRows:true,
        onGridReady: (event) => event.api.sizeColumnsToFit()
       };

    return (
        <div>
            <div className="ag-theme-material" style={{height: 600, margin: 'auto'}}>
            <AgGridReact
            rowData={trainings}
            columnDefs={columns}
            gridOptions={gridOptions}>
            </AgGridReact>
            </div>
            <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            message={snackMsg} /> 
        </div>
    )
}