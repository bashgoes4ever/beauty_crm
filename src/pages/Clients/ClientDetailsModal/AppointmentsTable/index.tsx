import React, { useCallback, useContext } from 'react';
import TableWithApi, { DefaultActions } from '../../../../components/TableWithApi';
import { getAppointmentsApi, getAppointmentStatusesApi, getServicesApi } from '../../../../utils/api';
import { delay } from '../../../../utils/helpers';
import { ColumnsType } from 'antd/es/table';
import { Moment } from 'moment';
import { AppointmentData, AppointmentService, Steps } from '../../../../store/AppointmentModal';
import _ from 'lodash';
import { Button, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { StoreContext } from '../../../../store/context';
import AppointmentModal from '../../../../components/Schedule/AppointmentModal';

const renderDate = (date: Moment) => date && date.format('DD.MM.YY HH:mm');

const renderServices = (categories: AppointmentData['services']) => (
	_.map(categories, ({ service: { name, id, color } }: AppointmentService) => (
		<Tag color={ color } key={ id }>
			{ name }
		</Tag>
	))
);

const columns: ColumnsType<AppointmentData> = [
	{
		title: 'Дата и время',
		dataIndex: 'startDateTime',
		key: 'startDateTime',
		render: (_, { startDateTime }) => renderDate(startDateTime),
		sorter: (a, b, sortOrder) => {
			const aValue = a.startDateTime?.valueOf() || (sortOrder === 'ascend' ? Infinity : -Infinity);
			const bValue = b.startDateTime?.valueOf() || (sortOrder === 'ascend' ? Infinity : -Infinity);

			return aValue - bValue;
		}
	},
	{
		title: 'Услуги',
		dataIndex: 'services',
		key: 'services',
		render: (_, { services }) => renderServices(services),
		onFilter: (value, { services }) => _.some(services, (service) => service.service.id === value)
	},
	{
		title: 'Статус',
		dataIndex: 'status',
		key: 'status',
		render: (_, { status: { title } }) => title,
		sorter: (a, b) => a.status.priority - b.status.priority,
		onFilter: (value, { status: { id } }) => value === id
	}
];

const AppointmentsTable: React.FC = () => {
	const { appointmentCreationStore, modalsStore } = useContext(StoreContext);

	const onAppointmentEditClick = useCallback((record: AppointmentData) => {
		appointmentCreationStore.currentStep = Steps.CONFIRMATION;
		appointmentCreationStore.isNewClient = false;
		appointmentCreationStore.appointment = record;
		modalsStore.show(<AppointmentModal mode="edit" />);
	}, [appointmentCreationStore, modalsStore]);

	const actionsTransform = useCallback(({ deleteButton }: DefaultActions, record: any): JSX.Element => (
		<>
			<Button
				shape="circle"
				icon={ <EditOutlined /> }
				onClick={ () => onAppointmentEditClick(record as AppointmentData) }
			/>
			{ deleteButton }
		</>
	), [onAppointmentEditClick]);

	return (
		<TableWithApi
			columns={ columns }
			actionsTransform={ actionsTransform }
			fetchOptions={ {
				fetch: getAppointmentsApi,
				remove: () => delay(),
				filters: [
					{
						key: 'status',
						map: ['title', 'id'],
						fetch: getAppointmentStatusesApi
					},
					{
						key: 'services',
						map: ['name', 'id'],
						fetch: getServicesApi
					}
				]
			} }

		/>
	);
};

export default AppointmentsTable;