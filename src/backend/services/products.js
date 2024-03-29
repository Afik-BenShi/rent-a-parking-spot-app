
const dayjs = require("dayjs");

const { runQuery, getById, getMyProductsDb, getProductsDb, addMyProductDb, getProductsByCatgeoryDb } = require("../utils/db")
const {
    getFirestore,
    Timestamp,
    FieldValue,
    Filter,
} = require("firebase-admin/firestore");

const getProducts = async (filters) => {
    const results = await getProductsDb(filters);
    
    const orderedProducts = [...results].sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );

    return orderedProducts;
};


const getMyProducts = async (userId) => {
    const result = await getMyProductsDb(userId);
    return result;
};


const addMyProduct = async (newProductData) => {    
    const result = await addMyProductDb(newProductData);
    return result;
}

module.exports = { getProducts, getMyProducts, getProducts, addMyProduct }