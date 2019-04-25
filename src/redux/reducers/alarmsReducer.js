import initialState, { defaultAlarmData } from '../initialState';
import { CREATE_ALARM } from '../actionTypes';

export default function alarmList(state = initialState.alarms, action) {
  switch (action.type) {
    case CREATE_ALARM:
      return {
        [action.id]: {
          alarmID: action.id,
          ...defaultAlarmData
        },
        ...state
      };

    default:
      return state;
  }
}
