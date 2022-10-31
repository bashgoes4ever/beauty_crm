import _ from 'lodash';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import moment, { Moment } from 'moment';
import {
	Body,
	Header,
	HeaderCell,
	HeaderCellDate,
	HeaderCellWeekDay,
	HeaderDates,
	HeaderEmptyCell,
	HourCell,
	HourCellText,
	Hours,
	MainCell,
	MainLayout,
	MainRow,
	Wrapper
} from './styles';
import { StoreContext } from '../../../store/context';
import { getWorkingHours, startWithZero } from '../../../utils/helpers';
import TimeLine from '../TimeLine';
import { observer } from 'mobx-react-lite';
import Appointments from '../Appointments';
import AppointmentModal from '../AppointmentModal';

export type GridType = 'week' | 'day'

export type Day = {
	date: string;
	dayOfWeek: string;
	isCurrent: boolean;
	momentDate: Moment;
}

type Props = {
	type: GridType

	onHeaderCellClick?: (date: Moment) => void;
}

const CommonGrid: React.FC<Props> = ({ type, onHeaderCellClick }) => {
	const {
		user: { data: { userData: { workingHours: { from, to } } } },
		scheduleHelper: { currentDate, scale },
		appointmentCreationStore,
		modalsStore
	} = useContext(
		StoreContext);
	const hoursRef = useRef<HTMLDivElement>(null);
	const daysRef = useRef<HTMLDivElement>(null);

	const onGridCellClick = useCallback((date: Moment) => {
		appointmentCreationStore.appointment.startDateTime = date;
		modalsStore.show(<AppointmentModal />);
	}, [appointmentCreationStore.appointment, modalsStore]);

	const { workingHours, timeTo } = useMemo(() => getWorkingHours(from, to, scale), [from, scale, to]);
	const days = type === 'week' ? 7 : 1;

	const dates: Day[] = useMemo(() => {
		const today = moment();

		if (type === 'day') {
			return [
				{
					date: startWithZero(currentDate.date()),
					dayOfWeek: _.capitalize(currentDate.format('dddd')),
					isCurrent: currentDate.isSame(today, 'day'),
					momentDate: currentDate
				}
			];
		}

		const start = moment(currentDate).startOf('week');
		const end = moment(currentDate).endOf('week');

		let res: Day[] = [];

		while (start.diff(end) < 0) {
			res.push({
				date: startWithZero(start.date()),
				dayOfWeek: _.capitalize(start.format('dddd')),
				isCurrent: start.isSame(today, 'day'),
				momentDate: moment(start)
			});
			start.add(1, 'day');
		}

		return res;
	}, [currentDate, type]);

	const onHeaderCellClickAction = useCallback((date: Moment): void => {
		onHeaderCellClick && onHeaderCellClick(date);
	}, [onHeaderCellClick]);

	const headerDates = useMemo(() => _.map(dates, ({ date, dayOfWeek, isCurrent, momentDate }) => (
		<HeaderCell key={ date } onClick={ () => onHeaderCellClickAction(momentDate) }>
			<HeaderCellWeekDay isCurrent={ isCurrent }>{ dayOfWeek }</HeaderCellWeekDay>
			<HeaderCellDate level={ 3 } isCurrent={ isCurrent }>{ date }</HeaderCellDate>
		</HeaderCell>
	)), [dates, onHeaderCellClickAction]);

	const hours = useMemo(() => _.map(workingHours, (time) => (
		<HourCell key={ time }>
			<HourCellText>{ time }</HourCellText>
		</HourCell>
	)), [workingHours]);

	const cells = useMemo(() => _.map(workingHours, (time) => (
		<MainRow type={ type } key={ time }>
			{
				_.map(_.range(0, days), (day) => {
					const [hour, minute] = time.split(':');
					const date = moment(dates[day].momentDate)
						.set({ hour: _.toNumber(hour), minute: _.toNumber(minute) });
					return (
						<MainCell key={ day } onClick={ () => onGridCellClick(date) } />
					);
				})
			}
		</MainRow>
	)), [dates, days, onGridCellClick, type, workingHours]);

	return (
		<Wrapper>
			<Header>
				<HeaderEmptyCell />
				<HeaderDates type={ type } ref={ daysRef }>
					{ headerDates }
				</HeaderDates>
			</Header>

			<Appointments
				days={ dates }
				hoursRef={ hoursRef }
				daysRef={ daysRef }
				timeFrom={ from }
				timeTo={ timeTo }
			/>

			<Body>
				<Hours ref={ hoursRef }>
					{ hours }
				</Hours>

				<MainLayout>
					{ cells }
				</MainLayout>

				<TimeLine hoursRef={ hoursRef } timeFrom={ from } timeTo={ timeTo } />
			</Body>
		</Wrapper>
	);
};

export default observer(CommonGrid);