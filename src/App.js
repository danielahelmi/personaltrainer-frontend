import React, {useState} from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendar from './components/Calendar.js';
import Charts from './components/Charts';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {

  const [value, setValue] = useState('customers');

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <div> 
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Personal Trainer-page
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      
      <Tabs value={value} onChange={handleChange}>
      <Tab value="customers" label="Customers" />
      <Tab value="trainings" label="Trainings" />
      <Tab value="calendar" label="Calendar" />
      <Tab value="charts" label="Charts" />
      </Tabs>
      {value === 'customers' && <Customerlist />}
      {value === 'trainings' && <Traininglist />}
      {value === 'calendar' && <Calendar />} 
      {value === 'charts' && <Charts />}
  
    </div>
  );
}

export default App;
