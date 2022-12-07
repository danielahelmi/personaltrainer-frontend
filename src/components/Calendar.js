import moment from 'moment';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';


export default function Calendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => fetchTrainings(), []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setEvents(eventConverter(data)))
        .catch(err => console.error(err))
    }

    const eventConverter = (list) => {
        const newList = list.map((event) => {
            return {
                start: moment(event.date).toDate(),
                end: moment(event.date).add(event.duration, 'm').toDate(),
                title: event.activity + ' / ' + event.customer?.firstname + ' ' + event.customer?.lastname
            }
        });
        return newList;
    }
    
    return (
        <div>
            <div style={{margin:30}}>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
                events={events}
                initialView='timeGridWeek'
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                  }}
                firstDay='1'
                height={700}
                timeZone='UTC'
                eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false
                }}
            />
            </div>
        </div>
    );
}