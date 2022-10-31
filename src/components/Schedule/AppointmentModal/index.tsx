import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Button, Modal } from 'antd';
import ProgressBar from '../../ProgressBar';
import _ from 'lodash';
import { StoreContext } from '../../../store/context';
import { observer } from 'mobx-react-lite';
import { FooterWrapper, MainBtnsWrapper } from './styles';

type Props = {
	mode?: 'add' | 'edit';

	onClose?: () => void;
}

const AppointmentModal: React.FC<Props> = ({ onClose, mode = 'add' }) => {
	const { appointmentCreationStore, appointmentsStore } = useContext(StoreContext);
	const { confirm } = Modal;

	useEffect(() => {
		return () => appointmentCreationStore.clearData();
	}, [appointmentCreationStore]);

	const Component = appointmentCreationStore.currentComponent;
	const { okText, cancelText } = appointmentCreationStore.buttonsText;

	const onOk = useCallback((): void => {
		appointmentCreationStore.navigate('forward', () => {
			//api request to create or update an appointment
			if (!appointmentCreationStore.appointment.id) {
				appointmentCreationStore.appointment.id = +new Date();
			}

			appointmentsStore.addAppointment(appointmentCreationStore.appointment);
			onClose();
		});
	}, [appointmentCreationStore, appointmentsStore, onClose]);

	const onCancel = useCallback((): void => {
		appointmentCreationStore.navigate('backward', onClose);
	}, [appointmentCreationStore, onClose]);

	const cancelButtonProps = useMemo(() => ({
		onClick: () => {
			onCancel();
		}
	}), [onCancel]);

	const okButtonProps = useMemo(() => ({
		disabled: !appointmentCreationStore.isStepValid
	}), [appointmentCreationStore.isStepValid]);

	const showDeleteConfirm = useCallback(() => {
		confirm({
			title: 'Вы уверены, что хотите удалить эту запись?',
			okText: 'Да',
			okType: 'danger',
			cancelText: 'Отмена',
			onOk() {
				appointmentsStore.deleteAppointment(appointmentCreationStore.appointment.id);
				onClose();
			}
		});
	}, [appointmentCreationStore.appointment.id, appointmentsStore, confirm, onClose]);

	const footer = useMemo(() => [
		<FooterWrapper key={ 1 }>
			<div>
				{
					mode === 'edit' && <Button key="delete" danger onClick={ showDeleteConfirm }>
						Удалить запись
					</Button>
				}
			</div>
			<MainBtnsWrapper>
				<Button key="back" onClick={ onCancel } { ...cancelButtonProps }>
					{ cancelText }
				</Button>
				<Button key="submit" type="primary" onClick={ onOk } { ...okButtonProps }>
					{ okText }
				</Button>
			</MainBtnsWrapper>
		</FooterWrapper>
	], [cancelButtonProps, cancelText, mode, okButtonProps, okText, onCancel, onOk, showDeleteConfirm]);

	const title = mode === 'add' ? 'Добавить запись' : 'Редактировать запись';

	return (
		<Modal
			title={ title }
			maskClosable={ false }
			onCancel={ onClose }
			footer={ footer }
			width={ 500 }
			visible
		>
			<ProgressBar
				stepsCount={ _.size(appointmentCreationStore.stepsData) }
				currentStep={ appointmentCreationStore.currentStep }
			/>

			<Component />
		</Modal>
	);
};

export default observer(AppointmentModal);