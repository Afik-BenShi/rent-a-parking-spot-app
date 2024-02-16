/**
 * @typedef {{
 *  id: string,
 *  title: string,
 *  description: string,
 *  price:{
 *      amount: number,
 *      currency: string,
 *      duration: "hour"|"day"|"week"|"month"
 *  },
 *  location: {
 *      latitude: number,
 *      longitude: number,
 *      address: string,
 *  },
 *  owner: {
 *      id: string,
 *      name: string,
 *      phoneNumber: string,
 *  },
 *  image?: string,
 *  availability: {
 *      startTime: Date,
 *      endTime: Date,
 *  },
 * }} ProductDetails
 */

/**
 * @typedef {{
 *  id: string,
 *  title: string,
 *  parkingId: string,
 *  scheduling: {
 *      startTime: Date,
 *      endTime?: Date,
 *  },
 *  reservingUser: {
 *      id: string,
 *      name: string,
 *      phoneNumber:string,
 *      carPlate: string,
 *  },
 * }} ProductReservation
 */

/**
 * @typedef {import('@react-navigation/native-stack').NativeStackScreenProps<{
 *   productDetails: {
 *     details: ProductDetails,
 *     onReserveParking?: (reservation: ProductReservation) => void | Promise<void>,
 *   },
 * }, "productDetails">} ProductDetailsPageProps
 */
