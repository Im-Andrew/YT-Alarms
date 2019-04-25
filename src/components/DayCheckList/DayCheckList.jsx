import React from 'react';
import PropTypes from 'prop-types';
import style from './DayCheckList.scss';
import { PillItem } from '../PillItem/PillItem';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

/**
 * Defines the index the name of the day corresponds to.
 * @param {string} day name of day
 * @returns {Number} Index where Sunday starts at 0 and Saturday at 6
 */
export function dayToIndex( day ){
  return ( days.indexOf( day ) + 1 ) % 7;
};


/**
 * Defines the index the name of the day corresponds to.
 * @param {string} day name of day
 * @returns {Number} Index where Sunday starts at 0 and Saturday at 6
 */
export function dayFromIndex( day ){
  return ( days[ ( day + 6 ) % 7 ] );
};

function DayCheckList({ checkList, handleClick }) {
  return (
    <ol className={style.selections} >
      {days.map( (day) => (
        <PillItem
          value={day}
          key={day}
          handleClick={handleClick}
          selected={checkList[ dayToIndex(day) ]}
        >
          {day}
          <div className={style.checkbox}></div>
        </PillItem>
      ))}
    </ol>
  );
}

DayCheckList.days = days;

DayCheckList.propTypes = {
  checkList: PropTypes.arrayOf(PropTypes.bool).isRequired,
  handleClick: PropTypes.func.isRequired
};

export { DayCheckList };
