import React, {useState} from "react";
import Carousel from 'react-bootstrap/Carousel';

export function CalendarCarousel(props) {
    const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [monthId, setMonthId] = useState(0);

    let carouselItems = monthsList.map((month) => {
        return (
            <Carousel.Item key = {month}>
                {month}
            </Carousel.Item>
        )
    })

    function nextMonth() {
        setMonthId(function(thisMonth) {
            return monthsList[(thisMonth + 1) % monthsList.length];
        })
    }

    function prevMonth() {
        setMonthId(function(thisMonth) {
            return monthsList[(thisMonth - 1) % monthsList.length];
        })
    }

    return (
        <div>
            <Carousel indicators = {false} prevLabel = "" nextLabel = "" interval = {null}>
                {carouselItems}
            </Carousel>
        </div>
    );
}