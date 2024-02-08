/**
 * @typedef {{
 *  id: string,
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
 *  parkingImage?: string,
 *  availability: {
 *      startTime: Date,
 *      endTime: Date,
 *  },
 * }} ParkingDetails
 */

/**
 * @typedef {{
 *  id: string,
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
 * }} ParkingReservation
 */

/**
 * @typedef {import('@react-navigation/native-stack').NativeStackScreenProps<{
 *  parkingDetails:{
 *      details: ParkingDetails,
 *      onReserveParking?: (reservation: ParkingReservation) => void | Promise<void>,
 * }}, "parkingDetails">} ParkingDetailsPageProps
 */
