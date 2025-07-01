// contains all user functions
import { createUserWithEmailAndPassword, GoogleAuthProvider, reload, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";





function doSignInwithEmailandPassword(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}



const handleSignUp = async (email, password) => {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Send email verification
    await sendEmailVerification(userCredential.user);

    return {
        success: true,
        message: "Account created! Please check your email to verify your account.",
        user: userCredential.user
    };

};



const checkEmailVerification = async () => {
    if (auth.currentUser) {
        await reload(auth.currentUser);
        return auth.currentUser.emailVerified;
    }
    return false;
};


async function doSignInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result;
}

function doSignOut() {
    return auth.signOut()
}

export { checkEmailVerification, doSignInwithEmailandPassword, doSignInWithGoogle, doSignOut, handleSignUp };

