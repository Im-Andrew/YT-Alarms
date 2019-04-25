/**
 * Used to assist with operating with alarm data.
 */
import {humanDateToDate, timeIsValid} from './timeParsing';

/**
 * Check if an alarm happens today or tomorrow
 * @param {Alarm} alarm alarm data object
 */
export function todayOrTomorrow( alarm ){
    var today = (new Date()).getDay();
    return alarm.checkedDays[today] || alarm.checkedDays[ (today+1)%7 ];
};

/**
 * Check if alarm is active
 * @param {Alarm} alarm alarm data object
 */
export function isActive( alarm ){
    return alarm.checkedDays.some( (val) => val )
};

/**
 * Returns milliseconds left until the next activation 
 * @param {Alarm} alarm 
 * @param {Number} day current index of day
 * @return {Number} -1 if failed
 */
export function timeLeft( alarm, day, now ){
    if ( arguments.length !== 3 ){
        console.error(`Expected 3 arguments but recieved ${arguments.length}`);
    }
    if ( !timeIsValid( alarm.time ) ){ 
        return -1;
    }

    for (let i = 0; i < 7; i++) {
        let dayI = (i + day) % 7;
        if (alarm.checkedDays[dayI]) {
            const date = humanDateToDate(alarm.time, dayI);
            // don't accept passed times
            if (date.getTime() - now >= 0 ){
                return date.getTime() - now;
            }
        }
    }
    return -1;
}