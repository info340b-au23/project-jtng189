import React, {useState} from 'react';
import { Week } from './CalendarDays';
import { CalendarFilter } from './CalendarFilter';
import Carousel from 'react-bootstrap/Carousel';
import InfoIcon from "@mui/icons-material/Info";
import moment from 'moment';

export function Calendar() {
    const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = moment();
    const [currentMonth, setCurrentMonth] = useState(today);

    let carouselItems = monthsList.map((month) => {
        return (
            <Carousel.Item key = {month}>
                {month}
            </Carousel.Item>
        )
    })

    function currentIndex(activeIndex) {
        console.log(activeIndex);
        console.log(currentMonth);
        setCurrentMonth(moment().month(activeIndex));
    }

    return (
        <div>
            <h2>Calendar</h2>
            <div className="container" id="calendar">
                <i className="material-icons"><InfoIcon /><p>Click a day to view and add events to your calendar</p></i>
                <CalendarFilter/>
                <h3 className="bg-dark text-light p-3 text-center">
                    <div>
                        <Carousel indicators = {false} prevLabel = "" nextLabel = "" interval = {null} slide = {false} onSelect={currentIndex} defaultActiveIndex={currentMonth.month()}>
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
                <Week today={currentMonth}/>
            </div>
        </div>
    );
}