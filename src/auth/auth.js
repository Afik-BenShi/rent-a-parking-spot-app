import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

export async function signUpWithEmail(email, password) {
    const auth = getAuth();
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

export async function signInWithEmail(email, password) {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(
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

export async function signOut() {
    const auth = getAuth();
    try {
        await signOut();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
