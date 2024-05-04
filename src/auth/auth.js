import { initializeApp } from "firebase/app";
import firebaseConfig from './auth-config.json'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

function connectToFirebaseAuth(){
    if (app) return app;
    return initializeApp(firebaseConfig);
}
const app = connectToFirebaseAuth();

async function signUpWithEmail(email, password) {
    const auth = getAuth(app);
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        // Signed up
        const user = userCredential.user;
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    }
}

async function signInWithEmail(email, password) {
    const auth = getAuth(app);
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        // Signed in
        const user = userCredential.user;
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    }
}

async function signOutUser() {
    const auth = getAuth(app);
    try {
        signOut(auth);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export {signInWithEmail, signUpWithEmail, signOutUser}
