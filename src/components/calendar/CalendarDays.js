import React, {useState} from 'react';
import { CalendarEvent } from './CalendarEvent';
import moment from 'moment';

function Day({ day, checkValidDay, validDay, invalidDay }) {
    return (
        <div className="card">
            {checkValidDay(day) && (
                validDay(day)
            )}
            {!checkValidDay(day) && (
                invalidDay(day)
            )}
        </div>
    )
}

export function Week({ today }) {
    const [showEvent, setShowEvent] = useState(false);
    const [events, setEvents] = useState([
        {name: "Annual Checkup", time: "2:30", description: "Checkup with Dr. Johnson"},
    ]);

    const month = [];
    for (let i = 0; i < today.daysInMonth(); i++) {
        month.push(moment(today).startOf("month").add(i, "days"));
    }

    const weeks = [];
    let index = 0;
    for (let i = 0; i < month.length + today.startOf("month").day(); i += 7) {
        const week = [];
        for (let j = 0; j < 7; j++) {
            const day = i + j - today.startOf("month").day() + 1;
            index++;
            if (day > 0 && day <= month.length) {
                week.push(day);
            } else {
                week.push("");
            }
        }
        weeks.push(week);
    }

    function toggleEvent() {
        setShowEvent(!showEvent);
    }

    function checkValidDay(day) {
        if (day == "") {
            return false;
        }

        return true;
    }

    function validDay(day) {
        return (
            <div className="card-body">
                <a className="stretched-link" onClick = {toggleEvent}></a>
                <p className="card-text text-left">{day}</p>
            </div>
        )
    }

    function invalidDay(day) {
        return (
            <div className="card-body invalid-day">
                <p className="card-text text-left">{day}</p>
            </div>
        )
    }

    return (
        <div>
            {weeks.map(week => (
                <div className="card-group">
                    {week.map(day => (
                        <Day day = {day} checkValidDay={checkValidDay} validDay={validDay} invalidDay={invalidDay}/>
                    ))}
                </div>
            ))}
            {showEvent && (
                <CalendarEvent toggleEvent={toggleEvent} events={events} setEvents={setEvents}/>
            )}
        </div>
    )
}