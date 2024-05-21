
const dayjs = require("dayjs");

const { runQuery, getById, getMyProductsDb, getProductsDb, addMyProductDb, updateProductInfoDb } = require("../utils/db")
const {
    getFirestore,
    Timestamp,
    FieldValue,
    Filter,
} = require("firebase-admin/firestore");

function haversine_distance(mk1, mk2) {
    //TODO: need to modify this to the lattidure, and lng to the products location
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}

const getProducts = async (filters, sort, userId) => {
    const results = await getProductsDb(filters);

    let orderedProducts;
    switch (sort) {
        case 'lowToHigh':
            {
                orderedProducts = [...results].sort(
                    (a, b) => a.pricePerDay - b.pricePerDay
                );
                break;
            }
        case 'highToLow':
            {
                orderedProducts = [...results].sort(
                    (a, b) => b.pricePerDay - a.pricePerDay
                );
                break;
            }
        case 'earlyStartTime': {
            orderedProducts = [...results].sort(
                (a, b) => a.startDate.valueOf() - b.startDate.valueOf()
            );
            break
        }

        case 'closest':
            const userDetiails = await getById({ collection: "users", id: userId })
            const { address: userLocation } = userDetiails.data
            orderedProducts = [...results].sort((a, b) => { haversine_distance(a, userLocation) - haversine_distance(b, userLocation) })
            orderedProducts
            break;
        default:
            orderedProducts = [...results].sort(
                (a, b) => a.startDate.valueOf() - b.startDate.valueOf()
            );
    }


    return orderedProducts;
};


const getMyProducts = async (userId) => {
    const result = await getMyProductsDb(userId);
    return result;
};


const addMyProduct = async (newProductData) => {
    const result = await addMyProductDb(newProductData);
    return result;
}

const updateProductInfo = async (productId, newProductData) => {
    const result = await updateProductInfoDb(productId, newProductData);
    return result;
}

module.exports = { getProducts, getMyProducts, getProducts, addMyProduct, updateProductInfo }