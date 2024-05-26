const { Timestamp } = require('firebase-admin/firestore');
const dayjs = require("dayjs")
const _ = require("lodash")
const { getOrdersWithOptions, upsertDocument, getProductAvailabilityDb, getDocumentRefById, getById } = require("../utils/db");

const getOrders = async (userId, options) => {
    const response = await getOrdersWithOptions(userId, options);
    return { status: 200, response: response };
};

const addNewOrder = async (reqBody) => {
    const { startDate, endDate, productId, ownerId, renterId } = reqBody;
    if (!(startDate && endDate && productId && ownerId && renterId)) {
        return { status: 400, response: 'Missing parameters on reequest' };
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
        return { status: 400, response: `one of parameters conversion failed with: ${err}` };
    }

    const collection = 'orders';
    let status = 200;
    const response = await upsertDocument({ collection, data, docId: null })
        .catch(err => {
            status = 500;
            console.error(err);
            return err;
        });
    return { status, response };
};

const getProductAvailability = async (id) => {
    const response = await getProductAvailabilityDb(id);
    return { status: 200, response: response };

};

const deleteOrder = async (orderId, userId) => {
    try {
        const oldOrderRef = getDocumentRefById('orders', orderId);
        const oldOrder = (await oldOrderRef.get()).data();
        if (!oldOrder) {
            return { status: 404, response: "order does not exist" }
        }
        if (oldOrder.ownerId !== userId) {
            return { status: 403, response: 'you are not the owner of this product' };
        }
        const response = await oldOrderRef.delete();
        return { status: 200, response };

    } catch (error) {
        console.log('[deleteOrder]', error);
        return { status: 500, response: "Server error" }
    }
}
const updateOrder = async (orderId, rsv, userId) => {
    try {
        const oldOrderRef = getDocumentRefById('orders', orderId);
        const oldOrder = (await oldOrderRef.get()).data();
        if (!oldOrder) {
            return { status: 404, response: "order does not exist" }
        }
        if (oldOrder.ownerId !== userId) {
            return { status: 403, response: 'you are not the owner of this product' };
        }
        const newRsv = Object.assign(oldOrder, {
            startDate: Timestamp.fromDate(new Date(rsv.startDate)),
            endDate: Timestamp.fromDate(new Date(rsv.endDate)),
        });
        const response = await oldOrderRef.update(newRsv);
        return { status: 200, response };

    } catch (error) {
        console.log('[updateOrder]', error);
        return { status: 500, response: "Server error" }
    }
}


const createDateRangeArray = (startDate, endDate) => {
    const dateRange = [];
    let currentDate = startDate;
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
        dateRange.push(currentDate.format('YYYY-MM-DD'));
        currentDate = currentDate.add(1, 'day');
    }

    return dateRange;
}

const getProductEmptyTimeOrder = async (id) => {
    let productTimeOrders = await getProductAvailabilityDb(id);

    const productDetails = await getById({ collection: "products", id })
    const { startDate, endDate } = productDetails.data;
    const productDateRange = createDateRangeArray(dayjs(startDate.toDate()), dayjs(endDate.toDate()))


    productTimeOrders = (productTimeOrders || []).sort(
        (a, b) => a.startDate.valueOf() - b.startDate.valueOf());
    let ordersDateRange = _.uniq(_.flatMap(productTimeOrders, ({ startDate, endDate }) => createDateRangeArray(dayjs(startDate.toDate()), dayjs(endDate.toDate()))));
    const availableDates = _.difference(productDateRange, ordersDateRange);
    return availableDates;

};


module.exports = { getOrders, addNewOrder, getProductAvailability, updateOrder, deleteOrder, getProductEmptyTimeOrder };