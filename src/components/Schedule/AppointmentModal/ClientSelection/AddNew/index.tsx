import React, { useCallback, useContext, useMemo } from 'react';
import { Form, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../../../../store/context';

const AddNew: React.FC = () => {
	const { appointmentCreationStore } = useContext(StoreContext);
	const [form] = Form.useForm();
	const { name, email, phone } = appointmentCreationStore.appointment.client;

	const onValuesChange = useCallback(() => {
		appointmentCreationStore.appointment.client = {
			id: null,
			...form.getFieldsValue()
		};
	}, [appointmentCreationStore.appointment, form]);

	const initialValues = useMemo(() => ({
		name,
		phone,
		email
	}), [email, name, phone]);

	return (
		<Form
			name="client_creation"
			layout="vertical"
			initialValues={ initialValues }
			autoComplete="off"
			form={ form }
			onValuesChange={ onValuesChange }
		>
			<Form.Item
				label="Имя"
				name="name"
				rules={ [{ required: true, message: 'Введите имя' }] }
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Телефон"
				name="phone"
			>
				<Input inputMode="tel" />
			</Form.Item>
			<Form.Item
				label="Email"
				name="email"
			>
				<Input inputMode="email" />
			</Form.Item>
		</Form>
	);
};

export default observer(AddNew);