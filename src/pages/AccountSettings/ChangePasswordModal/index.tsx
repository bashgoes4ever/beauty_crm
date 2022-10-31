import React, { useCallback, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import { observer } from 'mobx-react-lite';

type Props = {
	onClose?: () => void;
}

const ChangePasswordModal: React.FC<Props> = ({ onClose }) => {
	const [form] = Form.useForm();
	const [isValid, setIsValid] = useState<boolean>(false);

	const onValuesChange = useCallback(() => {
		form.validateFields()
			.then((res) => {
				setIsValid(res.errorFields ? res.errorFields.length === 0 : true);
			})
			.catch((res) => {
				setIsValid(res.errorFields ? res.errorFields.length === 0 : true);
			});
	}, [form]);

	return (
		<Modal
			title="Смена пароля"
			cancelText="Отмена"
			okText="Сохранить"
			onCancel={ onClose }
			okButtonProps={ { disabled: !isValid } }
			onOk={ onClose }
			width={ 400 }
			visible
		>
			<Form
				name="password_change"
				autoComplete="off"
				form={ form }
				layout="vertical"
				onValuesChange={ onValuesChange }
			>
				<Form.Item
					label="Пароль"
					name="password"
					rules={ [
						{ required: true, message: 'Введите пароль' }, {
							type: 'string', min: 6, message: 'Пароль' +
								' должен быть длинее 6 символов'
						}] }
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					label="Повторите пароль"
					name="passwordConfirm"
					rules={ [
						{ required: true, message: 'Повторите пароль' },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Пароли не совпадают'));
							}
						})] }
				>
					<Input.Password />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default observer(ChangePasswordModal);