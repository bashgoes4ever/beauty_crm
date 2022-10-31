import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { LOGIN_ROUTE } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';

const Registration: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Form
			name="basic"
			labelCol={ { span: 9 } }
			wrapperCol={ { span: 5 } }
			initialValues={ { remember: true } }
			autoComplete="off"
		>
			<Form.Item wrapperCol={ { offset: 9, span: 16 } }>
				<Typography.Title level={ 2 }>Регистрация</Typography.Title>
			</Form.Item>
			<Form.Item
				label="Логин"
				name="username"
				rules={ [
					{ required: true, message: 'Введите логин' }, {
						type: 'string', min: 4, message: 'Логин' +
							' должен быть длинее 4 символов'
					}] }
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Почта"
				name="email"
				rules={ [
					{ required: true, message: 'Введите почту' }, {
						type: 'email', message: 'Введите корректное' +
							' значение'
					}] }
			>
				<Input />
			</Form.Item>

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

			<Form.Item wrapperCol={ { offset: 9, span: 16 } }>
				<Button type="primary" htmlType="submit">
					Зарегистрироваться
				</Button>
			</Form.Item>

			<Form.Item wrapperCol={ { offset: 9, span: 16 } }>
				<Button danger icon={ <MailOutlined /> } type="primary">
					Регистрация через Gmail
				</Button>
				<Button type="link" onClick={ () => navigate(LOGIN_ROUTE) }>
					Войти
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Registration;