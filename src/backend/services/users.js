const _ = require("lodash");
const { upsertDocument } = require("../utils/db")

const upsertPersonalDetails = async (data) => {
    //TODO: need to support in edit - it means to know the id. 
    console.log('data in upsertPersonalDetails', data)
    const relevantData = _.pick(data, ['fullName', 'city', 'phoneNumber']);
    const collection = 'users'
    const resultId = await upsertDocument({ collection, data: relevantData });
    console.log('result', result)
    return resultId;
};


module.exports = { upsertPersonalDetails }