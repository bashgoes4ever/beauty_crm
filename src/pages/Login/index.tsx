import React, { useCallback, useContext, useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { StoreContext } from '../../store/context';
import { useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE, SCHEDULE_ROUTE } from '../../utils/consts';

type FormData = {
	username: string;
	password: string;
}

const Login: React.FC = () => {
	const { user } = useContext(StoreContext);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = useCallback(({ username, password }: FormData) => {
		setIsLoading(true);
		user.login(username, password).then(() => {
			setIsLoading(false);
			navigate(SCHEDULE_ROUTE);
		});
	}, [user, navigate]);

	return (
		<Form
			name="basic"
			labelCol={ { span: 9 } }
			wrapperCol={ { span: 5 } }
			initialValues={ { remember: true } }
			autoComplete="off"
			onFinish={ onSubmit }
			disabled={ isLoading }
		>
			<Form.Item wrapperCol={ { offset: 9, span: 16 } }>
				<Typography.Title level={ 2 }>Вход в систему</Typography.Title>
			</Form.Item>
			<Form.Item
				label="Логин"
				name="username"
				rules={ [{ required: true, message: 'Введите логин' }] }
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Пароль"
				name="password"
				rules={ [{ required: true, message: 'Введите пароль' }] }
			>
				<Input.Password />
			</Form.Item>

			<Form.Item wrapperCol={ { offset: 9, span: 16 } }>
				<Button type="primary" htmlType="submit">
					Войти
				</Button>
			</Form.Item>

			<Form.Item wrapperCol={ { offset: 9, span: 16 } }>
				<Button danger icon={ <MailOutlined /> } type="primary">
					Войти через Gmail
				</Button>
				<Button type="link" onClick={ () => navigate(REGISTRATION_ROUTE) }>
					Регистрация
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Login;