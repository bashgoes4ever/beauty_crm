import React, { useCallback, useContext } from 'react';
import { Button, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import TableWithApi, { DefaultActions } from '../../components/TableWithApi';
import { getClientCategoriesApi, getClientsApi } from '../../utils/api';
import { Client, ClientCategory } from '../../store/Client';
import _ from 'lodash';
import { Moment } from 'moment';
import { CalendarOutlined, FullscreenOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { StoreContext } from '../../store/context';
import AppointmentModal from '../../components/Schedule/AppointmentModal';
import { delay } from '../../utils/helpers';
import { Steps } from '../../store/AppointmentModal';
import { ToolbarWrapper } from './styles';
import CreateClientModal from './CreateClientModal';
import { observer } from 'mobx-react-lite';
import ClientDetailsModal from './ClientDetailsModal';

const renderCategories = (categories: ClientCategory[]) => (
	_.map(categories, ({ id, title, color }: ClientCategory) => (
		<Tag color={ color } key={ id }>
			{ title }
		</Tag>
	))
);

const columns: ColumnsType<Client> = [
	{
		title: 'Имя',
		dataIndex: 'name',
		key: 'name',
		sorter: (a, b) => a.name.localeCompare(b.name)
	},
	{
		title: 'Телефон',
		dataIndex: 'phone',
		key: 'phone'
	},
	{
		title: 'Последний визит',
		dataIndex: 'lastVisit',
		key: 'lastVisit',
		render: (_, { lastVisit }) => renderLastVisit(lastVisit),
		sorter: (a, b, sortOrder) => {
			const aValue = a.lastVisit?.valueOf() || (sortOrder === 'ascend' ? Infinity : -Infinity);
			const bValue = b.lastVisit?.valueOf() || (sortOrder === 'ascend' ? Infinity : -Infinity);

			return aValue - bValue;
		}
	},
	{
		title: 'Категории',
		dataIndex: 'categories',
		key: 'categories',
		render: (_, { categories }) => renderCategories(categories),
		onFilter: (value, { categories }) => _.some(categories, (category) => category.id === value)
	}
];

const renderLastVisit = (date: Moment) => date && date.format('DD MMMM YYYY');

const Clients: React.FC = () => {
	const { appointmentCreationStore, modalsStore, clientStore } = useContext(StoreContext);

	const onCreateAppointment = useCallback((client: Client): void => {
		appointmentCreationStore.appointment.client = client;
		appointmentCreationStore.isNewClient = false;
		appointmentCreationStore.currentStep = Steps.SERVICE_SELECTION;
		modalsStore.show(<AppointmentModal />);
	}, [appointmentCreationStore, modalsStore]);

	const onOpenDetailsBtn = useCallback((client: Client) => {
		clientStore.setData(client);
		modalsStore.show(<ClientDetailsModal />);
	}, [clientStore, modalsStore]);

	const actionsTransform = useCallback(({ deleteButton }: DefaultActions, record: any): JSX.Element => (
		<>
			<Button
				type="primary"
				shape="round"
				icon={ <CalendarOutlined /> }
				onClick={ () => onCreateAppointment(record) }
			>
				Записать
			</Button>
			<Button
				shape="circle"
				icon={ <FullscreenOutlined /> }
				onClick={ () => onOpenDetailsBtn(record) }
			/>
			{ deleteButton }
		</>
	), [onCreateAppointment, onOpenDetailsBtn]);

	const onClientAddBtnClick = useCallback(() => {
		modalsStore.show(<CreateClientModal />);
	}, [modalsStore]);

	return (
		<>
			<Typography.Title>Клиенты</Typography.Title>
			<ToolbarWrapper>
				<Button
					type="primary"
					icon={ <PlusSquareOutlined /> }
					onClick={ onClientAddBtnClick }
				>
					Добавить клиента
				</Button>
			</ToolbarWrapper>
			<TableWithApi
				columns={ columns }
				actionsTransform={ actionsTransform }
				fetchOptions={ {
					fetch: getClientsApi,
					remove: () => delay(),
					filters: [
						{
							key: 'categories',
							map: ['title', 'id'],
							fetch: getClientCategoriesApi
						}
					]
				} }
			/>
		</>
	);
};

export default observer(Clients);