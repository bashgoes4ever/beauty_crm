import React, { useCallback, useContext } from 'react';
import ClientForm from '../ClientForm';
import { Modal } from 'antd';
import { StoreContext } from '../../../store/context';
import { observer } from 'mobx-react-lite';

type Props = {
	onClose?: () => void;
}

const CreateClientModal: React.FC<Props> = ({ onClose }) => {
	const { clientStore } = useContext(StoreContext);

	const onModalClose = useCallback(() => {
		clientStore.clearData();
		onClose();
	}, [clientStore, onClose]);

	const onSave = useCallback(() => {
		onModalClose();
	}, [onModalClose]);

	return (
		<Modal
			title="Добавить клиента"
			cancelText="Отмена"
			okText="Добавить"
			okButtonProps={ { disabled: !clientStore.isValid } }
			onCancel={ onModalClose }
			onOk={ onSave }
			width={ 400 }
			visible
		>
			<ClientForm />
		</Modal>
	);
};

export default observer(CreateClientModal);