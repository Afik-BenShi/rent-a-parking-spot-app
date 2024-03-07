const { default: axios } = require("axios");

const MAPS_ENDPOINT = "https://nominatim.openstreetmap.org";
const RESPONSES = {
    noQuery: { status: 400, response: "Requset must have query data" },
    noUserData: { status: 400, response: "Request must have user data" },
    serverError: { status: 500, response: "Server error" },
};

/**
 * @template {userQuery} Q
 * @template R
 * @param {RequestHandler<Q, R>} requestHandler
 * @returns {RequestHandler<Q, R>}
 */
function locationRequest(requestHandler) {
    return async (query) => {
        if (!query?.userId) {
            return RESPONSES.noUserData;
        }
        try {
            return requestHandler(query);
        } catch (error) {
            console.log(`[locationRequest] ${error}`);
            return RESPONSES.serverError;
        }
    };
}

/** @type {RequestHandler<structuredQuery, Geocode[]>} */
const getGeocodeStructured = locationRequest(async (query) => {
    const allowed = [
        "amenity",
        "street",
        "city",
        "county",
        "state",
        "country",
        "postalcode",
    ];
    const queryArray = Object.entries(query)
        .filter(([key, _]) => allowed.includes(key))
        .map(([key, value]) => `${key}=${encodeURI(value)}`);
    if (queryArray.length <= 0) {
        return RESPONSES.noQuery;
    }

    const queryString = queryArray.join("&");
    const { status, data } = await axios.get(
        MAPS_ENDPOINT + "search?limit=3&format=json&" + queryString
    );

    const response = data.map(locationFormat);
    return { status, response };
});

/** @type {RequestHandler<userQuery & {q:string}, Geocode[]>} */
const getGeocode = locationRequest(async (query) => {
    if (!query?.q) {
        return RESPONSES.noQuery;
    }

    const queryString = `q=${encodeURI(query.q)}`;
    const { status, data } = await axios.get(
        MAPS_ENDPOINT + "/search?limit=3&format=json&" + queryString
    );
    
    const response = data.map(locationFormat);
    return { status, response };
});

/** @returns {Geocode} */
const locationFormat = ({ lat, lon, display_name, boundingBox }) => ({
    lat,
    lon,
    display_name,
    boundingBox,
});

module.exports = { getGeocodeStructured, getGeocode };

/**
 * @typedef {{userId:string}} userQuery
 */
/**
 * @template Q
 * @template R
 * @typedef {(query:Partial<Q>)=>Response<R>} RequestHandler
 */

/**
 * @template T
 * @typedef {Promise<{status: number, response:T | string}>} Response<T>
 */
/**
 * @typedef {{lat:string,lon:string,display_name:string,boundingBox:string}} Geocode
 */
/**
 * @typedef { "amenity" | "street"  | "city" | "county" |
 *              "state" | "country" | "postalcode" } structuredKeys
 * @typedef { userQuery & Record<structuredKeys, string> } structuredQuery
 */
