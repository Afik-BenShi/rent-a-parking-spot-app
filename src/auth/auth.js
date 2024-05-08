import { initializeApp } from "firebase/app";
import firebaseConfig from './auth-config.json'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

function connectToFirebaseAuth(){
    if (app) return app;
    const _app = initializeApp(firebaseConfig);
    const auth = initializeAuth(_app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
    return _app;
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
        console.error(error);
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
        console.error(error);
        // ..
    }
}

async function signOutUser() {
    const auth = getAuth(app);
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

function getUser(){
    return getAuth().currentUser;
}

export {signInWithEmail, signUpWithEmail, signOutUser, getUser}
