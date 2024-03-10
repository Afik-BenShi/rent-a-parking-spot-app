const _ = require('lodash');
const db = require("../utils/db");

const getMyOrders = async (userId, { time }) => {
    const response = await db.getMyOrders(userId, time);
    return {status:200, response:response};
};

const addNewOrder = (reqBody) => {
    const data = _.pick(reqBody, []);
    
};

module.exports = {getMyOrders, addNewOrder};