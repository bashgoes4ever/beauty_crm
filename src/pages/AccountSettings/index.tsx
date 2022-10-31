import React, { useCallback, useContext } from 'react';
import { Button, Form as AntdForm, Input, Typography } from 'antd';
import { StoreContext } from '../../store/context';
import { Form } from './styles';
import ChangePasswordModal from './ChangePasswordModal';

const AccountSettings: React.FC = () => {
	const { user, modalsStore } = useContext(StoreContext);
	const [form] = AntdForm.useForm();

	const onChangePasswordBtnClick = useCallback(() => {
		modalsStore.show(<ChangePasswordModal />);
	}, [modalsStore]);

	return (
		<>
			<Typography.Title>Основные настройки</Typography.Title>
			<Form
				name="basic"
				initialValues={ user.data }
				layout="vertical"
				autoComplete="off"
				form={ form }
				// onValuesChange={ onValuesChange }
			>
				<AntdForm.Item
					label="Почта"
					name="email"
					rules={ [
						{ required: true, message: 'Введите почту' }, {
							type: 'email', message: 'Введите корректное' +
								' значение'
						}] }
				>
					<Input />
				</AntdForm.Item>
				<AntdForm.Item
					label="Телефон"
					name="phone"
				>
					<Input />
				</AntdForm.Item>

				<AntdForm.Item>
					<Button type="primary" htmlType="submit">Сохранить</Button>
				</AntdForm.Item>

				<AntdForm.Item>
					<Button type="link" style={ { padding: 0 } } onClick={ onChangePasswordBtnClick }>Сменить
						пароль</Button>
				</AntdForm.Item>
			</Form>
		</>
	);
};

export default AccountSettings;