import React, {useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";

export function CalendarFilter(props) {
    const [calendarView, setCalendarView] = useState("Month");
    const [searchFilter, setSearchFilter] = useState("");

    function selectChange(event) {
        setCalendarView(event.target.value);
    }

    function searchHandler(event) {
        setSearchFilter(event.target.value);
    }

    const views = ["Month", "Week"].map((view) => {
        return <option key = {view} value = {view}>{view}</option>
    })

    return (
        <div className = "d-flex">
            <div className = "col-auto">
                <i className="material-icons"><SearchIcon /></i>
                <input type = "text" value = {searchFilter} onChange = {searchHandler} placeholder = "Find event"/>
            </div>
            <div className = "ms-auto">
                <select id = "view" className = "form-select" value = {calendarView} onChange = {selectChange}>
                    {views}
                </select>
            </div>
        </div>
    )
}