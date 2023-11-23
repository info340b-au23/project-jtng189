import React, {useState} from 'react';
import { Week } from './CalendarDays';
import { CalendarFilter } from './CalendarFilter';
import Carousel from 'react-bootstrap/Carousel';


export function Calendar() {
    const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let carouselItems = monthsList.map((month) => {
        return (
            <Carousel.Item key = {month}>
                {month}
            </Carousel.Item>
        )
    })

    return (
        <div>
            <h2>Calendar</h2>
            <div className="container" id="calendar">
                <p className="ml-3">Click a day to view and add events to your calendar</p>
                    <CalendarFilter/>
                <h3 className="bg-dark text-light p-3 text-center text-center">
                    <div>
                        <Carousel indicators = {false} prevLabel = "" nextLabel = "" interval = {null} slide = {false}>
                            {carouselItems}
                        </Carousel>
                    </div>
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