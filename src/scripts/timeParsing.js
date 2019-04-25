

/**
 * Will parse the hours and minutes and return it in an array [ hh, mm ]
 */
export function parseHumanTime(timeStr) {
    // determine if AM or PM exists and remove
    const baseTime = timeStr.replace(/[AaPp]\.?[mM]\.?/, '');

    // Check if valid time https://regexr.com/4a3ir
    if (!baseTime.match(/^([0-9:]+)$/gi)) { return null; }

    let hours = (~timeStr.search(/[pP]/g)) ? 12 : 0;

    // Case 0: Provided no time
    const times = baseTime.split(':').map(Number.parseFloat);
    if (times.length == 0) { return [hours, 0]; }

    // if user provided hours greater than 11, we assume PM is ignored
    hours = (times[0] >= 12) ? (times[0] % 24) : (hours + times[0]) % 24;

    // Case 1: Provided hours only
    if (times.length == 1) { return [hours, 0]; }

    // Case 2: Provided Hours + Minutes + anything else
    return [hours, times[1] % 60];
};

/**
 * Will return if a time string is valid or not.
 * @param {String} timeStr human entered time string
 */
export function timeIsValid(timeStr) {
    return (parseHumanTime(timeStr) !== null);
}


/**
 * Will turn a human entered date into a JS Date object.
 * @param {Number} dayIndex Date associated - Where 0 is Sunday.
 * @param {String} humanTime The time entered by a person to be parsed ( supporting, hopefuly, various time formats )
 * @return {Date} 
*/
export function humanDateToDate(humanTime, dayIndex = -1) {
    const times = parseHumanTime(humanTime);
    if ( times == null ){ return null; }

    const date = new Date();
    if (dayIndex === -1) { dayIndex = date.getDay() }
    const daysOffset = (dayIndex - date.getDay() + 7) % 7;
    const dayOffsetMillis = daysOffset * 24 * 60 * 60 * 1000;
    const [hh, ss] = times;
    let projectedDate = new Date(Date.now() + dayOffsetMillis);
    projectedDate.setHours(hh);
    projectedDate.setMinutes(ss);
    projectedDate.setSeconds(0);
    projectedDate.setMilliseconds(0);
    return projectedDate;
};

/**
 * Converts milliseconds into an object with hours, minutes, and seconds
 * @param {Number} millis
 */
export function timeComposition( millis ){
    const hh = Math.floor(millis / (1000 * 60 * 60));
    const mm = Math.floor(millis / (1000 * 60) % 60);
    const ss = Math.floor(millis / (1000) % 60);
    return { hh, mm, ss };
}

/**
 * Converts milliseconds to its hh:mm:ss representation
 * @param {Number} millis milliseconds
 */
export function timeToHumanReadable( millis ){
    const t = timeComposition( millis );
    return ( 
        String(t.hh).padStart(2,0) + ":" +
        String(t.mm).padStart(2,0) + ":" +
        String(t.ss).padStart(2,0)
    );
};

/** Test ^
 * timeToHumanReadable( 21*60*60*1000 + 33*60*1000 + 45 * 1000 );
 * > {hh: 21, mm: 33, ss: 45}
 */