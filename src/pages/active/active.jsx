import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ActiveAlarm } from '../../components/ActiveAlarm/ActiveAlarm';
import { ActiveSection } from '../../components/ActiveSection/ActiveSection';
import { UpcomingAlarms } from '../../components/UpcomingAlarms/UpcomingAlarms';

import style from './active.scss';

class ActiveAlarms extends React.PureComponent {
	static propTypes = {
		activeAlarms: PropTypes.arrayOf(PropTypes.object).isRequired,
		onStop: PropTypes.func.isRequired
	};

	render() {
		const { activeAlarms, onStop } = this.props;

		return (
		<>
			{activeAlarms.map((alarm) => (
				<ActiveAlarm key={`${alarm.alarmID}`} alarm={alarm} onStop={onStop} />
			))}
		</>
		);
	}
}

class Active_ extends React.Component {

	static propTypes = {
		alarms: PropTypes.arrayOf(PropTypes.object).isRequired,
		display: PropTypes.bool.isRequired,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired
		})
	};   

	state = {
		activeAlarms:[
		]
	};


	onAlarmStopped = (alarm) => {
		const { activeAlarms } = this.state;
		this.setState({
			activeAlarms: activeAlarms.filter( 
				(active)=> active.alarmID !== alarm.alarmID 
			)
		});
	};

	onAlarmActivated = (alarm) => {
		const { activeAlarms } = this.state;
		const { history } = this.props;
		this.setState({
			activeAlarms: [...activeAlarms, alarm]
		});
		history.push('/Active');
	}

	render() {
		const { alarms, display } = this.props;
		const { activeAlarms } = this.state;

		return (
			<main className={classNames({
				[style.mainView]: display,
				[style.hidden]: !display
			})} >

				<ActiveSection id="active-alarms" title="Active Alarms">
					<ActiveAlarms
						activeAlarms={activeAlarms}
						onStop={this.onAlarmStopped}
					/>
				</ActiveSection>

				<ActiveSection id="next-alarms" title="Alarms Up Next">
					<UpcomingAlarms
						showing={display}
						alarms={alarms}
						onAlarmActivated={this.onAlarmActivated}
					/>
				</ActiveSection>

			</main>
		);
	}
}

// Map store.state to Active.props
function mapState({ alarms }) {
	return { alarms };
}

export const Active = connect(
	mapState
)(Active_);
