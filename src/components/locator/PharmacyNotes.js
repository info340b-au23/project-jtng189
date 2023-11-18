import React, { useState, useEffect } from "react";
import EditNoteIcon from '@mui/icons-material/EditNote';

// TO-DO:
// Adjust "textarea" information to be respective
// Make each button interactive in their design
export function PharmacyNotes(props) {
    const pharmacy = props.pharmacy;

    const [note, setNote] = useState('');

    useEffect(() => {
        setNote(pharmacy.note || '');
    }, [pharmacy]);

    const changeNote = (event) => {
        setNote(event.target.value);
    }

    function onSaveEdit(event) {
        event.preventDefault();
        const newPharmacy = {...props.newPharmacy,
            note: note
        };
        props.edit(newPharmacy, props.list);
    }

    function onDelete(event) {
        event.preventDefault();
        props.delete(pharmacy, props.list);
        setNote('');
    }

    return (
        <div>
            <form>
                <label htmlFor="pharNotes">
                    <i className="material-icons" aria-label="Pharmacy Notes"><EditNoteIcon /></i>
                    <span className="item-label">Notes</span>
                </label><br></br>
                <textarea className="form-control" id="pharNotes" name="pharNotes" rows="10" onChange={changeNote} value={note}>
                </textarea><br></br>
                <button type="submit" aria-label="Save pharmacy information and notes" onClick={onSaveEdit}>Save</button>
                {/* !!! Maybe no need for "edit" button */}
                {/* <button type="submit" aria-label="Edit pharmacy information and notes">Edit</button> */}
                <button type="submit" className="delete" aria-label="Delete pharmacy from list" onClick={onDelete}>Delete</button>
            </form>
        </div>
    );
}