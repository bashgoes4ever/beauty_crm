import React, { useCallback, useContext } from 'react';
import { Button, Tag, Typography } from 'antd';
import { ToolbarWrapper } from '../Clients/styles';
import { EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import TableWithApi, { DefaultActions } from '../../components/TableWithApi';
import { getClientCategoriesApi } from '../../utils/api';
import { delay } from '../../utils/helpers';
import { ColumnsType } from 'antd/es/table';
import { ClientCategory } from '../../store/Client';
import { StoreContext } from '../../store/context';
import CategoryModal from './CategoryModal';

const columns: ColumnsType<ClientCategory> = [
	{
		title: 'Категория',
		dataIndex: 'title',
		key: 'title',
		sorter: (a, b) => a.title.localeCompare(b.title),
		render: (_, { title, color, id }) =>
			<Tag color={ color } key={ id }>
				{ title }
			</Tag>
	}
];

const ClientCategories: React.FC = () => {
	const { modalsStore } = useContext(StoreContext);

	const onOpenDetailsBtn = useCallback((data: ClientCategory = null) => {
		modalsStore.show(<CategoryModal data={ data } />);
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
			<Typography.Title>Категории клиентов</Typography.Title>
			<ToolbarWrapper>
				<Button
					type="primary"
					icon={ <PlusSquareOutlined /> }
					onClick={ () => onOpenDetailsBtn() }
				>
					Добавить категорию
				</Button>
			</ToolbarWrapper>
			<TableWithApi
				columns={ columns }
				actionsTransform={ actionsTransform }
				fetchOptions={ {
					fetch: getClientCategoriesApi,
					remove: () => delay()
				} }
			/>
		</>
	);
};

export default ClientCategories;