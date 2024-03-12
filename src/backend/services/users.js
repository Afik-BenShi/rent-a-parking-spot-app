const _ = require("lodash");
const { upsertDocument, getUserSuggestionsCached } = require("../utils/db")

const upsertPersonalDetails = async (data) => {
    const relevantData = _.pick(data, ['fullName', 'city', 'phoneNumber']);
    const collection = 'users'
    const resultId = await upsertDocument({ collection, data: relevantData, docId: data.id });
    return resultId;
};

const getUserSuggestions = async ({q}) => {
    if (!q) {
        return {status:400, response:"no users found"};
    }
    try {
        const response = await getUserSuggestionsCached(q);
        return {status: 200, response};
    } catch (err) {
        console.error(err);
        return {status: 500, response:`[getUserSuggestions] ${err}`};
    }
}


module.exports = { upsertPersonalDetails, getUserSuggestions}