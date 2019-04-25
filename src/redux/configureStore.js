/* eslint no-underscore-dangle: 0 */
/* global compose:true */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import initialState from './initialState';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Load in our store
let loadedStore = initialState;

let storageExists = false;
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  storageExists = true;
} catch (e) {}

if( storageExists ){
  const alarms = localStorage.getItem('alarms');
  const alarmNext = localStorage.getItem('alarmNext');

  if( alarms !== null ){
    loadedStore.alarms = JSON.parse( alarms );
  }
  if( alarmNext !== null ){
    loadedStore.alarmNext = Number.parseInt( alarmNext );
  }
}

// According to the redux docs, your app should only have one store.
export const store = createStore(rootReducer, loadedStore, composeEnhancer(applyMiddleware(thunk)));

// Save state to local storage
if( storageExists ){
  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('alarms', JSON.stringify(state.alarms));
    localStorage.setItem('alarmNext', state.alarmNext );
  });
}