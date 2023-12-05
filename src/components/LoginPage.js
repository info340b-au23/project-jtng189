import React from "react";
import { getAuth, EmailAuthProvider } from 'firebase/auth'
import { StyledFirebaseAuth } from "react-firebaseui";

// Test login:
// E-mail: a@a.com
// Password: password

// TO-DO:
export function LoginPage(props) {

    const auth = getAuth();

    // Uses Email & Password authentication 
    const configObj = {
        signInOptions: [
            {
                provider: EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: true
            }
        ],
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: () => true
        },
        signInSuccessUrl: '/locator',
        credentialHelper: 'none'
    }


    return (
        <div className="container login">
            <StyledFirebaseAuth firebaseAuth={auth} uiConfig={configObj} />
        </div>
    );
}