import React, {useState, useEffect} from 'react';
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert } from 'react-bootstrap';
import AddIcon from "@mui/icons-material/Add";

export function CalendarEvent(props) {
    const [events, setEvents] = useState([]);
    const [eventName, setEventName] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertVariant, setAlertVariant] = useState("success");

    const db = getDatabase();
    let eventsRef = ref(db, "events");

    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (firebaseUser) => {
            if (!firebaseUser) {
                setEvents([]);
                eventsRef = null;
            } else {
                eventsRef = ref(db, "events/" + firebaseUser.uid);
                onValue(eventsRef, (snapshot) => {
                    const eventsValue = snapshot.val();
                    if (eventsValue) {
                        setEvents(eventsValue);
                    }
                });
            }
        });
    }, [])

    const addEvent = (event) => {
        event.preventDefault();

        const newEvent = ([...events, {
            date: props.date,
            name: eventName,
            description: eventDescription
        }])

        setEvents(newEvent);
        set(eventsRef, newEvent)
            .then(function() {
                setAlertVariant("success");
                setAlertMessage("Added a new event.");
            })
            .catch(function(error) {
                setAlertVariant("danger");
                setAlertMessage(error.message);
            })

        setEventName("");
        setEventDescription("");
    }

    const filteredEvents = events.filter((event) => (
        event.date == props.date
    ));

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

    // function handleEvent(event) {
    //     addEvent(props.date, eventName, eventDescription)
        
    //     event.preventDefault();
    //     const addEvent = {name: eventName, description: eventDescription};
    //     props.setEvents([...props.events, addEvent]);
    //     setEventName("");
    //     setEventTime("");
    //     setEventDescription("");
    // }

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
                    <div className="card-text">
                        {events.map(event => (
                            <span>
                                <p>{event.name}</p>
                                <ul>
                                    <li>{event.description}</li>
                                </ul>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            {alertMessage &&
                <Alert variant={alertVariant} dismissible onClose={() => setAlertMessage(null)}>{alertMessage}</Alert>
            }
            {showAddEvent && (
                <div className="card mt-5">
                    <div className="card-header"><strong>Add Event</strong></div>
                    <div className="card-body">
                        <form onSubmit={addEvent}>
                            <span className="form-group">
                                <label for="event_input">Event:</label>
                                <input type="text" className="form-control" id="event_input" placeholder="Name of the event" value={eventName} onChange={nameChange}/>
                            </span>
                            {/* <span className="form-group mt-3">
                                <label for="event_input">Time:</label>
                                <input type="text" className="form-control" id="event_input" placeholder="Time of the event" value={eventTime} onChange={timeChange}/>
                            </span> */}
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