
const dayjs = require("dayjs");

const { runQuery, getById, getMyProductsDb, getProductsDb, addMyProductDb } = require("../utils/db")


const getProducts = async (filters) => {
    const results = await getProductsDb();
    return results;
};

const getMyProducts = async (userId) => {
    const result = await getMyProductsDb(userId);
    return result;
}

const addMyProduct = async (newProductData) => {
    const result = await addMyProductDb(newProductData);
    return result;
}

module.exports = { getProducts, getMyProducts, getProducts, addMyProduct }