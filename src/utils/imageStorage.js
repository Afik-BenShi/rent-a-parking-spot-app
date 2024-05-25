import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

    const snapshot = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    //console.log("downloadURL", downloadURL);
    return downloadURL;

    // const splitByDots = uri.split(".");
    // const suffix = splitByDots[splitByDots.length - 1];
    // const storage = getStorage();
    // const storageRef = ref(storage, `${storagePath}.${suffix}`);

    // const response = await uploadBytes(storageRef, blob);
    // return response.ref.fullPath;
}

// export async function convertToBytes(uri) {
//     const response = await fetch(uri);

//     if (!response.ok || !response.body) {
//         throw new Error("Network request failed");
//     }

//     const reader = response.body.getReader();
//     const chunks = [];

//     while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
//         chunks.push(value); // Process each received chunk (e.g., display on UI)
//     }

//     const data = new Blob(chunks);
//     return data;
// }


export async function convertToBytes(uri) {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
          } else {
            reject(new Error(`Failed to fetch image: ${xhr.status} ${xhr.statusText}`));
          }
        };
        xhr.onerror = function (e) {
          console.error('Network request failed', e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      return blob;
    } catch (error) {
      console.error("Error in convertToBytes:", error);
      throw error;
    }
  }
  