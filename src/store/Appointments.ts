import { makeAutoObservable, toJS } from 'mobx';
import { AppointmentData } from './AppointmentModal';
import moment from 'moment';
import { colors } from '../styles/constants';
import _ from 'lodash';
import { hasAppointmentIntersection } from '../utils/helpers';

export type AppointmentDataWithOffset = AppointmentData & {
	column: number;
	columnsCount: number;
}

export interface IAppointmentsStore {
	appointments: AppointmentData[];

	addAppointment: (data: AppointmentData) => void;

	deleteAppointment: (id: AppointmentData['id']) => void;

	getTotalPrice: (appointment: AppointmentData) => number;

	setAppointmentsOffsets: () => void;

	/**
	 * Get appointments list with which current appointment intersects straight or indirectly
	 * @param appointments list of appointments to check
	 * @param current current appointment
	 * @param visited list of ids of visited appointments
	 */
	getIntersectionsGroup: (
		appointments: AppointmentData[], current: AppointmentData, visited?: number[]) => AppointmentData[];
}

class AppointmentsStore implements IAppointmentsStore {
	appointments: IAppointmentsStore['appointments'] = [
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
						name: 'Haircut',
						price: 1000,
						duration: 60,
						color: colors.service1
					},
					quantity: 1,
					discount: null,
					totalPrice: 1000
				}],
			startDateTime: moment('2022-08-27T10:30'),
			duration: 60,
			status: {
				id: 1,
				title: 'wait',
				priority: 1
			},
			description: ''
		},
		{
			id: 2,
			client: {
				id: 1,
				name: 'Ogdab',
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
						color: colors.service2
					},
					quantity: 1,
					discount: null,
					totalPrice: 1000
				}],
			startDateTime: moment('2022-08-27T11:00'),
			duration: 60,
			status: {
				id: 1,
				title: 'wait',
				priority: 1
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
						id: 1,
						name: 'Укладка',
						price: 1000,
						duration: 60,
						color: colors.service1
					},
					quantity: 1,
					discount: null,
					totalPrice: 1000
				}],
			startDateTime: moment('2022-08-27T11:30'),
			duration: 60,
			status: {
				id: 1,
				title: 'wait',
				priority: 1
			},
			description: ''
		},
		{
			id: 4,
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
						name: 'Haircut',
						price: 1000,
						duration: 60,
						color: colors.service1
					},
					quantity: 1,
					discount: null,
					totalPrice: 1000
				}],
			startDateTime: moment('2022-08-27T15:00'),
			duration: 60,
			status: {
				id: 1,
				title: 'wait',
				priority: 1
			},
			description: ''
		},
		{
			id: 5,
			client: {
				id: 1,
				name: 'Bogdan2',
				phone: '',
				email: ''
			},
			services: [
				{
					service: {
						id: 1,
						name: 'Haircut',
						price: 1000,
						duration: 60,
						color: colors.service2
					},
					quantity: 1,
					discount: null,
					totalPrice: 1000
				}],
			startDateTime: moment('2022-08-27T14:30'),
			duration: 60,
			status: {
				id: 1,
				title: 'wait',
				priority: 1
			},
			description: ''
		},
		{
			id: 6,
			client: {
				id: 1,
				name: 'Bogdan3',
				phone: '',
				email: ''
			},
			services: [
				{
					service: {
						id: 1,
						name: 'Haircut',
						price: 1000,
						duration: 60,
						color: colors.service2
					},
					quantity: 1,
					discount: null,
					totalPrice: 1000
				}],
			startDateTime: moment('2022-08-27T10:30'),
			duration: 30,
			status: {
				id: 1,
				title: 'wait',
				priority: 1
			},
			description: ''
		},
		{
			id: 7,
			client: {
				id: 1,
				name: 'Bogdan3',
				phone: '',
				email: ''
			},
			services: [
				{
					service: {
						id: 1,
						name: 'Haircut',
						price: 1000,
						duration: 60,
						color: colors.service2
					},
					quantity: 1,
					discount: null,
					totalPrice: 1000
				}],
			startDateTime: moment('2022-08-01T17:30'),
			duration: 30,
			status: {
				id: 1,
				title: 'wait',
				priority: 1
			},
			description: ''
		},
		{
			id: 8,
			client: {
				id: 1,
				name: 'Bogdan3',
				phone: '',
				email: ''
			},
			services: [
				{
					service: {
						id: 1,
						name: 'Haircut',
						price: 1000,
						duration: 60,
						color: colors.service2
					},
					quantity: 1,
					discount: null,
					totalPrice: 1000
				}],
			startDateTime: moment('2022-09-01T17:30'),
			duration: 30,
			status: {
				id: 1,
				title: 'wait',
				priority: 1
			},
			description: ''
		},
		{
			id: 9,
			client: {
				id: 1,
				name: 'Bogdan4',
				phone: '',
				email: ''
			},
			services: [
				{
					service: {
						id: 1,
						name: 'Haircut',
						price: 1000,
						duration: 60,
						color: colors.service2
					},
					quantity: 1,
					discount: null,
					totalPrice: 1000
				}],
			startDateTime: moment('2022-09-01T14:30'),
			duration: 30,
			status: {
				id: 1,
				title: 'wait',
				priority: 1
			},
			description: ''
		}
	];

	constructor() {
		makeAutoObservable(this);
	}

	addAppointment(data: AppointmentData): ReturnType<IAppointmentsStore['addAppointment']> {
		const appointmentIndex = _.findIndex(this.appointments, appointment => appointment.id === data.id);

		if (appointmentIndex !== -1) {
			this.appointments[appointmentIndex] = data;
		} else {
			this.appointments.push(data);
		}

		this.setAppointmentsOffsets();
	}

	deleteAppointment(id: AppointmentData['id']): ReturnType<IAppointmentsStore['deleteAppointment']> {
		const appointmentIndex = _.findIndex(this.appointments, appointment => appointment.id === id);

		if (appointmentIndex !== -1) {
			this.appointments.splice(appointmentIndex, 1);
			this.setAppointmentsOffsets();
		}
	}

	setAppointmentsOffsets(): ReturnType<IAppointmentsStore['setAppointmentsOffsets']> {
		const visited: number[] = [];
		const groups = _.map(this.appointments, (appointment: AppointmentData) => {
			if (!_.includes(visited, appointment.id)) {
				const group = this.getIntersectionsGroup(this.appointments, appointment);

				// generate empty arrays for every appointment in group
				const columns: AppointmentDataWithOffset[][] = Array(group.length).fill(null).map(() => []);

				// loop through appointments in group and put them into column with check for intersection
				_.forEach(group, (a) => {
					_.forEach(columns, (column, i) => {
						let hasIntersections = false;
						_.forEach(column, (columnAppointment) => {
							if (hasAppointmentIntersection(columnAppointment, a)) {
								hasIntersections = true;
								return false;
							}
						});
						if (!hasIntersections) {
							column.push({
								...a,
								column: i + 1,
								columnsCount: null
							});

							return false;
						}
					});
				});

				visited.push(..._.map(group, (a) => a.id));

				// merge columns into one array and add columnsCount field
				const result = columns.flat();
				const columnsCount = _.maxBy(result, a => a.column).column;
				return _.map(result, a => ({ ...a, columnsCount }));
			}
		});
		this.appointments = _.compact(groups.flat());
	}

	getIntersectionsGroup(
		appointments: AppointmentData[],
		current: AppointmentData,
		visited: number[] = []
	): ReturnType<IAppointmentsStore['getIntersectionsGroup']> {
		const res: AppointmentData[] = [toJS(current)];
		_.map(appointments, (appointment) => {
			if (hasAppointmentIntersection(appointment, current) && !_.includes(visited, current.id)) {
				res.push(...this.getIntersectionsGroup(appointments, appointment, [...visited, current.id]));
			}
		});

		return Array.from(new Set(res.map(a => a.id)))
			.map(id => {
				return res.find(a => a.id === id);
			});
	}

	getTotalPrice(appointment: AppointmentData): ReturnType<IAppointmentsStore['getTotalPrice']> {
		if (_.size(appointment.services) <= 0) {
			return 0;
		}

		return _.reduce(appointment.services, (total, current) => total + (current?.totalPrice || 0), 0);
	}
}

export const appointmentsStore = new AppointmentsStore();