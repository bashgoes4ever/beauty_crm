import React from 'react';
import TableWithApi from '../../../../components/TableWithApi';
import { getAppointmentsApi, getAppointmentStatusesApi } from '../../../../utils/api';
import { delay } from '../../../../utils/helpers';
import { ColumnsType } from 'antd/es/table';
import { Moment } from 'moment';
import { AppointmentData } from '../../../../store/AppointmentModal';

const renderDate = (date: Moment) => date && date.format('DD MMMM YYYY HH:mm');

const columns: ColumnsType<AppointmentData> = [
	{
		title: 'Статус',
		dataIndex: 'status',
		key: 'status',
		sorter: (a, b) => a.status.priority - b.status.priority
	},
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
	}
];

const AppointmentsTable: React.FC = () => {
	return (
		<TableWithApi
			columns={ columns }
			fetchOptions={ {
				fetch: getAppointmentsApi,
				remove: () => delay(),
				filters: [
					{
						key: 'status',
						map: ['title', 'id'],
						fetch: getAppointmentStatusesApi
					}
				]
			} }

		/>
	);
};

export default AppointmentsTable;