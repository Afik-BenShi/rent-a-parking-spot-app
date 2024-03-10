const _ = require("lodash");
const { upsertDocument } = require("../utils/db")

const upsertPersonalDetails = async (data) => {
    const relevantData = _.pick(data, ['fullName', 'city', 'phoneNumber']);
    const collection = 'users'
    const resultId = await upsertDocument({ collection, data: relevantData, docId: data.id });
    return resultId;
};


module.exports = { upsertPersonalDetails }