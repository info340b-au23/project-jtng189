import React, {useState} from 'react';
import AddIcon from "@mui/icons-material/Add";

export function CalendarEvent(props) {
    const [eventName, setEventName] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [showAddEvent, setShowAddEvent] = useState(false);
    
    function nameChange(event) {
        setEventName(event.target.value);
    }

    function timeChange(event) {
        setEventTime(event.target.value);
    }

    function descriptionChange(event) {
        setEventDescription(event.target.value);
    }

    function eventForm() {
        setShowAddEvent(!showAddEvent);
    }

    function handleEvent(event) {
        event.preventDefault();
        const addEvent = {name: eventName, time: eventTime, description: eventDescription};
        props.setEvents([...props.events, addEvent]);
        setEventName("");
        setEventTime("");
        setEventDescription("");
    }

    function cancelEvent() {
        setEventName("");
        setEventTime("");
        setEventDescription("");
        eventForm();
    }

    return (
        <div className="container" id="event">
            <div className="card mt-5">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <strong>Planned Events</strong>
                    {!showAddEvent && (
                        <button type="button" className="btn btn-primary" onClick={eventForm}>
                                <AddIcon />Add Event
                        </button>
                    )}
                </div>
                <div className="card-body">
                    <p className="card-text">
                        {props.events.map(event => (
                            <span>
                                <p>{event.name}</p>
                                <ul>
                                    <li>{event.description} at {event.time}</li>
                                </ul>
                            </span>
                        ))}
                    </p>
                </div>
            </div>
            {showAddEvent && (
                <div className="card mt-5">
                    <div className="card-header"><strong>Add Event</strong></div>
                    <div className="card-body">
                        <form onSubmit={handleEvent}>
                            <span className="form-group">
                                <label for="event_input">Event:</label>
                                <input type="text" className="form-control" id="event_input" placeholder="Name of the event" value={eventName} onChange={nameChange}/>
                            </span>
                            <span className="form-group mt-3">
                                <label for="event_input">Time:</label>
                                <input type="text" className="form-control" id="event_input" placeholder="Time of the event" value={eventTime} onChange={timeChange}/>
                            </span>
                            <span className="form-group mt-3">
                                <label for="description_input">Description:</label>
                                <input type="text" className="form-control" id="description_input" placeholder="Description of the event" value={eventDescription} onChange={descriptionChange}/>
                            </span>
                            <span className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary mt-3">Add</button>
                                <button type="button" className="btn btn-secondary mt-3" onClick={cancelEvent}>Cancel</button>
                            </span> 
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}