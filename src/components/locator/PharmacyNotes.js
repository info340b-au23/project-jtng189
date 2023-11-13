import React from "react";
import EditNoteIcon from '@mui/icons-material/EditNote';

// TO-DO:
// Adjust "textarea" information to be respective
// Make each button interactive in their design
export function PharmacyNotes() {
    return (
        <div>
            <form>
                <label for="pharNotes">
                    <i className="material-icons" aria-label="Pharmacy Notes"><EditNoteIcon /></i>
                    <span className="item-label">Notes</span>
                </label><br></br>
                <textarea className="form-control" id="pharNotes" name="pharNotes" rows="10">Available times: XX:XXpm-YY:YYpm Pharmacist's contact: ---------
                </textarea><br></br>
                <button type="submit" aria-label="Save pharmacy information and notes">Save</button>
                {/* !!! Maybe no need for "edit" button */}
                <button type="submit" aria-label="Edit pharmacy information and notes">Edit</button>
                <button type="submit" aria-label="Delete pharmacy from list">Delete</button>
            </form>
        </div>
    );
}