import React, {useState, useEffect} from 'react';
import { Week } from './CalendarDays';
import Carousel from 'react-bootstrap/Carousel';
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import moment from 'moment';
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function Calendar() {
    const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = moment();
    const [carouselItems, setCarouselItems] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(today);
    const [currentWeek, setCurrentWeek] = useState(today);
    const [searchTerm, setSearchTerm] = useState("");
    const [calendarView, setCalendarView] = useState("Month");
    const [index, setIndex] = useState(today.month());
    // const [events, setEvents] = useState([]);

    const views = ["Month", "Week"].map((view) => {
        return <option key = {view} value = {view}>{view}</option>
    })

    useEffect(() => {
        buildCarouselItems();
    }, [calendarView]);

    function buildCarouselItems() {
        let items = [];
        if (calendarView == "Month") {
            items = monthsList.map((month) => {
                return (
                    <Carousel.Item key = {month}>
                        {month}
                    </Carousel.Item>
                )
            })
        } else {
            const startOfYear = today.clone().startOf("year");
            for (let i = 0; i <= today.weeksInYear(); i++) {
                const weekStart = startOfYear.clone().add(i, "weeks");
                let weekEnd = weekStart.clone().endOf("week");

                if (weekEnd.isAfter(moment().endOf("year"))) {
                    weekEnd = weekStart.clone().endOf("year");
                }

                if (!weekStart.isSame(weekEnd, "day")) {
                    items.push(
                        <Carousel.Item key = {i}>
                            {weekStart.format("MMM D")} to {weekEnd.format("MMM D")}
                        </Carousel.Item>
                    )
                } else {
                    items.push(
                        <Carousel.Item key = {i}>
                            {weekStart.format("MMM D")}
                        </Carousel.Item>
                    )
                }
            }
        }
        setCarouselItems(items);
    }

    function currentIndex(activeIndex) {
        if (calendarView == "Month") {
            setCurrentMonth(moment().month(activeIndex));
        } else {
            setCurrentWeek(moment().week(activeIndex + 1));
        }
        setIndex(activeIndex);
    }

    function applySearch(event) {
        setSearchTerm(event.target.value);
    }

    function applyView(event) {
        if (event.target.value == "Month") {
            setIndex(currentWeek.clone().startOf("week").month());
            setCurrentWeek(moment().month(index));
        } else {
            setIndex(currentMonth.clone().startOf("month").week() - 1);
            setCurrentMonth(moment().week(index));
        }
        setCalendarView(event.target.value);
    }

    return (
        <div>
            <h2>Calendar</h2>
            <div className="container" id="calendar">
                <i className="material-icons"><InfoIcon /><p>Click a day to view and add events to your calendar</p></i>
                <div className = "d-flex">
                    <div className = "col-auto">
                        <i className="material-icons"><SearchIcon /></i>
                        <input type = "text" value = {searchTerm} onChange = {applySearch} placeholder = "Find event"/>
                    </div>
                    <div className = "ms-auto">
                        <select id = "view" className = "form-select" value = {calendarView} onChange = {applyView}>
                            {views}
                        </select>
                    </div>
                </div>
                <h3 className="bg-dark text-light p-3 text-center">
                    <div>
                        <Carousel indicators = {false} prevLabel = "" nextLabel = "" interval = {null} slide = {false} onSelect = {currentIndex} activeIndex = {index}>
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
                <Week today={currentMonth} newWeek={currentWeek} view={calendarView}/>
            </div>
        </div>
    );
}