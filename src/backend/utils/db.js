const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


let db;

const init = () => {
    const serviceAccount = require('/Users/yonatanshay/Documents/Yonatan/rent-a-parking-spot-app/src/backend/rental-wize-firebase-adminsdk.json');

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
        return result.docs.map(doc => ({ id: doc.id, data: doc.data() }))
    }
    catch (err) {
        return null
    }
}




const getProductsDb = async (maxPrice, subCategory) => {
    try {

        // const { startDate, endDate, price, category } = filters;
        // ;
        // const price = 30;
        // const category = "1";

        const docRef = db.collection("products")
            .where("subCategoryId", "==", subCategory)
            .where("pricePerDay", "<=", maxPrice);

        const result = await docRef.get();
        return result.docs.map(doc => ({ id: doc.id, data: doc.data() }));
    } catch (err) {
        console.error("Error fetching products from the database:", err);
        return null;
    }
};


const runQuery = async (collection, params) => {
    const snapshot = await db.collection('users').get();
    return snapshot;
}

const closeConnection = async () => {
    await database.close();
}

module.exports = { init, closeConnection, runQuery, getById, getMyProductsDb, getProductsDb }