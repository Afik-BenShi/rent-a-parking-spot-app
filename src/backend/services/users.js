const _ = require("lodash");
const { upsertDocument, getUserSuggestionsCached, getDocumentById } = require("../utils/db");

const upsertPersonalDetails = async (data) => {
    const relevantData = _.pick(data, ['fullName', 'phoneNumber', 'address_lat', "address_lng", "address", 'imageUrl']);
    const collection = 'users'
    const resultId = await upsertDocument({ collection, data: relevantData, docId: data.token.user_id });
    return resultId;
};

const getUserSuggestions = async ({ q }) => {
    if (!q) {
        return { status: 400, response: "no users found" };
    }
    try {
        const response = await getUserSuggestionsCached(q);
        return { status: 200, response };
    } catch (err) {
        console.error(err);
        return { status: 500, response: `[getUserSuggestions] ${err}` };
    }
}

const getUserExists = async (userId) => {
    if (!userId) {
        return { status: 400, response: "no user id provided" };
    }
    const user = await getDocumentById('users', userId)
    return { status: 200, response: user.exists };
}

module.exports = { upsertPersonalDetails, getUserSuggestions, getUserExists }