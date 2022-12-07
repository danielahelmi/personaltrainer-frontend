import React, {useEffect, useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import _ from 'lodash';

export default function Charts() {

    const [trainings, setTrainings] = useState([]);
    const [grouped, setGrouped] = useState([]);
    const [data, setData] = useState([]);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    useEffect(() => fetchTrainings(), []);

    useEffect(() => {
        const arr = [];
        setGrouped(_.groupBy(trainings, 'activity'));
        for (const property in grouped) {
            arr.push({ name: property, duration: _.sumBy(grouped[property], 'duration') });
        }
        setData(arr);
    }, [trainings]);

return (
    <div style={{margin: 30}}>
    <BarChart width={800} height={400} data={data} margin={{ top: 30}}>
      <Bar dataKey="duration" name="Duration" fill="#006dc6" barSize={30}/>
    <XAxis dataKey="name" />
    <YAxis label={{value: 'Duration (min)', angle: 270, position: 'insideLeft'}}/>
    </BarChart>
    </div>
  );

}