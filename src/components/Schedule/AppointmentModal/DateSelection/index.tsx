import React, { useCallback, useContext, useMemo } from 'react';
import { DatePicker, Form, InputNumber, TimePicker, Typography } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { StoreContext } from '../../../../store/context';
import { observer } from 'mobx-react-lite';
import _ from 'lodash';
import { getNumberFromTimeString } from '../../../../utils/helpers';
import moment from 'moment';

const format = 'HH:mm';

const DateSelection: React.FC = () => {
	const {
		scheduleHelper: { currentDate, currentView },
		user: { data: { userData: { workingHours } } },
		appointmentCreationStore
	} = useContext(
		StoreContext);
	const [form] = Form.useForm();

	const disabledHours = useCallback(() => ([
		..._.range(0, Math.floor(getNumberFromTimeString(workingHours.from))),
		..._.range(Math.floor(getNumberFromTimeString(workingHours.to)) + 1, 24)
	]), [workingHours.from, workingHours.to]);

	const disabledMinutes = useCallback((selectedHour: number) => {
		if (selectedHour === Math.floor(getNumberFromTimeString(workingHours.from))) {
			return _.range(0, (getNumberFromTimeString(workingHours.from) % 1) * 60);
		}

		if (selectedHour === Math.floor(getNumberFromTimeString(workingHours.to))) {
			return _.range((getNumberFromTimeString(workingHours.to) % 1) * 60, 59);
		}

		return [];
	}, [workingHours.from, workingHours.to]);

	const initialValues = useMemo(() => ({
		date: appointmentCreationStore.appointment.startDateTime || (currentView === 'day' && currentDate),
		time: appointmentCreationStore.appointment.startDateTime,
		duration: appointmentCreationStore.appointment.duration
	}), [
		appointmentCreationStore.appointment.duration,
		appointmentCreationStore.appointment.startDateTime,
		currentDate,
		currentView]);

	const onValuesChange = useCallback(() => {
		const { date, time, duration } = form.getFieldsValue();
		if (date && time) {
			appointmentCreationStore.appointment.startDateTime = moment(date)
				.set({ hour: time.hour(), minute: time.minute() });
		} else {
			appointmentCreationStore.appointment.startDateTime = null;
		}

		appointmentCreationStore.appointment.duration = duration;
	}, [appointmentCreationStore.appointment, form]);

	return (
		<>
			<Typography.Title level={ 4 }>Дата и время</Typography.Title>

			<Form
				name="client_creation"
				layout="vertical"
				autoComplete="off"
				form={ form }
				initialValues={ initialValues }
				onValuesChange={ onValuesChange }
			>
				<Form.Item
					label="Дата"
					name="date"
					rules={ [{ required: true, message: 'Выберите дату' }] }
				>
					<DatePicker
						locale={ locale }
						style={ { width: '100%' } }
					/>
				</Form.Item>
				<Form.Item
					name="time"
					label="Время"
					rules={ [{ required: true, message: 'Выберите время' }] }
				>
					<TimePicker
						locale={ locale }
						style={ { width: '100%' } }
						format={ format }
						minuteStep={ 5 }
						disabledTime={ () => ({ disabledHours, disabledMinutes }) }
					/>
				</Form.Item>
				<Form.Item
					name="duration"
					label="Продолжительность, минут"
					rules={ [{ required: true, message: 'Введите продолжительность' }] }
				>
					<InputNumber
						style={ { width: '100%' } }
					/>
				</Form.Item>
			</Form>
		</>
	);
};

export default observer(DateSelection);