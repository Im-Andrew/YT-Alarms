import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { Link } from 'react-router-dom';

import { timeToHumanReadable } from '../../scripts/timeParsing';
import * as alarmkit from '../../scripts/alarmkit';
import * as YTP from '../../scripts/youtube_player';

import style from './UpcomingAlarm.scss';


class UpcomingAlarm extends React.Component {

    static propTypes = {
        showing: PropTypes.bool.isRequired,
        alarm: PropTypes.object.isRequired,
        onAlarmActivated: PropTypes.func.isRequired,
    };

    state = {
        displayTime: ""
    };

    timeTill = 0;
    interval = null;
    intervalWait = 1 * 1000; // every second

    getTimeTill = memoize(
        (alarm, dayIndex, now) => now + alarmkit.timeLeft(alarm, dayIndex, now),
        (newAlarm, oldAlarm) => (
            newAlarm[0].time === oldAlarm[0].time &&
            newAlarm[0].checkedDays.every(
                (newVal, i) => oldAlarm[0].checkedDays[i] === newVal
            )
        )
    );

    shouldComponentUpdate = ({ showing, alarm}) => {
        return showing;
    }

    componentDidMount = () => {
        const { alarm } = this.props;
        const now = Date.now();
        this.timeTill = this.getTimeTill( alarm, (new Date()).getDay(), now );

        this.updateTime();
        this.interval = window.setInterval(this.updateTime, this.intervalWait);
    };

    componentWillUnmount = () => {
        window.clearInterval(this.interval);
        this.interval = null;
    };

    updateTime = () => {
        const { alarm, onAlarmActivated } = this.props;
        const now = Date.now();
        this.timeTill = this.getTimeTill(alarm, (new Date()).getDay(), now);
        const timeLeft = this.timeTill - now;
        if (timeLeft <= 0) {
            onAlarmActivated(alarm);
            return;
        }
        // Update time if still counting down
        this.setState({
            displayTime: timeToHumanReadable(timeLeft)
        });
    };

    render() {
        const { name, time, url, alarmID } = this.props.alarm;
        const { displayTime } = this.state;
        const params = YTP.getVideoParameters( url );
        const thumbURL = YTP.getThumbnailURL( params.v );

        return (
            <li className={style.container}>
                <Link to={`/alarms/${alarmID}`}>
                    <div className={style.header}>
                        <span>{name}</span> 
                        <span className={style.setTime}>{time}</span>
                    </div>
                    <div className={style.thumbnail}>
                        <img className={style.image} src={thumbURL} />
                        <div className={style.countdown}>
                            <div className={style.loadBar}></div>
                            {displayTime}
                        </div>
                    </div>
                </Link>
            </li>
        );
    }

}

export {UpcomingAlarm};
