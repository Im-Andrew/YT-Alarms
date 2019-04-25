/* eslint max-len: 0 */

/**
 * Assures the structure certainty of the application. [ book-keeping ]
 */

/**
 * @class AlarmData
 * Alarm data used to represent alarms stored for the user
 * @property {number} alarmID the indetity of this alarm
 * @property {string} time a human formatted string to represent when the alarm is punched
 * @property {string} url a youtube video url
 * @property {string} comment a comment from the user
 * @property {array<bool>} checkedDays array of T/F values for the days to be played
 * @property {string} name name of this alarm
 */
const defaultAlarmData = {
  alarmID: undefined,
  time: '00:00',
  url: '',
  comment: '',
  checkedDays: [true, true, true, true, true, true, true],
  name: ''
};

/**
 * Constructor for alarms
 * @param {integer} alarmID uid for alarm
 * @param {string} name name of alarm
 */
export function makeDefaultAlarm(alarmID, name ){
  return {
    ...defaultAlarmData,
    alarmID,
    name
  };
}

/**
 * The general&default store structure
 * @property {integer} alarmNext the UID for the next alarm
 * @property {map<string,AlarmData>} alarms a map of AlarmData where they're key'd by their id
 */
export default {
  alarmNext: 1,
  alarms: [ { 
    ...defaultAlarmData,
    alarmID: 0,
    url: 'https://www.youtube.com/watch?v=2ZUX3j6WLiQ',
    name: 'default',
    comment: 'Wake up!',
    time: '9:25am'
  } ]
};
