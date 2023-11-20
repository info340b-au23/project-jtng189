import React, { useState } from "react";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from "react-router-dom";

// TO-DO:
// Add mobile hamburger menu support
// Set links to swap to the correct pages "href"
// Set proper profile picture "src" link/ allow submission for picture

export function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navPages = [
        { to: "locator", name: "Locate" },
        { to: "tracker", name: "Medication List" },
        { to: "calendar", name: "Calendar" },
    ];

    function toggleMenu(event) {
        event.preventDefault();
        setMenuOpen(!menuOpen);
    }

    function toggleIcon() {
        if (!menuOpen) {
            return <MenuIcon />;
        }
        return <CloseIcon />;
    }

    function menuItems() {
        if (menuOpen) {
            return (
                <div className="mobile-nav">
                    {navPages.map(page => (
                        <div className="mobile-show nav-item">
                            <NavLink to={page.to}>{page.name}</NavLink>
                        </div>
                    ))}
                </div>
            )
        }
    }

    return (
        <header>
            <div className="nav">
                <div className="features">
                    <nav>
                        <ul>
                            <li className="mobile-show nav-item"><a id="nav-menu" href="tracker.html" onClick={toggleMenu}><i
                                className="material-icons" >{toggleIcon()}</i></a>
                            </li>
                            <li className="item-hide nav-item">
                                <NavLink to="locator">Locate</NavLink>
                            </li>
                            <li className="item-hide nav-item">
                                <NavLink to="tracker">Medication List</NavLink>
                            </li>
                            <li className="item-hide nav-item">
                                {/* <a href="calendar.html">Calendar</a> */}
                                <NavLink to="calendar">Calendar</NavLink>
                            </li>
                        </ul>
                        {menuItems()}
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
                                <img src={process.env.PUBLIC_URL + "/img/profile-pic.png"} alt="User profile picture"></img>
                            </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}