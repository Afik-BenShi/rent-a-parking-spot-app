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

    const storage = getStorage();
    const storageRef = ref(storage, storagePath);

    const response = await uploadBytes(storageRef, blob);

    response.metadata
}
