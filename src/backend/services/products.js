
const dayjs = require("dayjs");

const { runQuery, getById, getMyProductsDb, getProductsDb } = require("../utils/db")


const getProducts = async (maxPrice, subCategory) => {
    const results = await getProductsDb(maxPrice, subCategory);
    return results;
};

const getMyProducts = async (userId) => {
    const result = await getMyProductsDb(userId);
    return result;
}

module.exports = { getProducts, getMyProducts, getProducts }