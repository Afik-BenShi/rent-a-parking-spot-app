
const dayjs = require("dayjs");

const { runQuery, getById, getMyProductsDb, getProductsDb } = require("../utils/db")


const getProducts = async (filters) => {
    const results = await getProductsDb(filters);
    const orderedProducts = [...results].sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );

    return results;
};

const getMyProducts = async (userId) => {
    const result = await getMyProductsDb(userId);
    return result;
}

module.exports = { getProducts, getMyProducts, getProducts }