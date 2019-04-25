// import { combineReducers } from 'redux';
import initialState, { makeDefaultAlarm } from './initialState';
import * as types from './actionTypes';

function createAlarm( state ){
  const nameTemplate = 'Alarm ';

  const newID = state.alarmNext;
  let alarmName = `${nameTemplate}${newID}`;

  // Fix any name collision
  for( let fixID = newID + 1; state.alarms.hasOwnProperty(alarmName); fixID ++ ){
    alarmName = `${nameTemplate}${fixID}`;
  }

  return {
    // shallow copy previous state 
    ...state, 

    // bump the id
    alarmNext: newID + 1,

    // Generate a new alarm to the list
    alarms: [
      ...state.alarms,
      makeDefaultAlarm( newID, alarmName )
    ]
  }
};

function updateAlarm(state, alarmID, updateData ){
  
  // Exit if it doesn't exist
  const foundAlarm = state.alarms.find( 
    (alarm)=> alarm.alarmID === alarmID 
  );
  if (foundAlarm === undefined ){ return state; }
  
  // Transfer exactly the correct amount of properties expected
  let updatedAlarm = { ...foundAlarm };
  for( let key of Object.keys(updatedAlarm) ){
    if( updateData.hasOwnProperty(key) ){ 
      updatedAlarm[key] = updateData[key]; 
    }
  }

  return {
    ...state,
    alarms: state.alarms.map( (alarm) => alarm.alarmID === alarmID ? updatedAlarm : alarm )
  }
};

function deleteAlarm(state, alarmID){
  return ({
    ...state,
    alarms: state.alarms.filter( (alarm)=>alarm.alarmID !== alarmID )
  });
}

export default function rootReducer( state = initialState, action ){
  switch( action.type ){
    case types.CREATE_ALARM: return createAlarm( state );
    case types.UPDATE_ALARM: return updateAlarm( state, action.alarmID, action.updateData );
    case types.DELETE_ALARM: return deleteAlarm( state, action.alarmID );
    default: return state;
  }
};
