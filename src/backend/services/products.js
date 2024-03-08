
const dayjs = require("dayjs");

const { runQuery, getById, getMyProductsDb, getProductsDb, addMyProductDB } = require("../utils/db")


const getProducts = async (filters) => {
    const results = await getProductsDb();
    return results;
};

const getMyProducts = async (userId) => {
    const result = await getMyProductsDb(userId);
    return result;
}

const addMyProduct = async (newProductData) => {
    const result = await addMyProductDB(newProductData);
    return result;
}

module.exports = { getProducts, getMyProducts, getProducts, addMyProduct }