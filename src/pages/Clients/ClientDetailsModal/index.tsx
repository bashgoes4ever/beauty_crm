import React, { useCallback, useContext } from 'react';
import ClientForm from '../ClientForm';
import { Modal } from 'antd';
import { StoreContext } from '../../../store/context';
import { observer } from 'mobx-react-lite';
import { TabContent, TabsWrapper } from './styles';
import AppointmentsTable from './AppointmentsTable';
import Statistics from './Statistics';

type Props = {
	onClose?: () => void;
}

const ClientDetailsModal: React.FC<Props> = ({ onClose }) => {
	const { clientStore } = useContext(StoreContext);

	const onModalClose = useCallback(() => {
		clientStore.clearData();
		onClose();
	}, [clientStore, onClose]);

	return (
		<Modal
			title={ clientStore.data.name }
			onCancel={ onModalClose }
			width={ 870 }
			footer={ false }
			bodyStyle={ { padding: 0 } }
			visible
		>
			<TabsWrapper tabPosition="left">
				<TabContent tab="Данные клиента" key="1">
					<ClientForm columnsCount={ 2 } shouldShowSaveButton />
				</TabContent>
				<TabContent tab="История посещений" key="2">
					<AppointmentsTable />
				</TabContent>
				<TabContent tab="Статистика" key="3">
					<Statistics />
				</TabContent>
			</TabsWrapper>
		</Modal>
	);
};

export default observer(ClientDetailsModal);