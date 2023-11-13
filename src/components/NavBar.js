import React from "react";


// TO-DO:
// Add mobile hamburger menu support
// Set links to swap to the correct pages "href"
// Set proper profile picture "src" link/ allow submission for picture

export function NavBar() {
    return (
        <header>
            <div className="nav">
                <div className="features">
                    <nav>
                        <ul>
                            <li className="mobile-show nav-item"><a id="nav-menu" href="tracker.html"><i
                                className="material-icons">menu</i></a>
                            </li>
                            <li className="item-hide nav-item"><a href="index.html">Locate</a></li>
                            <li className="item-hide nav-item"><a href="tracker.html">Medication List</a></li>
                            <li className="item-hide nav-item"><a href="calendar.html">Calendar</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="title">
                    <h1 className="nav-item">CareMinder</h1>
                </div>
                <div className="user">
                    <nav>
                        <ul className="nav-item">
                            <li className="item-hide nav-item"><a href="#">Username</a></li>
                            <li className="nav-item"><a href="#">
                                <img src="Project-Draft/img/profile-pic.png" alt="User profile picture"></img>
                            </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}