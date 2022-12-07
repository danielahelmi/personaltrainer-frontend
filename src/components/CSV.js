import { CSVLink } from 'react-csv';
import Button from '@mui/material/Button';

export default function CSVExporter(props) {
    const headers = [
        {label: 'First name', key: 'firstname'},
        {label: 'Last name', key: 'lastname'},
        {label: 'Email', key: 'email'},
        {label: 'Phone', key: 'phone'},
        {label: 'Street address', key: 'streetaddress'},
        {label: 'Postal code', key: 'postcode'},
        {label: 'City', key: 'city'},
    ]

    return (
        <div>
            <CSVLink
                data={props.customers}
                headers={headers}
                filename={'customers.csv'}
                target='_blank'
            >
                <Button color="primary" variant="outlined" size="small" style={{margin: 15}}>
                    Download customers as .csv
                </Button>
            </CSVLink>
        </div>
    );
}