import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import style from './ActiveAlarm.scss';
import { YouTubePlayer } from '../YouTubePlayer/YouTubePlayer';
import { timeToHumanReadable } from '../../scripts/timeParsing';

class ActiveAlarm extends React.Component {
    static propTypes = {
        alarm: PropTypes.object.isRequired,
        onStop: PropTypes.func.isRequired
    };

    state = {
        commentOpen: false,
        snoozeTil: 0,
        alarmLeft: ""
    };

    snoozeWait = 10 * (60 * 1000); // ten minutes
    interval = null;

    resetSnooze = () => {
        this.setState({
            ...this.state,
            snoozeTil: Date.now() + this.snoozeWait
        });
        // If already watching, exit
        if( this.interval ){ return; }
        // Watch alarm
        this.interval = window.setInterval(() => {
            const { snoozeTil } = this.state;
            if( snoozeTil < Date.now() ){
                window.clearInterval( this.interval );
                this.interval = null;
            }
            this.forceUpdate();
        }, 1000 );
    };

    onStopHandle = (e) => {
        const { onStop, alarm } = this.props;
        onStop(alarm);
    };

    onNoteHandle = (e) => {
        const { commentOpen } = this.state;
        this.setState({
            ...this.state,
            commentOpen: !commentOpen
        });
    }

    componentWillUnmount = () => {
        window.clearInterval(this.interval);
        this.interval = null;
    }

    render() {
        const { alarm:{ name, url, alarmID, comment} } = this.props;
        const { commentOpen, snoozeTil } = this.state;
        const now = Date.now();
        const snoozing = snoozeTil > now;
        const alarmLeft = timeToHumanReadable(snoozeTil - now);

        return (
            <li className={style.container}>
                <div className={style.header}>
                    <h3>{name}</h3>
                </div>
                <div className={style.video}>
                    <YouTubePlayer
                        id={`alarm-player-${name}-${alarmID}`}
                        key={`${alarmID}`}
                        videoPoint={url}
                        playing={!snoozing}
                        fullControl
                    />                   
                </div>
                <div className={style.footer}>
                    <button className={style.note} type="button" onClick={this.onNoteHandle}>note</button>
                    <button className={style.stop} type="button" onClick={this.onStopHandle}>stop</button>
                    <button className={style.snooze} type="button" onClick={this.resetSnooze} >
                        { !snoozing? "snooze" : alarmLeft }
                    </button>
                </div>
                {commentOpen &&  <div className={style.comment}>{comment} </div> }
            </li>
        );
    }
}

export {ActiveAlarm};
