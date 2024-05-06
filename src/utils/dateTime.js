import { Timestamp } from "firebase/firestore";
/**
 *
 * @param {Date | Timestamp} _startTime
 * @param {Date | Timestamp} _endTime
 */
export function dateRangeFormat(_startTime, _endTime) {
    const startTime =
        _startTime instanceof Date ? _startTime : _startTime.toDate();
    const endTime = _endTime instanceof Date ? _endTime : _endTime.toDate();

    const locale = "en-gb";
    const dateFmt = Object.freeze({ day: "2-digit", month: "short" });
    const timeFmt = Object.freeze({ hour: "2-digit", minute: "2-digit" });

    const now = new Date();
    /** @type {(time:Date)=>string} */
    const getDayString = (time) =>{
        const dayDelta = time.getDay()+time.getMonth()+time.getFullYear() - now.getDay()+now.getMonth()+now.getFullYear();
        return -1 <= dayDelta && dayDelta < 0
            ? "Yesterday"
            : 0 < dayDelta && dayDelta < 1
            ? "Today"
            : 1 <= dayDelta && dayDelta < 2
            ? "Tomorrow"
            : time.toLocaleDateString(locale, dateFmt) +
              (time.getFullYear() !== now.getFullYear()
                  ? time.getFullYear().toString()
                  : "");
    }

    const startDay = getDayString(startTime);
    const endDay = getDayString(endTime);

    const startHour = startTime.toLocaleTimeString(locale, timeFmt);
    const endHour = endTime.toLocaleTimeString(locale, timeFmt);
    return { startDay, startHour, endDay, endHour };
}

/**
 * @param {Date | Timestamp | String} date */
export function parseDate(date) {
    if (date instanceof Date) {
        return date;
    } else if (typeof date === "string") {
        return new Date(date);
    } else if ("_nanoseconds" in date && "_seconds" in date){
        timeStampToDate(date);
    }
    throw Error(`could not parse ${date} as date`);
}

export function timeStampToDate({ _seconds, _nanoseconds }) {
    return new Timestamp(_seconds, _nanoseconds).toDate();
}

export function disabledDatesForProduct(reservedDatesListFromServer){
    // Array to store the disabled dates
    const disabledDates = [];
    try{
        // Iterate through each item in the response array
        reservedDatesListFromServer.forEach(item => {
            const endDate = timeStampToDate(item['endDate'])

            // Create date range between start and end dates
            const currentDate = timeStampToDate(item['startDate'])
            while (currentDate <= endDate) {
                // Add the current date to the disabledDates array
                disabledDates.push(currentDate.toISOString().split('T')[0]); // Extract YYYY-MM-DD format
                
                // Move to the next day
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
    }
    catch{
        console.error('Error in disabledDatesForProduct:', error);
        throw new Error(`Could not create disabledDatesForProduct list: ${error.message}`);
    }
    // Unique date strings
    const uniqueDisabledDates = Array.from(new Set(disabledDates));
    return uniqueDisabledDates;
};
