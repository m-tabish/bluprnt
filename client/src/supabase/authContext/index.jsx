/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        // Get initial session on load
        supabase.auth.getSession().then(({ data: { session } }) => {
            initializeUser(session?.user ?? null);
        });

        // Listen for Auth state changes (SIGN_IN, SIGN_OUT, TOKEN_REFRESHED)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                initializeUser(session?.user ?? null);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    function initializeUser(user) {
        if (user) {
            setCurrentUser(user);
            setUserLoggedIn(true);

            // Supabase sets email_confirmed_at when email is verified
            setEmailVerified(!!user.email_confirmed_at);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
            setEmailVerified(false);
        }
        setAuthLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        emailVerified,
        authLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {!authLoading && children}
        </AuthContext.Provider>
    );
}
