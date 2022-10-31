import React, { useCallback, useContext, useMemo } from 'react';
import { Body, BodyCell, CellText, Header, HeaderCell, HeaderCellDate, Wrapper } from './styles';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import { StoreContext } from '../../../store/context';
import { startWithZero } from '../../../utils/helpers';
import { observer } from 'mobx-react-lite';
import { scheduleHelper, VIEWS } from '../../../store/ScheduleHelper';

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

type Day = {
	date: string;
	momentDate: Moment;
	isCurrentMonth: boolean;
	isCurrentDay: boolean;
}

const getStartDate = (date: Moment): Moment => {
	// is monday
	if (date.day() === 1) {
		return date;
	}

	// is sunday
	if (date.day() === 0) {
		return date.add(-6, 'days');
	}

	// other days
	return date.add(-(date.day() - 1), 'days');
};

const getEndDate = (date: Moment): Moment => {
	// is monday
	if (date.day() === 1) {
		return date.add(6, 'days');
	}

	// is sunday
	if (date.day() === 0) {
		return date;
	}

	// other days
	return date.add(7 - date.day(), 'days');
};

const MonthView: React.FC = () => {
	const { scheduleHelper: { currentDate }, appointmentsStore: { appointments } } = useContext(StoreContext);

	const appointmentsByDate = useMemo(() => _.groupBy(appointments,
			(appointment) => `${ appointment.startDateTime.date() }:${ appointment.startDateTime.month() }`),
		[appointments]);

	const dates: Day[] = useMemo(() => {
		const today = moment();
		const currentMonthStart = moment(currentDate).startOf('month');
		const currentMonthEnd = moment(currentDate).endOf('month');

		// check if month start/end is not monday (1) / sunday (0) then add days from sibling months
		const start = getStartDate(currentMonthStart);
		const end = getEndDate(currentMonthEnd);

		let res: Day[] = [];
		while (start.diff(end) < 0) {
			res.push({
				date: startWithZero(start.date()),
				isCurrentDay: start.isSame(today, 'day'),
				isCurrentMonth: start.isSame(moment(currentDate), 'month'),
				momentDate: moment(start)
			});
			start.add(1, 'day');
		}
		return res;
	}, [currentDate]);

	const onCellClick = useCallback((date: Moment) => {
		scheduleHelper.currentDate = date;
		scheduleHelper.currentView = VIEWS.day.key;
	}, []);

	const getCellText = useCallback((date: Moment) => {
		const appointments = appointmentsByDate[`${ date.date() }:${ date.month() }`];

		if (!appointments) {
			return null;
		}

		const size = _.size(appointments);
		const value = Math.abs(size) % 100;
		const num = size % 10;

		if (value > 10 && value < 20) return `${ size } записей`;
		if (num > 1 && num < 5) return `${ size } записи`;
		if (num === 1) return `${ size } запись`;
		return `${ size } записей`;

	}, [appointmentsByDate]);

	const cells = useMemo(() => _.map(dates, ({ date, isCurrentDay, isCurrentMonth, momentDate }, i) => (
		<BodyCell
			key={ i }
			isCurrentMonth={ isCurrentMonth }
			isCurrentDay={ isCurrentDay }
			onClick={ () => onCellClick(momentDate) }
		>
			<HeaderCellDate level={ 5 }>{ date }</HeaderCellDate>
			<CellText>{ getCellText(momentDate) }</CellText>
		</BodyCell>
	)), [dates, getCellText, onCellClick]);

	return (
		<Wrapper>
			<Header>
				{
					_.map(days, (day, i) => (
						<HeaderCell key={ i }>
							<HeaderCellDate level={ 4 }>{ day }</HeaderCellDate>
						</HeaderCell>
					))
				}
			</Header>
			<Body>
				{ cells }
			</Body>
		</Wrapper>
	);
};

export default observer(MonthView);