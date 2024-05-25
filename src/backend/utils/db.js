const { initializeApp, cert } = require("firebase-admin/app");
const {
    getFirestore,
    Timestamp,
    FieldValue,
    Filter,
} = require("firebase-admin/firestore");
const { v4: uuidv4 } = require("uuid");
const createCache = require("./cache");
const { storage } = require("firebase-admin");
const { getImage } = require('./storage');
const config = require('../config');


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
        return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
        return null;
    }
};

async function findEmptySlotsForProducts({ productIds, startDate, endDate }) {
    let productsWithEmptySlots = [];

    for (const productId of productIds) {
        const slotsRef = collection(db, "products", productId, "slots");
        const q = query(
            slotsRef,
            where("date", ">=", startDate),
            where("date", "<=", endDate),
            where("isEmpty", "==", true)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // This product has at least one empty slot in the date range
            productsWithEmptySlots.push(productId);
        }
    }
    return productsWithEmptySlots;
}


const getProductsDb = async (filters) => {
    let docs;
    try {
        const { startDate, endDate, maxPrice, mainCategory, city } = filters;

        let docRef = db.collection("products")

        if (mainCategory && mainCategory != "0") {  // 0 for all products
            console.log("Enterd :    mainCategory", mainCategory);
            docRef = docRef.where("mainCategoryId", "==", mainCategory);
        }
        if (maxPrice) {
            docRef = docRef.where("pricePerDay", "<=", parseFloat(maxPrice));
        }
        if (city) {

            const capitalizedCity = city.replace(/\b\w/g, function (char) { return char.toUpperCase(); });
            const loweredCity = city.replace(/\b\w/g, function (char) { return char.toLowerCase(); });
            const AllCap = city.toUpperCase();
            const AllLower = city.toLowerCase();

            docRef = docRef.where("city", 'in', [city, capitalizedCity, loweredCity, AllCap, AllLower]);
        }
        if (startDate && endDate) {
            try {
                const productsSnapshot = await docRef.get();
                const productIds = productsSnapshot.docs.map((doc) => doc.id);

                const availableProductsPromises = productIds.map((productId) =>
                    getAvailableProductsWithinDateRange(productId, startDate, endDate));
                
                console.log("availableProductsPromises : ", availableProductsPromises);

                const availableProducts = await Promise.all(availableProductsPromises);
                // availableProducts is an array of arrays, you might want to flatten it if needed

                const distincts = await distinctProducts(availableProducts.flat());
                
                //Map distinct products to the required format
                docs = distincts.map(product => ({
                    ...product,
                    id: product.id // id is productId
                }));
                //  return distincts;
                
            } catch (error) {
                console.error("Error fetching product by dates range:", error);
                throw error;
            }
        }
        else{
            const result = await docRef.get();
            docs = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        }

        try {
            const enrichmentProps = [
                { key: "ownerId", collection: "users" }
            ];
            const enrichPromises = enrichmentProps.map(
                async ({ key, collection }) => {
                    docs = await enrichWithReferencedId(docs, key, collection);
                }
            );
            const availableProducts = await Promise.all(enrichPromises);
        } catch (err) {
            throw new Error(`[getProdusts in home page][ownerEnrichment] ${err}`);
        }
        return docs;

        
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};

const updateProductInfoDb = async (productId, newProductData) => {
    const { title, description } = newProductData;
    try {
        const docRef = db.collection("products").doc(productId);
        // Update only specific fields (title and description)
        await docRef.update({ title, description });
        return { id: docRef.id, title, description };
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};


const addMyProductDb = async (newProductData) => {
    async function addSlot(parentDocId, date, userId) {
        const slotDocRef = doc(
            db,
            "parentCollection",
            parentDocId,
            "slots",
            userId
        );

        await setDoc(slotDocRef, {
            date: date,
            userId: userId,
            isEmpty: true,
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

/**
 * @param {string} userId
 * @param {{time: 'future'|'past'|'all', type: "renter"|"owner", productId?:string}} options */
const getOrdersWithOptions = async (
    userId,
    { time = "future", type = "renter", productId = undefined }
) => {
    const baseQuery = db.collection("orders");
    const productQuery = productId
        ? baseQuery.where("productId", "==", productId)
        : baseQuery.where(`${type}Id`, "==", userId);
    const timeQuery =
        time === "future"
            ? productQuery.where("endDate", ">=", new Date())
            : time === "past"
                ? productQuery.where("endDate", "<", new Date())
                : productQuery;

    const query = timeQuery.orderBy("endDate").orderBy("startDate");

    const snapshot = await query.get();
    let docs = snapshot.docs.map((doc) =>
        Object.assign(doc.data(), { id: doc.id })
    );
    try {
        const enrichmentProps = [
            { key: "productId", collection: "products" },
            type === "renter"
                ? { key: "ownerId", collection: "users" }
                : { key: "renterId", collection: "users" },
        ];
        const enrichPromises = enrichmentProps.map(
            async ({ key, collection }) => {
                docs = await enrichWithReferencedId(docs, key, collection);
            }
        );
        await Promise.all(enrichPromises);
    } catch (err) {
        throw new Error(`[getOrders][productEnrichment] ${err}`);
    }
    return docs;
};

const enrichWithReferencedId = async (docs, refKey, refCollection) => {
    const enrichPromises = docs.map(async (data) => {
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

const getUserSuggestions = async (q) => {
    const collectionRef = db.collection("users");
    const byPhoneNum = collectionRef.where("phoneNumber", "==", q);
    const { docs } = await byPhoneNum.get();
    const users = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return users;
};

const getUserSuggestionsCached = createCache(getUserSuggestions, 300);

const getDocumentRefById = (collection, docId) => {
    return db.collection(collection).doc(docId);
}

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


/**
 * @param {string} productId 
 * @param {Timestamp} startDate 
 * @param {Timestamp} endDate */
const getAvailableProductsWithinDateRange = async (productId, startDate, endDate) => {
    try {
        const freeProducts = [];

        // Step 1: Query product table for the given productId
        const productDoc = await db.collection('products').doc(productId).get();
        if (!productDoc.exists) {
            throw new Error(`Product with ID ${productId} does not exist`);
        }

        const productData = productDoc.data();
        console.log("productData : ", productData);
        const availableStartDate = productData.startDate;
        const availableEndDate = productData.endDate;

        // Check if the given date range is within the available range of the product
        if (startDate >= availableStartDate && endDate <= availableEndDate) {
            // Step 2: Query orders table
            const orderSnapshot = await db.collection('orders')
                .where('productId', '==', productId)
                .get();
            const overlappingOrders = orderSnapshot.docs.filter((orderDoc) => {
                const orderData = orderDoc.data();
                const orderStartDate = orderData.startDate;
                const orderEndDate = orderData.endDate;
                // Check if the given date range overlaps with any existing order
                return startDate <= orderEndDate && endDate >= orderStartDate
            });
            // Check if there are any overlapping orders
            if (overlappingOrders.length === 0) {
                // No overlapping orders found, so the product is free during the given date range
                freeProducts.push({ ...productData, id: productId });
            }
        }

        // Return the list of free products for the current productId
        return freeProducts;
    } catch (error) {
        console.error(`Error retrieving available products for ID ${productId}: `, error);
        return [];
    }
};


/**
 * @param {Array} items 
 */
const distinctProducts = async (items) => {
    // Create a map to store unique items based on some identifier (e.g., productId)
    const uniqueProductsMap = new Map();
    items.forEach((product) => { uniqueProductsMap.set(product.productId, product); });

    // Convert the map values back to an array
    const distinctProducts = Array.from(uniqueProductsMap.values());
    return distinctProducts;
};

/**
 * @param {string} product id 
 */
const getProductAvailabilityDb = async (id) => {
    try {
        const docRef = db.collection("orders").where("productId", "==", id);
        const result = await docRef.get();
        return result.docs.map(doc => ({ startDate: doc.data().startDate, endDate: doc.data().endDate, id: doc.id }));
    } catch (error) {
        console.error(`Error retrieving products availability `, error);
        return null;
    }
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
    getOrdersWithOptions,
    getUserSuggestionsCached,
    getProductAvailabilityDb,
    getDocumentRefById,
    updateProductInfoDb,
};
