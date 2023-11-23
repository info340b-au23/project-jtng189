import React, {useState} from 'react';

export function CalendarEvent(props) {
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    
    function nameChange(event) {
        setEventName(event.target.value);
    }

    function descriptionChange(event) {
        setEventDescription(event.target.value);
    }

    function handleEvent(event) {
        event.preventDefault();
        const addEvent = {name: eventName, description: eventDescription};
        props.setEvents([...props.events, addEvent]);
        setEventName("");
        setEventDescription("");
    }

    function cancelEvent() {
        setEventName("");
        setEventDescription("");
        props.toggleEvent();
    }

    return (
        <div className="container" id="event">
            <div className="card mt-5">
                <div className="card-header"><strong>Planned Events</strong></div>
                <div className="card-body">
                    <p className="card-text">
                        {props.events.map(event => (
                            <div>
                                <p>{event.name}</p>
                                <ul>
                                    <li>{event.description}</li>
                                </ul>
                            </div>
                        ))}
                    </p>
                </div>
            </div>
            <div className="card mt-5">
                <div className="card-header"><strong>Add Event</strong></div>
                <div className="card-body">
                    <form onSubmit={handleEvent}>
                        <div className="form-group">
                          <label for="event_input">Event:</label>
                          <input type="text" className="form-control" id="event_input" placeholder="Name of the event" value={eventName} onChange={nameChange}/>
                        </div>
                        <div className="form-group mt-3">
                          <label for="description_input">Description:</label>
                          <input type="text" className="form-control" id="description_input" placeholder="Description of the event" value={eventDescription} onChange={descriptionChange}/>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary mt-3">Add</button>
                            <button type="button" className="btn btn-secondary mt-3" onClick={cancelEvent}>Cancel</button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    )
}