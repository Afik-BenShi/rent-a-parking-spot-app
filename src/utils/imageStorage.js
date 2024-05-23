import { getStorage, ref, uploadBytes } from "firebase/storage";

export async function uploadImage(storagePath, uri) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const splitByDots = uri.split(".");
    const suffix = splitByDots[splitByDots.length - 1];
    const storage = getStorage();
    const storageRef = ref(storage, `${storagePath}.${suffix}`);

    const response = await uploadBytes(storageRef, blob);
    return response.ref.fullPath;
}

export async function convertToBytes(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    const base64img = await new Promise((res, rej) => {
        reader.onload = (e) => {
            res(e.target.result);
        };
    });
    return base64img;
}
