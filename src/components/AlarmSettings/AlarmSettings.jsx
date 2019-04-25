import React from 'react';
import PropTypes from 'prop-types';
import style from './AlarmSettings.scss';

function AlarmSettings({ alarm, onChange, onDeleteAlarm }) {

  const { name, url, time, comment, alarmID} = alarm;

  return (
    <div className={style.container}>
      
      <div className={style.nameContainer}>
        <label className={style.label} htmlFor="alarm-settings-name">
          Name
          <input
            type="text"
            id="alarm-settings-name"
            value={name}
            data-alarm-property="name"
            onChange={onChange}
          />
        </label>
        
        { alarmID!==0 && 
          <button 
            id="alarm-delete"
            className={style.deleteButton}
            type="button"
            onClick={onDeleteAlarm}
          >
            Delete
          </button>
        }
      </div>
      
      <div className={style.nameAndTime}>
        <label className={style.label} htmlFor="alarm-settings-video">
          URL
          <input
            type="text"
            id="alarm-settings-video"
            value={url}
            data-alarm-property="url"
            onChange={onChange}
          />
        </label>

        <label className={style.label} htmlFor="alarm-settings-time">
          Time
          <input
            type="text"
            id="alarm-settings-time"
            value={time}
            data-alarm-property="time"
            onChange={onChange}
          />
        </label>
      </div>

      <label className={style.label} htmlFor="alarm-settings-comment">
        Comment
        <input
          type="text"
          id="alarm-settings-comment"
          value={comment}
          data-alarm-property="comment"
          onChange={onChange}
        />
      </label>
    </div>
  );
}

AlarmSettings.propTypes = {
  alarm: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDeleteAlarm: PropTypes.func.isRequired
};

export { AlarmSettings };
