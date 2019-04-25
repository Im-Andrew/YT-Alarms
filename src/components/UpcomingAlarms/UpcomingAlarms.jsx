import React from 'react';
import PropTypes from 'prop-types';

import * as alarmkit from '../../scripts/alarmkit';
import { UpcomingAlarm } from '../UpcomingAlarm/UpcomingAlarm';

import style from './UpcomingAlarms.scss';


class UpcomingAlarms extends React.Component {
    static propTypes = {
        showing: PropTypes.bool.isRequired,                       // if page active
        alarms: PropTypes.arrayOf(PropTypes.object).isRequired,   // existing alarms
        onAlarmActivated: PropTypes.func.isRequired               // called when a transition occurs
    };

    state = {
        upcoming: []        // Alarms waiting to activate
    };

    watchInterval = null;
    watchWait = 30 * 60 * 1000; // 30 minutes for interval
    upcomingTime = 23 * 60 * 60 * 1000; // 23 hours for watching

    componentDidMount = () => {
        this.watchInterval = window.setInterval(
            this.watchAlarms,
            this.watchWait
        );
    }

    componentWillUnmount = () => {
        window.clearInterval(this.watchInterval);
        window.clearInterval(this.renderInterval);
        this.watchInterval = null;
    }

    // Watches for when an alarm activates within 23 hours
    watchAlarms = () => {
        const { alarms } = this.props;
        this.forceUpdate();
    };

    onAlarmActivated = activated => {
        const { onAlarmActivated } = this.props;
        const { upcoming } = this.state;
        this.setState({
            ...this.state,
            upcoming: upcoming.filter((alarm) => activated.alarmID !== alarm.alarmID)
        });
        onAlarmActivated(activated);
    };

    render() {
        const { showing, alarms } = this.props;
        const [dayIndex, now] = [(new Date()).getDay(), Date.now()];
        // Get list of alarms that are coming up
        const upcoming = alarms.filter((alarm) => {
            const timeLeft = alarmkit.timeLeft(alarm, dayIndex, now);
            return (timeLeft === -1) ? false : (timeLeft < this.upcomingTime);
        });

        return (
        <>
            {
                upcoming.sort(
                    (a, b) => {
                        return alarmkit.timeLeft(a, dayIndex, now)
                            - alarmkit.timeLeft(b, dayIndex, now);
                    }
                ).map(
                    (alarm, i) => (
                        <UpcomingAlarm
                            key={i}
                            alarm={alarm}
                            onAlarmActivated={this.onAlarmActivated}
                            showing={showing}
                        />
                    )
                )
            }
        </>
        );
    }
}


export {UpcomingAlarms};
