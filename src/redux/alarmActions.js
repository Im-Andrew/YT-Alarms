import * as types from './actionTypes';

/**
 * This will allow our reducers to allocate space for a new alarm in the store.
 * @param {string} name Title for this alarm
 * @param {number} id Unique identity for this alarm
 */
export function createAlarm() {
  return { type: types.CREATE_ALARM };
};

/**
 * Will cause an update to happen in storage tree for this alarm.
 * @param {number} alarmID id of alarm
 * @param {object} updateData an object with updated properties
 */
export function updateAlarm(alarmID, updateData ){
  return {
    type: types.UPDATE_ALARM,
    alarmID,
    updateData
  }
};

/**
 * Will cause an update to happen in storage tree for this alarm.
 * @param {number} alarmID id of alarm
 */
export function deleteAlarm(alarmID){
  return {
    type: types.DELETE_ALARM,
    alarmID
  };
};