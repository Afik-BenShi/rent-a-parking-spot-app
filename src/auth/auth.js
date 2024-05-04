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

const state = {login:false, get isLoggedIn(){return this.login}}

async function signUpWithEmail(email, password) {
    const auth = getAuth(app);
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        // Signed up
        state.login = true;
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
        state.login = true;
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
        await signOut(auth);
        state.login = false;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

function isLoggedIn(){
    return state.isLoggedIn;
}

function getUser(){
    return getAuth().currentUser;
}

export {signInWithEmail, signUpWithEmail, signOutUser, getUser, isLoggedIn}
