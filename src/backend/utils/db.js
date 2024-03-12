const { initializeApp, cert } = require("firebase-admin/app");
const {
    getFirestore,
    Timestamp,
    FieldValue,
    Filter,
} = require("firebase-admin/firestore");
const { v4: uuidv4 } = require("uuid");

/** @type {FirebaseFirestore.Firestore} */
let db;

const init = () => {
    const serviceAccount = require("../../../rental-wize-firebase-adminsdk.json");

    initializeApp({
        credential: cert(serviceAccount),
    });

    db = getFirestore();
};

const getById = async ({ collection, id }) => {
    try {
        const docRef = db.collection(collection).doc(id);
        const docSnapshot = await docRef.get();

        return docSnapshot.exists
            ? { id: docSnapshot.id, data: docSnapshot.data() }
            : null;
    } catch (err) {
        return null;
    }
};

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

async function findEmptySlotsForProducts({ productIds, startDate, endDate }) {
    let productsWithEmptySlots = [];

    for (const productId of productIds) {
        const slotsRef = collection(db, "products", productId, "slots");
        const q = query(slotsRef, where("date", ">=", startDate), where("date", "<=", endDate), where("isEmpty", "==", true));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // This product has at least one empty slot in the date range
            productsWithEmptySlots.push(productId);
        }
    }
    return productsWithEmptySlots;
}

const getProductsDb = async (filters) => {
    try {
        const { startDate, endDate, maxPrice, subCategory, city } = filters;

        let docRef = db.collection("products")
        if (subCategory) {
            docRef = docRef.where("subCategoryId", "==", subCategory)
        }
        if (maxPrice) {
            docRef = docRef.where("pricePerDay", "<=", maxPrice);
        }
        if (city) {
            docRef = docRef.where("city", "==", city);
        }
        //TODO: need to filter on startDate, endDate just according to slots , or here. Cannot create multiple query with inequality,
        const result = await docRef.get();
        return result.docs.map(doc => (doc.data()))
    }
};

const addMyProductDb = async (newProductData) => {
    async function addSlot(parentDocId, date, userId) {
        const slotDocRef = doc(db, "parentCollection", parentDocId, "slots", userId);

        await setDoc(slotDocRef, {
            date: date,
            userId: userId,
            isEmpty: true
        });
    }

    try {
        const docRef = db.collection("products").doc();
        const newProduct = {
            ...newProductData,
            createdAt: FieldValue.serverTimestamp(),
        };
        await docRef.set(newProduct);
        return { id: docRef.id, data: newProduct };
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

/** @param {'future'|'past'|'all'} [time='future'] */
const getMyOrders = async (userId, time = "future") => {
    const baseQuery = db.collection("orders").where("userId", "==", userId);
    const conditionalQuery =
        time === "future"
            ? baseQuery.where("endDate", ">=", new Date())
            : time === "past"
            ? baseQuery.where("endDate", "<", new Date())
            : baseQuery;

    const query = conditionalQuery.orderBy("endDate").orderBy("startDate");

    const snapshot = await query.get();
    let docsWithProducts;
    try {
        docsWithProducts = await enrichWithReferencedId(
            snapshot.docs,
            "productId",
            "products"
        );
    } catch (err) {
        throw new Error(`[getOrders][productEnrichment] ${err}`);
    }
    return docsWithProducts;
};

const enrichWithReferencedId = async (docs, refKey, refCollection) => {
    const enrichPromises = docs.map(async (doc) => {
        const data = doc.data();
        const reffedId = data[refKey];
        try {
            const reffedData = await db
                .collection(refCollection)
                .doc(reffedId)
                .get();
            return Object.assign(data, {
                [`enriched_${refKey}`]: reffedData.data(),
            });
        } catch (err) {
            throw new Error(
                `failed enriching ${data.id} with ${refKey}='${reffedId} of collection ${refCollection}`
            );
        }
    });
    return await Promise.all(enrichPromises);
};

const upsertDocument = async ({ collection, docId, data }) => {
    const id = docId || `${collection}_${uuidv4()}`;
    await db.collection(collection).doc(id).set(data);
    return id;
};

const runQuery = async (collection, params) => {
    const snapshot = await db.collection("users").get();
    return snapshot;
};

const closeConnection = async () => {
    await database.close();
};

module.exports = {
    init,
    closeConnection,
    runQuery,
    getById,
    getMyProductsDb,
    getProductsDb,
    addMyProductDb,
    upsertDocument,
    getMyOrders,
};
