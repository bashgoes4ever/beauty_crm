import React, { RefObject, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Appointment as AppointmentWrapper, Card, Text, Title, Wrapper } from './styles';
import moment from 'moment';
import { Day } from '../CommonGrid';
import _ from 'lodash';
import { getNumberFromTimeString } from '../../../utils/helpers';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../../store/context';
import { AppointmentData, AppointmentService, Steps } from '../../../store/AppointmentModal';
import AppointmentModal from '../AppointmentModal';
import { Popover, Space, Tag } from 'antd';
import { AppointmentDataWithOffset } from '../../../store/Appointments';

type Props = {
	days: Day[];

	daysRef: RefObject<HTMLDivElement>;

	hoursRef: RefObject<HTMLDivElement>;

	timeFrom: string;

	timeTo: string;
}

const popoverContent = (time: string, services: AppointmentService[], price: number) => (
	<>
		<Space align="start" direction="vertical" size="small">
			<div>{ time }</div>
			<div>
				{ _.map(services, ({ service: { name, color, id } }) => (
					<Tag color={ color } key={ id }>
						{ name }
					</Tag>
				)) }
			</div>
			<div><b>{ price } руб.</b></div>
		</Space>
	</>
);

const Appointments: React.FC<Props> = ({ days, timeTo, timeFrom, hoursRef, daysRef }) => {
	const {
		scheduleHelper: { scale, currentView },
		appointmentsStore,
		appointmentCreationStore,
		modalsStore
	} = useContext(
		StoreContext);
	const [appointmentElements, setAppointmentElements] = useState<React.ReactNode[]>([]);

	const { workdayMinutesFrom, workdayMinutesTo } = useMemo(() => {
		return {
			workdayMinutesFrom: getNumberFromTimeString(timeFrom) * 60,
			workdayMinutesTo: getNumberFromTimeString(timeTo) * 60
		};
	}, [timeFrom, timeTo]);

	const onClick = useCallback((appointment: AppointmentData) => {
		appointmentCreationStore.appointment = _.cloneDeep(appointment);
		appointmentCreationStore.currentStep = Steps.CONFIRMATION;
		appointmentCreationStore.isNewClient = false;
		modalsStore.show(<AppointmentModal mode="edit" />);
	}, [appointmentCreationStore, modalsStore]);

	const scheduleAppointments = useCallback((): React.ReactNode[] => {
		appointmentsStore.setAppointmentsOffsets();
		return _.map(appointmentsStore.appointments,
			(appointment: AppointmentDataWithOffset) => {
				const { startDateTime, duration, id, client: { name }, services, column, columnsCount } = appointment;

				if (!_.some(days, ({ momentDate }) => moment(momentDate).isSame(startDateTime, 'day'))) {
					return null;
				}

				const minutesStart = moment(startDateTime).hours() * 60 + moment(startDateTime).minutes();
				const cellHeight = hoursRef.current.offsetHeight / hoursRef.current.childElementCount;
				const minuteInPixel = (hoursRef.current.offsetHeight - cellHeight) /
					(workdayMinutesTo - workdayMinutesFrom);

				const top = (minutesStart - workdayMinutesFrom) * minuteInPixel;
				const height = duration * minuteInPixel;
				const dayWidth = (daysRef.current.offsetWidth / daysRef.current.childElementCount);
				const width = (daysRef.current.offsetWidth / daysRef.current.childElementCount) / columnsCount;
				const left =
					(_.findIndex(days, ({ momentDate }) => moment(momentDate).isSame(startDateTime, 'day')) *
						dayWidth) + width * (column - 1);

				const timeString = `${ moment(startDateTime).format('HH:mm') } - ${ moment(startDateTime)
					.add(duration, 'minutes')
					.format('HH:mm') }`;

				return (
					<AppointmentWrapper
						key={ id }
						top={ top }
						left={ left }
						width={ width }
						height={ height }
						services={ services }
					>
						<Popover
							content={ popoverContent(
								timeString,
								appointment.services,
								appointmentsStore.getTotalPrice(appointment)
							) }
							title={ name }
						>
							<Card onClick={ () => onClick(appointment) }>
								<Title>{ name }</Title>
								<Text>{ timeString }</Text>
							</Card>
						</Popover>
					</AppointmentWrapper>
				);
			});
	}, [
		JSON.stringify(appointmentsStore.appointments),
		days,
		hoursRef,
		workdayMinutesTo,
		workdayMinutesFrom,
		daysRef,
		onClick,
		scale,
		currentView]);

	useEffect(() => {
		const ref = daysRef.current;
		const resizeObserver = new ResizeObserver(() => {
			setAppointmentElements(scheduleAppointments());
		});

		if (hoursRef.current && daysRef.current) {
			setAppointmentElements(scheduleAppointments());
			resizeObserver.observe(ref);
		}

		return () => {
			if (ref) {
				resizeObserver && resizeObserver.unobserve(ref);
			}
		};
	}, [daysRef, hoursRef, scheduleAppointments]);

	if (!_.size(appointmentElements)) {
		return null;
	}

	return (
		<Wrapper>
			{ appointmentElements }
		</Wrapper>
	);
};

export default observer(Appointments);