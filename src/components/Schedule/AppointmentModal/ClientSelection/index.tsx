import React, { useCallback, useContext } from 'react';
import { Typography } from 'antd';
import { RadioButton, RadioGroup } from './styles';
import { observer } from 'mobx-react-lite';
import AddNew from './AddNew';
import SelectExisting from './SelectExisting';
import { StoreContext } from '../../../../store/context';

const ClientSelection: React.FC = () => {
	const { appointmentCreationStore } = useContext(StoreContext);

	const onRadioChange = useCallback(() => {
		appointmentCreationStore.isNewClient = !appointmentCreationStore.isNewClient;
		appointmentCreationStore.clearClientData();
	}, [appointmentCreationStore]);

	return (
		<>
			<Typography.Title level={ 4 }>Клиент</Typography.Title>
			<RadioGroup defaultValue={ appointmentCreationStore.isNewClient } buttonStyle="solid"
				onChange={ onRadioChange }>
				<RadioButton value={ true }>Добавить нового</RadioButton>
				<RadioButton value={ false }>Выбрать существующего</RadioButton>
			</RadioGroup>

			{
				appointmentCreationStore.isNewClient ? <AddNew /> : <SelectExisting />
			}
		</>
	);
};

export default observer(ClientSelection);