import React, {useState} from 'react';
import { CalendarCarousel } from './CalendarCarousel';
import { Week } from './Week';
import { CalendarFilter } from './CalendarFilter';

export function Calendar(props) {
    return (
        <div>
            <h2>Calendar</h2>
            <div className="container" id="calendar">
                <p className="ml-3">Click a day to add events to your calendar</p>
                    <CalendarFilter/>
                <h3 className="bg-dark text-light p-3 text-center text-center">
                    <CalendarCarousel/>
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th><strong>Sun</strong></th>
                            <th><strong>Mon</strong></th>
                            <th><strong>Tue</strong></th>
                            <th><strong>Wed</strong></th>
                            <th><strong>Thu</strong></th>
                            <th><strong>Fri</strong></th>
                            <th><strong>Sat</strong></th>
                        </tr>
                    </thead>
                </table>
                <Week/>
            </div>
        </div>
    );
}