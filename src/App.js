import React, {useState} from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendar from './components/Calendar.js';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';

function App() {

  const [value, setValue] = useState('customers');

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
      <Tab value="customers" label="Customers" />
      <Tab value="trainings" label="Trainings" />
      <Tab value="calendar" label="Calendar" />
      </Tabs>
      {value === 'customers' && <Customerlist />}
      {value === 'trainings' && <Traininglist />}
      {value === 'calendar' && <Calendar />}
  
    </div>
  );
}

export default App;
