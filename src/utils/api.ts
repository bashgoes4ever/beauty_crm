import { delay } from './helpers';
import { User } from '../store/User';
import { Client, ClientCategory, Sex } from '../store/Client';
import { Service } from '../store/Services';
import { AppointmentData, AppointmentStatus } from '../store/AppointmentModal';
import { colors } from '../styles/constants';
import moment, { Moment } from 'moment';
import _ from 'lodash';

export const loginApi = (): Promise<User> => {
	return delay().then(() => ({
		login: 'ab',
		email: 'ab@mail.ru',
		phone: '123',
		userData: {
			name: 'Богдан',
			workingHours: {
				from: '10:00',
				to: '21:00'
			}
		}
	}));
};

export const getClientsApi = (): Promise<Client[]> => {
	return delay().then(() => [
		{
			id: 1,
			name: 'Марухелин Богдан Андреевич',
			phone: '89243299599',
			discount: 10,
			lastVisit: moment(),
			birthDate: moment(),
			categories: [
				{
					id: 1,
					title: 'VIP',
					color: colors.service1
				},
				{
					id: 2,
					title: 'Постоянный',
					color: colors.service2
				}
			]
		},
		{
			id: 2,
			name: 'Алекс',
			email: 'alex@mail.ru'
		},
		{
			id: 3,
			name: 'Том',
			lastVisit: moment().add(-1, 'days'),
			birthDate: moment().add(-12, 'years'),
			categories: [
				{
					id: 2,
					title: 'Постоянный',
					color: colors.service2
				}
			]
		}
	]);
};

export const getServicesApi = (): Promise<Service[]> => {
	return delay().then(() => [
		{
			id: 1,
			name: 'Стрижка',
			price: 1000,
			duration: 60,
			color: colors.service2
		},
		{
			id: 2,
			name: 'Укладка',
			price: 500,
			duration: 30,
			color: colors.service1
		},
		{
			id: 3,
			name: 'Бритьё',
			price: 500,
			duration: 30,
			color: colors.current
		},
		{
			id: 4,
			name: 'Комплекс: стрижка + укладка',
			price: 1200,
			duration: 90,
			color: colors.service1
		}
	]);
};

export const getAppointmentStatusesApi = (): Promise<AppointmentStatus[]> => {
	return delay().then(() => [
		{
			id: 1,
			title: 'Ожидание клиента',
			priority: 1
		},
		{
			id: 2,
			title: 'Клиент пришел',
			priority: 2
		},
		{
			id: 3,
			title: 'Клиент не пришел',
			priority: 3
		},
		{
			id: 4,
			title: 'Клиент подтвердил',
			priority: 4
		}
	]);
};

export const getClientCategoriesApi = (): Promise<ClientCategory[]> => {
	return delay().then(() => [
		{
			id: 1,
			title: 'VIP',
			color: colors.service1
		},
		{
			id: 2,
			title: 'Постоянный',
			color: colors.service2
		}
	]);
};

export const getAvailableSexApi = (): Promise<Sex[]> => {
	return delay().then(() => [
		{
			id: 1,
			title: 'Мужской'
		},
		{
			id: 2,
			title: 'Женский'
		}
	]);
};

export const getAppointmentsApi = (): Promise<AppointmentData[]> => {
	return delay().then(() => [
		{
			id: 1,
			client: {
				id: 1,
				name: 'Bogdan',
				phone: '',
				email: ''
			},
			services: [
				{
					service: {
						id: 1,
						name: 'Стрижка',
						price: 1000,
						duration: 60,
						color: colors.service1
					},
					quantity: 1,
					discount: null,
					totalPrice: 1000
				}],
			startDateTime: moment().add(1, 'days'),
			duration: 60,
			status: {
				id: 1,
				title: 'Ожидание клиента',
				priority: 1
			},
			description: ''
		},
		{
			id: 2,
			client: {
				id: 1,
				name: 'John',
				phone: '',
				email: ''
			},
			services: [
				{
					service: {
						id: 1,
						name: 'Стрижка',
						price: 1000,
						duration: 60,
						color: colors.service1
					},
					quantity: 1,
					discount: null,
					totalPrice: 1000
				},
				{
					service: {
						id: 2,
						name: 'Укладка',
						price: 500,
						duration: 30,
						color: colors.service2
					},
					quantity: 1,
					discount: null,
					totalPrice: 1500
				}
			],
			startDateTime: moment().add(-2, 'days').add(7, 'hours'),
			duration: 90,
			status: {
				id: 2,
				title: 'Клиент пришел',
				priority: 2
			},
			description: ''
		},
		{
			id: 3,
			client: {
				id: 1,
				name: 'Bogdan',
				phone: '',
				email: ''
			},
			services: [
				{
					service: {
						id: 3,
						name: 'Бритье',
						price: 500,
						duration: 30,
						color: colors.current
					},
					quantity: 1,
					discount: null,
					totalPrice: 500
				}],
			startDateTime: moment().add(-1, 'days'),
			duration: 60,
			status: {
				id: 3,
				title: 'Клиент не пришел',
				priority: 3
			},
			description: ''
		}
	]);
};

export type StatisticsScale = 'month' | 'year'
type ScaleOptions = {
	[key in StatisticsScale]: {
		rangeStart: (date: Moment) => number;
		rangeEnd: (date: Moment) => number;
		dateString: (date: number) => string;
	}
}
const scaleOptions: ScaleOptions = {
	month: {
		rangeStart: (date) => moment(date).startOf('month').date(),
		rangeEnd: (date) => moment(date).endOf('month').date() + 1,
		dateString: (date) => _.toString(date)
	},
	year: {
		rangeStart: (date) => moment(date).startOf('month').date() + 1,
		rangeEnd: (date) => moment(date).endOf('month').date() + 2,
		dateString: (date) => moment.monthsShort(date - 1)
	}
};

const getRandomNumber = (min: number, max: number): number => Math.round(Math.random() * (max - min) + min);

export const getClientStatisticsApi = (
	scale: StatisticsScale = 'month',
	date: Moment = moment()): Promise<Array<{ date: string; value: number; service: string; color: string }>> => {
	return delay().then(() => {
		const data = _.map(_.range(scaleOptions[scale].rangeStart(date), scaleOptions[scale].rangeEnd(date)),
			(currentDate) => _.map(['Стрижка', 'Укладка', 'Бритье'], (service) => ({
				date: scaleOptions[scale].dateString(currentDate),
				value: getRandomNumber(0, 2000),
				color: colors.service2,
				service
			}))
		);
		return data.flat();
	});
};

export const getTotalsApi = (): Promise<Array<{ title: string; value: number; }>> => {
	return delay().then(() => [
		{
			title: 'Всего',
			value: 21000
		},
		{
			title: 'Стрижка',
			value: 10500
		},
		{
			title: 'Укладка',
			value: 4000
		},
		{
			title: 'Бритье',
			value: 2400
		}
	]);
};