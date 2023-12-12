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

export function Week({ today, newWeek, view }) {
    const [showEvent, setShowEvent] = useState(false);
    const [events, setEvents] = useState([]);
    const [selectDay, setSelectDay] = useState(moment().date());
    const m = today.month() + 1;

    const month = [];
    for (let i = 0; i < today.daysInMonth(); i++) {
        month.push(moment(today).startOf("month").add(i, "days"));
    }

    function chosenView(view) {
        const weeks = [];

        if (view == "Month") {
            for (let i = 0; i < month.length + today.startOf("month").day(); i += 7) {
                const week = [];

                for (let j = 0; j < 7; j++) {
                    const day = i + j - today.startOf("month").day() + 1;

                    if (day > 0 && day <= month.length) {
                        week.push(day);
                    } else {
                        week.push("");
                    }
                }
                weeks.push(week);
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
                </div>
            )
        } else {
            for (let i = 0; i < 7; i++) {
                const day = moment(newWeek).startOf("week").add(i, "days").date();
                weeks.push(day);
            }

            return (
                <div className="card-group">
                    {weeks.map(day => (
                        <Day day = {day} checkValidDay={checkValidDay} validDay={validDay} invalidDay={invalidDay}/>
                    ))}
                </div>
            )
        }
    }  

    function toggleEvent(day) {
        setSelectDay(day);
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
            <div className="card-body"  onClick={() => {toggleEvent(day)}}>
                <a className="stretched-link"></a>
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
            {chosenView(view)}
            <CalendarEvent events={events} setEvents={setEvents} date={m + "-" + selectDay}/>
        </div>
    )
}