/**
 * @typedef {{
*  id: string,
*  location: {
*      latitude: string,
*      longitude: string,
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
* @typedef {{
*  parkingDetails: ParkingDetails,
*  onReserveParking?: (reservation: ParkingReservation) => void | Promise<void>, 
* }} ParkingDetailsPageProps
*/