/* eslint-disable react/prop-types */
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        if (user) {
            const isEmailVerified = user.emailVerified;
            setEmailVerified(isEmailVerified);

            if (isEmailVerified || user.providerData[0]?.providerId === 'google.com') {
                // Allow access if email is verified OR signed in with Google
                setCurrentUser({ ...user });
                setUserLoggedIn(true);
            } else {
                // User exists but email not verified
                setCurrentUser({ ...user });
                setUserLoggedIn(false);
            }
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
            setEmailVerified(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        emailVerified,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}