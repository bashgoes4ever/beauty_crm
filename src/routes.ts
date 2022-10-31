import {
	CalendarOutlined,
	LoginOutlined,
	ScissorOutlined,
	SettingOutlined,
	UserAddOutlined,
	UserOutlined
} from '@ant-design/icons';

import {
	ACCOUNT_SETTINGS,
	CLIENT_CATEGORIES,
	CLIENTS_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	SCHEDULE_ROUTE,
	SERVICES_ROUTE
} from './utils/consts';
import SchedulePage from './pages/SchedulePage';
import Login from './pages/Login';
import React from 'react';
import Registration from './pages/Registration';
import Clients from './pages/Clients';
import ClientCategories from './pages/ClientCategories';
import Services from './pages/Services';
import AccountSettings from './pages/AccountSettings';

export type Route = {
	path?: string;
	Component?: React.FC;
	label: string;
	key: number;
	icon?: React.FC;
	shouldBeAuthorized?: boolean;
	shouldHideIfAuthorized?: boolean;
	children?: Route[]
}

export const routes: Route[] = [
	{
		path: SCHEDULE_ROUTE,
		Component: SchedulePage,
		shouldBeAuthorized: true,
		label: 'Расписание',
		key: 1,
		icon: CalendarOutlined
	},
	{
		path: LOGIN_ROUTE,
		Component: Login,
		label: 'Вход',
		key: 2,
		icon: LoginOutlined,
		shouldHideIfAuthorized: true
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Registration,
		label: 'Регистрация',
		key: 3,
		icon: UserAddOutlined,
		shouldHideIfAuthorized: true
	},
	{
		label: 'Клиенты',
		key: 4,
		icon: UserOutlined,
		shouldBeAuthorized: true,
		children: [
			{
				path: CLIENTS_ROUTE,
				Component: Clients,
				label: 'Список клиентов',
				key: 5,
				shouldBeAuthorized: true
			},
			{
				path: CLIENT_CATEGORIES,
				Component: ClientCategories,
				label: 'Категории клиентов',
				key: 6,
				shouldBeAuthorized: true
			}
		]
	},
	{
		path: SERVICES_ROUTE,
		Component: Services,
		label: 'Услуги',
		key: 7,
		icon: ScissorOutlined,
		shouldBeAuthorized: true
	},
	{
		label: 'Аккаунт',
		key: 8,
		icon: SettingOutlined,
		shouldBeAuthorized: true,
		children: [
			{
				path: ACCOUNT_SETTINGS,
				Component: AccountSettings,
				label: 'Основные настройки',
				key: 9,
				shouldBeAuthorized: true
			}
		]
	}
];