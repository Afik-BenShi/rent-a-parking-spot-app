
const dayjs = require("dayjs");
const { runQuery } = require("../utils/db")

const getProducts = async (filters) => {
    let { productId, startTime, endTime } = filters || {}
    if (!endTime)
        endTime = dayjs();
    let query = `SELECT * FROM products 
                WHERE endTime < ${endTime}`
    if (startTime) {
        query += `and startTime > ${startTime}`
    }
    if (productId) {
        query += `and id = ${productId}`
    }
    // const result = await runQuery(query);
    return query;
    // return result;
};

module.exports = { getProducts }