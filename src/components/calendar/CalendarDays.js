import React, {useState} from 'react';
import { CalendarEvent } from './CalendarEvent';

function Day({ day, toggleEvent }) {
    return (
        <div className="card">
            <div className="card-body">
                <a className="stretched-link" href="#" onClick = {toggleEvent}></a>
                <p className="card-text text-center">{day}</p>
            </div>
        </div>
    )
}

const weeks = [
    [1, 2, 3, 4, 5, 6, 7], 
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28]];

export function Week() {
    const [showEvent, setShowEvent] = useState(false);
    const [events, setEvents] = useState([
        {name: "Annual Checkup", description: "Checkup with Dr. Johnson"},
    ]);

    function toggleEvent() {
        setShowEvent(!showEvent);
    }

    return (
        <div>
            {weeks.map(week => (
                <div className="card-group">
                    {week.map(day => (
                        <Day day = {day} toggleEvent = {toggleEvent}/>
                    ))}
                </div>
            ))}
            {showEvent && (
                <CalendarEvent toggleEvent={toggleEvent} events={events}  setEvents={setEvents}/>
            )}
        </div>
    )
}