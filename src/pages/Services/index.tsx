import React, { useCallback, useContext } from 'react';
import { Button, Tag, Typography } from 'antd';
import { ToolbarWrapper } from '../Clients/styles';
import { EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import TableWithApi, { DefaultActions } from '../../components/TableWithApi';
import { getServicesApi } from '../../utils/api';
import { delay } from '../../utils/helpers';
import { StoreContext } from '../../store/context';
import { Service } from '../../store/Services';
import { ColumnsType } from 'antd/es/table';
import ServiceModal from './ServiceModal';

const columns: ColumnsType<Service> = [
	{
		title: 'Название',
		dataIndex: 'name',
		key: 'name',
		sorter: (a, b) => a.name.localeCompare(b.name),
		render: (_, { color, id, name }) =>
			<Tag color={ color } key={ id }>
				{ name }
			</Tag>
	},
	{
		title: 'Стоимость',
		dataIndex: 'price',
		key: 'price',
		sorter: (a, b) => a.price - b.price,
		render: (_, { price }) => `${ new Intl.NumberFormat('ru-RU').format(price) } рублей`
	},
	{
		title: 'Продолжительность',
		dataIndex: 'duration',
		key: 'duration',
		sorter: (a, b) => a.duration - b.duration,
		render: (_, { duration }) => `${ duration } минут`
	}
];

const Services: React.FC = () => {
	const { modalsStore } = useContext(StoreContext);

	const onOpenDetailsBtn = useCallback((data: Service = null) => {
		modalsStore.show(<ServiceModal data={ data } />);
	}, [modalsStore]);

	const actionsTransform = useCallback(({ deleteButton }: DefaultActions, record: any): JSX.Element => (
		<>
			<Button
				shape="circle"
				icon={ <EditOutlined /> }
				onClick={ () => onOpenDetailsBtn(record) }
			/>
			{ deleteButton }
		</>
	), [onOpenDetailsBtn]);

	return (
		<>
			<Typography.Title>Услуги</Typography.Title>
			<ToolbarWrapper>
				<Button
					type="primary"
					icon={ <PlusSquareOutlined /> }
					onClick={ () => onOpenDetailsBtn() }
				>
					Добавить услугу
				</Button>
			</ToolbarWrapper>
			<TableWithApi
				columns={ columns }
				actionsTransform={ actionsTransform }
				fetchOptions={ {
					fetch: getServicesApi,
					remove: () => delay()
				} }
			/>
		</>
	);
};

export default Services;