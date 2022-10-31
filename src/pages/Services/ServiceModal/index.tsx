import React, { useCallback, useEffect } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';
import { observer, useLocalStore } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ColorInput } from './styles';
import { Service } from '../../../store/Services';

type Props = {
	data?: Service;

	onClose?: () => void;
}

const defaultData: Service = {
	id: null,
	name: '',
	color: '',
	price: null,
	duration: null,
	description: ''
};

const ServiceModal: React.FC<Props> = ({ onClose, data }) => {
	const [form] = Form.useForm();
	const title = data ? 'Редактировать услугу' : 'Добавить услугу';

	const store = useLocalStore(() => ({
		data: data ? data : defaultData,
		isValid: true
	}));

	useEffect(() => {
		const dispose = reaction(
			() => !!store.data.color && !!store.data.name && !!store.data.price && !!store.data.duration,
			(isValid) => {
				store.isValid = isValid;
			},
			{
				fireImmediately: true
			}
		);

		return () => dispose();
	}, []);

	const onValuesChange = useCallback((changedValues: any) => {
		store.data = {
			...store.data,
			...changedValues
		};
	}, [store]);

	return (
		<Modal
			title={ title }
			cancelText="Отмена"
			okText="Сохранить"
			onCancel={ onClose }
			okButtonProps={ { disabled: !store.isValid } }
			onOk={ onClose }
			width={ 400 }
			visible
		>
			<Form
				name="basic"
				initialValues={ store.data }
				layout="vertical"
				autoComplete="off"
				form={ form }
				onValuesChange={ onValuesChange }
			>
				<Form.Item
					label="Название"
					name="name"
					rules={ [{ required: true, message: 'Введите название услуги' }] }
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="price"
					label="Стоимость, рублей"
					rules={ [{ required: true, message: 'Введите стоимость' }] }
				>
					<InputNumber
						style={ { width: '100%' } }
					/>
				</Form.Item>
				<Form.Item
					name="duration"
					label="Продолжительность, минут"
					rules={ [{ required: true, message: 'Введите продолжительность' }] }
				>
					<InputNumber
						style={ { width: '100%' } }
					/>
				</Form.Item>
				<Form.Item
					label="Цвет"
					name="color"
					rules={ [{ required: true, message: 'Выберите цвет' }] }
				>
					<ColorInput type="color" />
				</Form.Item>
				<Form.Item label="Комментарий" name="description" labelCol={ { span: 24 } }>
					<Input.TextArea rows={ 4 } />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default observer(ServiceModal);