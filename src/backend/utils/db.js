const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { v4: uuidv4 } = require('uuid');


let db;

const init = () => {
    const serviceAccount = require('../../../rental-wize-firebase-adminsdk.json');

    initializeApp({
        credential: cert(serviceAccount)
    });

    db = getFirestore();
}

const getById = async ({ collection, id }) => {
    try {

        const docRef = db.collection(collection).doc(id);
        const docSnapshot = await docRef.get();

        return docSnapshot.exists ? { id: docSnapshot.id, data: docSnapshot.data() } : null;
    }
    catch (err) {
        return null
    }
}

const getMyProductsDb = async (userId) => {
    try {

        const docRef = db.collection("products").where("ownerId", "==", userId);
        const result = await docRef.get();
        return result.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    }
    catch (err) {
        return null
    }
}

const getProductsDb = async (filters) => {
    try {
        // const { startDate, endDate, price, category } = filters;
        // ;
        const price = 35;
        const category = "1";

        const docRef = db.collection("products").where("subCategoryId", "==", category).where("price", "<=", price);
        const result = await docRef.get();
        return result.docs.map(doc => ({ id: doc.id, data: doc.data() }))
    }
    catch (err) {
        return null
    }
}

const upsertDocument = async ({ collection, docId, data }) => {
    const id = docId || `${collection}_${uuidv4()}`
    await db.collection(collection).doc(id).set(data);
    return id;
}

const runQuery = async (collection, params) => {
    const snapshot = await db.collection('users').get();
    return snapshot;
}

const closeConnection = async () => {
    await database.close();
}

module.exports = { init, closeConnection, runQuery, getById, getMyProductsDb, getProductsDb, upsertDocument }