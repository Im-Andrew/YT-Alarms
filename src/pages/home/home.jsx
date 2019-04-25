import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AlarmList, alarmListAdd } from '../../components/AlarmList/AlarmList';
import { AlarmSettings } from '../../components/AlarmSettings/AlarmSettings';
import { DayCheckList, dayToIndex } from '../../components/DayCheckList/DayCheckList';
import { YouTubePlayer } from '../../components/YouTubePlayer/YouTubePlayer';

import style from './home.scss';
import { createAlarm, updateAlarm, deleteAlarm } from '../../redux/alarmActions';

class Home_ extends React.Component {

  static propTypes = {
    alarms: PropTypes.arrayOf( PropTypes.object ).isRequired,
    onCreateAlarm: PropTypes.func.isRequired
  };

  state = { 
    selected: 0
  };


  /**
   * @returns alarm
   */
  get selectedAlarm(){
    const { alarms, match } = this.props;
    let selected = null;

    if( match.params.hasOwnProperty("id") ){
      selected = Number.parseInt( match.params.id );
    }
    
    if( selected === null || Number.isNaN(selected) ){
      selected = this.state.selected;
    }

    // Reset to 0 if not exist
    let alarm = alarms.find( alarm => alarm.alarmID === selected );
    
    if (alarm === undefined ){ return alarms[0]; }

    return alarm; 
  }

  set selectedAlarm( id ){
    const { history, match } = this.props;
    if( match.params.hasOwnProperty('id') ){
      history.push( `/alarms/${id}` );
    } else {
      this.setState({
        ...this.state,
        selected: id
      });
    }
  }

  /**
   * Will handle selecting a new alarm as well as when one is created.
   */
  onHandleAlarm = e => {
    const { onCreateAlarm } = this.props;
    const clickedVal = e.currentTarget.dataset.value;

    if ( clickedVal === alarmListAdd ) {
      // # Add an alarm
      onCreateAlarm();
    } else {
      // # Change selected alarm
      const selectedID = clickedVal;
      
      // fallback, no valid selection
      if( selectedID == undefined ){ return; }

      // Make sure it is a valid integer value
      let selected = parseInt(selectedID, 10);
      if (isNaN(selected)){ return; }

      this.selectedAlarm = selected;
    }
  };

  onHandleDeleteAlarm = e => {
    this.props.onDeleteAlarm(this.selectedAlarm.alarmID);
  };

  onHandleDayCheckList = e => {
    const {onUpdateAlarm} = this.props;
    const selectedDay = e.currentTarget.dataset.value; 
    if (selectedDay == undefined ){ return; }

    // need to update alarm data in storage
    const alarm = this.selectedAlarm;
    const dayIndex = dayToIndex(selectedDay);
    let checkedDays = alarm.checkedDays.slice();
    checkedDays[dayIndex] = !checkedDays[dayIndex];

    onUpdateAlarm( alarm.alarmID, { checkedDays });

  };

  onSettingsChange = e => {
    const { onUpdateAlarm } = this.props;
    const node = e.currentTarget;

    onUpdateAlarm( this.selectedAlarm.alarmID, {
      [node.dataset.alarmProperty]:node.value
    });
  };

  render() {
    const { alarms } = this.props;

    const alarm = this.selectedAlarm;
    const alarmNames = alarms.map( alarm => ({
      name:alarm.name,
      id: alarm.alarmID
    }));
    
    return (
      <main className={style.mainView}>

        <AlarmSettings 
          alarm={alarm} 
          onChange={this.onSettingsChange}
          onDeleteAlarm={this.onHandleDeleteAlarm}
        />

        <YouTubePlayer 
          id="mainPlayer" 
          key="mainPlayer" 
          videoPoint={alarm.url}
        />

        <DayCheckList
          checkList={alarm.checkedDays}
          handleClick={this.onHandleDayCheckList}
        />

        <AlarmList
          alarms={alarmNames}
          handleClick={this.onHandleAlarm}
          selectedID={alarm.alarmID}
        />

      </main>
    );
  }
}

// Map store.state to Home.props
function mapState({ alarms }) {
  return { alarms };
}

// Maps store.dispatch to Home.props
function mapDispatch(dispatch) {
  return {
    onCreateAlarm() {
      dispatch(createAlarm());
    },
    onUpdateAlarm( alarmID, updateData ){
      dispatch(updateAlarm( alarmID, updateData ));
    },
    onDeleteAlarm( alarmID ){
      dispatch(deleteAlarm(alarmID));
    }
  };
}

export const Home = withRouter( connect(
  mapState,
  mapDispatch
)(Home_) );
