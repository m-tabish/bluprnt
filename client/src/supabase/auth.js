import { supabase } from "./supabase";


export async function doSignInwithEmailandPassword(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email, password
    })

    if (error) throw error;

    return {
        success: true,
        message: "Account created ! Please check your email to verify.",
        user: data.user
    }
}

export const checkEmailVerification = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) return false;

    return !!user.email_confirmed_at;
}


// google sign in

export async function doSignInwithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin
        }
    })


    if (error) throw error;

    return data;
}


export async function handleSignUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) throw error;

    return {
        success: true,
        message: "Account created! Please check your email to verify your account.",
        user: data.user
    };
}
// Sign out

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
} 