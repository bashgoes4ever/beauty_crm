import React, { useCallback, useContext, useMemo } from 'react';
import { Form } from 'antd';
import SelectWithApi, { SelectOption } from '../../../../SelectWithApi';
import { getClientsApi } from '../../../../../utils/api';
import { StoreContext } from '../../../../../store/context';
import { LabeledValue } from 'antd/es/select';
import _ from 'lodash';
import { Client } from '../../../../../store/Client';

const SelectExisting: React.FC = () => {
	const { appointmentCreationStore } = useContext(StoreContext);

	const onOptionSelect = useCallback((option: SelectOption<Client>) => {
		appointmentCreationStore.appointment.client = {
			...option.data,
			id: _.toNumber(option.value),
			name: _.toString(option.data.name)
		};
	}, [appointmentCreationStore.appointment]);

	const defaultValue: LabeledValue = useMemo(() => ({
		value: appointmentCreationStore.appointment.client.id,
		label: appointmentCreationStore.appointment.client.name
	}), [appointmentCreationStore.appointment.client.id, appointmentCreationStore.appointment.client.name]);

	return (
		<Form
			name="client_add"
			layout="vertical"
			autoComplete="off"
			initialValues={ { client: defaultValue } }
		>
			<Form.Item
				label="Клиент"
				name="client"
				rules={ [{ required: true, message: 'Выберите клиента' }] }
			>
				<SelectWithApi
					onOptionSelect={ onOptionSelect }
					fetchOptions={ {
						fetch: getClientsApi,
						map: ['id', 'name']
					} }
					showSearch
				/>
			</Form.Item>
		</Form>
	);
};

export default SelectExisting;