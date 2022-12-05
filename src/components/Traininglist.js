import React from 'react';
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from 'dayjs';

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchTrainings(), []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const dateFormat = (params) => {
        require('dayjs');
        return dayjs(params.value).format('DD/MM/YYYY HH:mm');
    }

    const columns = [
        {headerName: 'Date', field: 'date', valueFormatter: dateFormat, sortable: true, filter: true},
        {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
        {headerName: 'Activity', field: 'activity', sortable: true, filter: true}
    ]

    return (
        <div>
            <h2>List of trainings</h2>
            <div className="ag-theme-material" style={{height: 600, margin: 'auto'}}>
            <AgGridReact
            rowData={trainings}
            animatedRows={true}
            columnDefs={columns}>
            </AgGridReact>
            </div>
        </div>
    )
}