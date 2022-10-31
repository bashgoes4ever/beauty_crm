import React, { useCallback, useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { ClientCategory } from '../../../store/Client';
import { observer, useLocalStore } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { ColorInput } from './styles';

type Props = {
	data?: ClientCategory;

	onClose?: () => void;
}

const defaultData: ClientCategory = {
	id: null,
	title: '',
	color: ''
};

const CategoryModal: React.FC<Props> = ({ onClose, data }) => {
	const [form] = Form.useForm();
	const title = data ? 'Редактировать категорию' : 'Добавить категорию';

	const store = useLocalStore(() => ({
		data: data ? data : defaultData,
		isValid: true
	}));

	useEffect(() => {
		const dispose = reaction(
			() => !!store.data.color && !!store.data.title,
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
					name="title"
					rules={ [{ required: true, message: 'Введите название категории' }] }
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Цвет"
					name="color"
					rules={ [{ required: true, message: 'Выберите цвет' }] }
				>
					<ColorInput type="color" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default observer(CategoryModal);