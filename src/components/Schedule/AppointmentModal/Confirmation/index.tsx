import React, { useCallback, useContext, useMemo } from 'react';
import { Table, Typography } from 'antd';
import { StoreContext } from '../../../../store/context';
import InfoBlock from './InfoBlock';
import _ from 'lodash';
import { Steps } from '../../../../store/AppointmentModal';
import moment from 'moment';

const serviceColumns = [
	{
		title: 'Наименование',
		dataIndex: 'name'
	},
	{
		title: 'Количество',
		dataIndex: 'quantity'
	},
	{
		title: 'Скидка',
		dataIndex: 'discount'
	},
	{
		title: 'Стоимость',
		dataIndex: 'totalPrice'
	}
];

const clientColumns = [
	{
		title: 'Имя',
		dataIndex: 'name'
	},
	{
		title: 'Телефон',
		dataIndex: 'phone'
	},
	{
		title: 'Почта',
		dataIndex: 'email'
	}
];

const dateColumns = [
	{
		title: 'Дата',
		dataIndex: 'date'
	},
	{
		title: 'Время',
		dataIndex: 'time'
	},
	{
		title: 'Длительность, минут',
		dataIndex: 'duration'
	}
];

const Confirmation: React.FC = () => {
	const { appointmentCreationStore } = useContext(StoreContext);
	const {
		appointment: { services, client: { name, phone, email, id: clientId }, startDateTime, duration },
		totalPrice
	} = appointmentCreationStore;

	const servicesData = useMemo(() => _.map(services, ({ quantity, discount, totalPrice, service: { name, id } }) => ({
		key: id,
		name,
		quantity,
		discount,
		totalPrice
	})), [services]);

	const servicesSummary = useCallback(() => (
		<Table.Summary fixed>
			<Table.Summary.Row>
				<Table.Summary.Cell index={ 0 }>Итого</Table.Summary.Cell>
				<Table.Summary.Cell index={ 1 } />
				<Table.Summary.Cell index={ 2 } />
				<Table.Summary.Cell index={ 3 }>{ totalPrice }</Table.Summary.Cell>
			</Table.Summary.Row>
		</Table.Summary>
	), [totalPrice]);

	return (
		<>
			<Typography.Title level={ 4 }>Проверьте данные</Typography.Title>
			<InfoBlock
				title="Клиент"
				step={ Steps.CLIENT_SELECTION }
				columns={ clientColumns }
				data={ [{ name, phone, email, key: clientId }] }
			/>
			<InfoBlock
				title="Услуги"
				step={ Steps.SERVICE_SELECTION }
				columns={ serviceColumns }
				data={ servicesData }
				summary={ servicesSummary }
			/>
			<InfoBlock
				title="Дата и время"
				step={ Steps.DATE_SELECTION }
				columns={ dateColumns }
				data={ [
					{
						key: 1,
						duration,
						date: moment(startDateTime).format('DD MMMM YYYY'),
						time: moment(startDateTime).format('HH:mm')
					}] }
			/>
		</>
	);
};

export default Confirmation;