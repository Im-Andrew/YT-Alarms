import initialState from '../initialState';
import { CREATE_ALARM } from '../actionTypes';

export default function alarmList(state = initialState.alarmList, action) {
  switch (action.type) {
    case CREATE_ALARM:
      // We need ...state at the top to simulate "appending" an alarm

      
      const newID =
        Object.keys(state).reduce(
          (pV, cV) => Math.max(pV, state[cV]),
          0
        ) + 1;

      return {
        ...state,
        [`alarm-${newID}`]: newID
      };

    default:
      return state;
  }
}
