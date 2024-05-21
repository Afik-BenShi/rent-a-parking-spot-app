import { getApp, initializeApp } from "firebase/app";
import firebaseConfig from "./auth-config.json";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    initializeAuth,
    getReactNativePersistence,
    AuthErrorCodes,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import config from "../backend/config";
import axios from "axios";

function connectToFirebaseAuth() {
    if (app) return app;
    let _app;
    try{
        _app = initializeApp(firebaseConfig);
        initializeAuth(_app, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage),
        });
    } catch (e) {
        _app = getApp();
        getAuth(_app);
    }
    return _app;
}
const app = connectToFirebaseAuth();

async function signUpWithEmail(email, password) {
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    // Signed up
    const user = userCredential.user;
    return user;
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

function getUser() {
    return getAuth().currentUser;
}

async function branchOnInfoExistance({user, doIfExists=()=>{}, doIfNotExists=()=>{}}) {
    const token = await user.getIdToken();
    const isUserInfoExists = await axios.get(`http://${config.serverIp}:${config.port}/users/hasPrivateInfo`, {
        headers: { Authorization: await token},
    }).then(({data}) => data);
    if (isUserInfoExists){
        doIfExists();
    } else {
        doIfNotExists()
    }

}

export {
    signInWithEmail,
    signUpWithEmail,
    signOutUser,
    getUser,
    AuthErrorCodes,
    branchOnInfoExistance,
};
