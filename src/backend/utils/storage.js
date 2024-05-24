// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getBlob, getDownloadURL, uploadString } = require("firebase/storage");
const fs = require('fs');
const path = require('path');

let storage;

const init = () => {
    const firebaseConfig = {
        storageBucket: 'gs://rentalwize-481c2.appspot.com'
    }

    // Initialize Firebase
    initializeApp(firebaseConfig);

    storage = getStorage();
};

const uploadImageTemp = (name = 'test.png') => {
    // Points to the root reference
    const storageRef = ref(storage, `images/${name}`);

    localFilePath = '/Users/einatgelbort/student/googleWorkshop/rent-a-parking-spot-app/assets/adaptive-icon.png'

    const fileContent = fs.readFileSync(localFilePath);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, fileContent).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });

    uploadBytes(refTemp, fileContent).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
    // const uploadTask = storageRef.child('images/' + file.name).put(fileContent);
}

const uploadImage = async ({ name, imageFile }) => {
    // Points to the root reference
    const storageRef = ref(storage, `images/${name}.png`);

    const splitFile = imageFile.split(',');
    const base64Image = splitFile[splitFile.length - 1];

    const response = await uploadString(storageRef, imageFile, 'base64');
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
}


const getImage = async (imageName) => {
    const pathRef = ref(storage, `images/${imageName}.png`);
    const url = await getDownloadURL(pathRef)
    return url
    // getDownloadURL(pathRef).then((url) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.responseType = 'blob';
    //     xhr.onload = (event) => {
    //         const blob = xhr.response;
    //     };
    //     xhr.open('GET', url);
    //     xhr.send();

    //     // Or inserted into an <img> element
    //     const img = document.getElementById('myimg');
    //     img.setAttribute('src', url);
    // })
    //     .catch((error) => {
    //         // Handle any errors
    //     });

}


module.exports = { uploadImage, getImage, init }
