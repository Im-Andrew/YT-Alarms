import React from 'react';
import PropTypes from 'prop-types';
import style from './AlarmList.scss';

import { PillItem } from '../PillItem/PillItem';

function AlarmList({ alarms, selectedID, handleClick }) {
  // This always assumes order is held by creation, so 'default'(*) 
  // will always be first.
  return (
    <ul className={style.alarmsList}>
      {alarms
        .map( ( {name,id} ) => (
          <PillItem
            value={`${id}`}
            handleClick={handleClick}
            key={`alarm-${id}`}
            selected={selectedID === id}
          >
            {  id === 0 ? <i>*</i> : name }
          </PillItem>
        ))}

      <PillItem value={alarmListAdd} handleClick={handleClick}>
        Add +
      </PillItem>
    </ul>
  );
}

AlarmList.propTypes = {
  alarms: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedID: PropTypes.number,
  handleClick: PropTypes.func.isRequired
};

AlarmList.defaultProps = {
  selectedAlarm: 'default'
};


export const alarmListAdd = "-add-";

export { AlarmList };
