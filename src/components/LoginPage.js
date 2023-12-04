import React, { useState } from "react";
import { getDatabase } from 'firebase/database';

// TO-DO:
// Style elements
// Implement Firebase Authentication
export function LoginPage(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMode, setLoginMode] = useState('signin');

    const getUsername = (event) => {
        setUsername(event.target.value);
    }

    const getEmail = (event) => {
        setEmail(event.target.value);
    }

    const getPassword = (event) => {
        setPassword(event.target.value);
    }

    // inspect Firebase authentication
    function onSignIn(event) {
        event.preventDefault();
    }

    // inspect Firebase authentication
    function onSignUp(event) {
        event.preventDefault();
    }

    function LoginMode() {
        if (loginMode !== "signin") {
            return (
                <div>
                    <h2>Sign Up</h2>
                    <form className="loginForm">
                        <label htmlFor="username">Username:</label><br />
                        <input type='text' id='username' name="username" onChange={getUsername}></input><br />
                        <label htmlFor="email">Email:</label><br />
                        <input type="text" id='email' name='email' onChange={getEmail}></input><br />
                        <label htmlFor="password">Password:</label><br />
                        <input type='text' id='password' name='password' onChange={getPassword}></input><br />
                        <button type="submit" className="signButton" aria-label="Create an account" onClick={onSignUp}>Enter</button>
                        <p>Already have an account? <a href='#' onClick={() => setLoginMode('signin')}>Sign in here.</a>
                        </p>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>Sign In</h2>
                    <form className="loginForm">
                        <label htmlFor="email">Email:</label><br />
                        <input type="text" id='email' name='email' onChange={getEmail}></input><br />
                        <label htmlFor="password">Password:</label><br />
                        <input type='text' id='password' name='password' onChange={getPassword}></input><br />
                        <button type="submit" className="signButton" aria-label="Sign into account" onClick={onSignIn}>Enter</button>
                        <p>Don't have an account? <a href='#' onClick={() => setLoginMode('signup')}>Sign up here.</a></p>
                    </form>
                </div>
            );
        }
    }

    return (
        <div className="container login">
            {LoginMode()}
        </div>
    );
}