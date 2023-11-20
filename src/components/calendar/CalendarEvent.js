import React, {useState} from 'react';

export function CalendarEvent(props) {
    return (
        <div class="container" id="event">
            <div class="card mt-5">
                <div class="card-header"><strong>Add Event</strong></div>
                <div class="card-body">
                    <p class="card-text"></p>
                    <form>
                        <div className="form-group">
                          <label for="event_input">Event:</label>
                          <input type="text" className="form-control" id="event_input" placeholder="Name of the event"/>
                        </div>
                        <div class="form-group mt-3">
                          <label for="description_input">Description:</label>
                          <input type="text" className="form-control" id="description_input" placeholder="Description of the event"/>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary mt-3">Add</button>
                            <button type="submit" className="btn btn-secondary mt-3">Cancel</button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    )
}