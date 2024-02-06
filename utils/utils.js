/**
 * @param {Date} startTime
 * @param {Date} endTime
 * @returns {{startDay:string, endDay:string, startHour:string, endHour:string}}
 */
export function dateRangeFormat(startTime, endTime) {
    const locale = "en-gb";
    const dateFmt = Object.freeze({ day: "2-digit", month: "short" });
    const timeFmt = Object.freeze({ hour: "2-digit", minute: "2-digit" });
    
    const now = new Date(Date.now());
    const getDayString = (dayDelta, time) =>
        -1 <= dayDelta && dayDelta < 0
            ? "Yesterday"
            : 0 < dayDelta && dayDelta < 1
            ? "Today"
            : 1 <= dayDelta && dayDelta < 2
            ? "Tomorrow"
            : time.toLocaleDateString(locale, dateFmt);

    const startDay = getDayString(startTime.getDay() - now.getDay(), startTime);
    const endDay = getDayString(endTime.getDay() - now.getDay(), endTime);

    const startHour = startTime.toLocaleTimeString(locale, timeFmt);
    const endHour = endTime.toLocaleTimeString(locale, timeFmt);

    return { startDay, startHour, endDay, endHour };
}
