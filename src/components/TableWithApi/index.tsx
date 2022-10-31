import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Modal, Space, Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';
import _ from 'lodash';

type FilterOptions = {
	key: string;
	map: [string, string];
	fetch: () => Promise<unknown>;
}

type FetchOptions = {
	fetch: () => Promise<unknown>;

	remove: (id: number) => Promise<unknown>;

	filters?: FilterOptions[]
}

export type DefaultActions = {
	deleteButton: JSX.Element
}

type Props = TableProps<any> & {
	fetchOptions: FetchOptions;

	columns: ColumnsType<any>;

	pageSize?: number;

	actionsTransform?: (defaultActions: DefaultActions, record: any) => JSX.Element;
}

const actionsColumn = {
	title: 'Действия',
	key: 'action',
	width: '10%'
};

const TableWithApi: React.FC<Props> = (componentProps) => {
	const {
		fetchOptions: { fetch, remove, filters = [] },
		columns,
		pageSize = 20,
		actionsTransform,
		...props
	} = componentProps;

	const { confirm } = Modal;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<any[]>([]);

	const onDelete = useCallback((record: any) => {
		const deleteRow = () => {
			setData(_.filter(data, (dataItem) => dataItem.id !== record.id));
		};

		if (remove) {
			setIsLoading(true);
			remove(record.id).then(() => {
				deleteRow();
				setIsLoading(false);
			});
		} else {
			deleteRow();
		}
	}, [data, remove]);

	const showDeleteConfirm = useCallback((record: any) => {
		confirm({
			title: 'Удалить?',
			okText: 'Да',
			okType: 'danger',
			cancelText: 'Отмена',
			onOk: () => onDelete(record)
		});
	}, [confirm, onDelete]);

	const renderDeleteButton = useCallback((record: any) => (
		<Button shape="circle" danger icon={ <DeleteOutlined /> } onClick={ () => showDeleteConfirm(record) } />
	), [showDeleteConfirm]);

	const renderActions = useCallback((_: any, record: any) => (
		<Space size="middle">
			{ actionsTransform
				? actionsTransform({ deleteButton: renderDeleteButton(record) }, record)
				: renderDeleteButton(record) }
		</Space>
	), [actionsTransform, renderDeleteButton]);

	const columnsWithActions: ColumnsType<any> = useMemo(() => [
		...columns,
		{
			...actionsColumn,
			render: (_: any, record: any) => renderActions(_, record)
		}
	], [columns, renderActions]);

	useEffect(() => {
		setIsLoading(true);
		const requests = [];

		// load main data
		requests.push(
			fetch().then((res: unknown) => {
				setData(res as any[]);
			})
		);

		// load filters
		_.forEach(filters, ({ key, map, fetch: fetchFilter }: FilterOptions) => {
			requests.push(
				fetchFilter().then((res: any) => {
					const index = _.findIndex(columnsWithActions, (column) => column.key === key);

					if (index > -1) {
						columnsWithActions[index].filters = _.map(res, (f) => ({ text: f[map[0]], value: f[map[1]] }));
					}
				})
			);
		});

		Promise.all(requests).then(() => {
			setIsLoading(false);
		});
	}, []);

	return (
		<Table
			columns={ columnsWithActions }
			dataSource={ data }
			loading={ isLoading }
			pagination={ { pageSize } }
			rowKey="id"
			locale={ {
				triggerDesc: 'Отсортировать по убыванию',
				triggerAsc: 'Отсортировать по возрастанию',
				cancelSort: 'Отменить сортировку',
				filterReset: 'Отменить'
			} }
			{ ...props }
		/>
	);
};

export default TableWithApi;