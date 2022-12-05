import React from 'react';
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchCustomers(), []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {headerName: 'First name', field: 'firstname', sortable: true, filter: true},
        {headerName: 'Last name', field: 'lastname', sortable: true, filter: true},
        {headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true},
        {headerName: 'Postal code', field: 'postcode', sortable: true, filter: true},
        {headerName: 'City', field: 'city', sortable: true, filter: true},
        {headerName: 'Email', field: 'email', sortable: true, filter: true},
        {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
    ]

    return (
        <div>
            <h2>List of customers</h2>
            <div className="ag-theme-material" style={{height: 400, margin: '0 auto'}}>
            <AgGridReact rowData={customers} columnDefs={columns} animatedRows={true} />
            </div>
        </div>
    )
}