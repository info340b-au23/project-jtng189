import React, {useState} from 'react';

function Day({ day }) {
    return (
        <div className="card">
            <div className="card-body">
                <a className="stretched-link" href="#"></a>
                <p className="card-text text-center">{day}</p>
            </div>
        </div>
    )
}

const weeks = [
    [1, 2, 3, 4, 5, 6, 7], 
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28]];

export function Week() {
    return (
        <div>
            {weeks.map(week => (
                <div className="card-group">
                    {week.map(day => (
                        <Day day = {day}/>
                    ))}
                </div>
            ))}
        </div>
    )
}