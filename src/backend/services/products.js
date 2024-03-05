
const dayjs = require("dayjs");

const { runQuery, getById, getMyProductsDb, getProductsDb } = require("../utils/db")


const getProducts = async (filters) => {
    const results = await getProductsDb();
    return results;
};

const getMyProducts = async (userId) => {
    const result = await getMyProductsDb(userId);
    return result;
}

module.exports = { getProducts, getMyProducts, getProducts }