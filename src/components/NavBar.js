import React, { useState } from "react";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export function NavBar(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [logOutMenuOpen, setLogOutMenuOpen] = useState(false);

    const auth = getAuth();

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

    function toggleLogOut(event) {
        event.preventDefault();
        setLogOutMenuOpen(!logOutMenuOpen);
    }

    function onClickLogOut() {
        signOut(auth);
        setLogOutMenuOpen(!logOutMenuOpen);
    }

    function logOutMenu() {
        if (logOutMenuOpen) {
            return (
                <button className="logout" type='submit' onClick={() => onClickLogOut()}>Log Out</button>
            );
        }
    }

    function displayUsername() {
        if (props.username === '') {
            return (<Link to="login">Sign Up</Link>);
        } else {
            return (
                <div>
                    <a href="#" onClick={toggleLogOut}>{props.username}</a><br />
                </div>
            );
        }
    }

    function displayProfilePicture() {
        if (props.username === '') {
            return (
                <Link to="login">
                    <img src={process.env.PUBLIC_URL + "/img/profile-pic.png"} alt="User profile picture"></img>
                </Link>
            );
        } else {
            return (
                <div>
                    <a href="#" onClick={toggleLogOut}><img src={process.env.PUBLIC_URL + "/img/profile-pic.png"} alt="User profile picture"></img></a><br />
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
                            <li className="item-hide nav-item">
                                {displayUsername()}
                            </li>
                            <li className="nav-item">
                                {displayProfilePicture()}
                                {logOutMenu()}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}