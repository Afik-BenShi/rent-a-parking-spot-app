const { Timestamp } = require('firebase-admin/firestore');
const { getMyOrders: db_getMyOrders, upsertDocument} = require("../utils/db");

const getMyOrders = async (userId, { time }) => {
    const response = await db_getMyOrders(userId, time);
    return { status:200, response:response };
};

const addNewOrder = async (reqBody) => {
    const {startDate, endDate, productId, userId} = reqBody;
    if (!(startDate && endDate && productId && userId)){
        return {status: 400, response:'Missing parameters on reequest'};
    }
    let data;
    try {
        data = {
            startDate: Timestamp.fromDate(new Date(startDate)),
            endDate: Timestamp.fromDate(new Date(endDate)),
            orderDate: Timestamp.fromDate(new Date()),
            productId,
            userId,
        }   
    } catch (err) {
        console.error('[addNewOrder]', err);
        return {status:400, response: `one of parameters conversion failed with: ${err}`};
    }

    const collection = 'orders';
    let status = 200;
    const response = await upsertDocument({collection, data,  docId: null})
        .catch(err => {
            status = 500;
            console.error(err);
            return err;
        });
    return {status, response};
};

module.exports = {getMyOrders, addNewOrder};