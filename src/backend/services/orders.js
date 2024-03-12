const { Timestamp } = require('firebase-admin/firestore');
const { getOrdersWithOptions, upsertDocument} = require("../utils/db");

const getOrders = async (userId, options) => {
    const response = await getOrdersWithOptions(userId, options);
    return { status:200, response:response };
};

const addNewOrder = async (reqBody) => {
    const {startDate, endDate, productId, ownerId, renterId} = reqBody;
    if (!(startDate && endDate && productId && ownerId && renterId)) {
        return {status: 400, response:'Missing parameters on reequest'};
    }
    let data;
    try {
        data = {
            startDate: Timestamp.fromDate(new Date(startDate)),
            endDate: Timestamp.fromDate(new Date(endDate)),
            orderDate: Timestamp.fromDate(new Date()),
            productId,
            ownerId,
            renterId,
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

module.exports = {getOrders, addNewOrder};