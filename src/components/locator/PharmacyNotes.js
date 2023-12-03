import React, { useState, useEffect } from "react";
import EditNoteIcon from '@mui/icons-material/EditNote';

export function PharmacyNotes(props) {
    const pharmacy = props.pharmacy;

    const [note, setNote] = useState('');
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    useEffect(() => {
        setNote(pharmacy.note || '');
    }, [pharmacy]);

    const changeNote = (event) => {
        setNote(event.target.value);
    }

    function onSaveEdit(event) {
        event.preventDefault();
        const newPharmacy = {
            ...props.newPharmacy,
            note: note
        };
        props.edit(newPharmacy, props.list);
    }

    function onDelete(event) {
        event.preventDefault();
        if (pharmacy.name != "") {
            setShowDeleteWarning(true);
        }
    }

    function handleDeleteConfirm(confirmation) {
        setShowDeleteWarning(false);
        if (confirmation) {
            props.delete(pharmacy, props.list);
            setNote('');
        }
    }

    const deleteWarning = () => {
        if (showDeleteWarning) {
            return (
                <div>
                    <p>Are you sure you want to delete this pharmacy?</p>
                    <p>This will permanently erase all of the pharmacy's data.</p>
                    <button className="cancel" onClick={() => handleDeleteConfirm(false)}>Cancel</button>
                    <button className="delete" onClick={() => handleDeleteConfirm(true)}>Delete</button>
                </div>
            );
        }
    }

    return (
        <div>
            <form>
                <label htmlFor="pharNotes">
                    <i className="material-icons" aria-label="Pharmacy Notes"><EditNoteIcon /></i>
                    <span className="item-label">Notes</span>
                </label><br></br>
                <textarea className="form-control" id="pharNotes" name="pharNotes" rows="5" onChange={changeNote} value={note}>
                </textarea><br></br>
                <button type="submit" aria-label="Save pharmacy information and notes" onClick={onSaveEdit}>Save</button>
                <button type="button" className="delete" aria-label="Delete pharmacy from list" onClick={onDelete}>Delete</button>
                {deleteWarning()}
            </form>
        </div>
    );
}