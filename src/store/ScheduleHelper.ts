import { makeAutoObservable } from 'mobx';
import moment, { Moment } from 'moment';
import { PickerMode } from 'rc-picker/lib/interface';
import _ from 'lodash';

export type ScheduleViews = 'day' | 'week' | 'month'
type DateNavigateDirection = 'forward' | 'backward'

export type ViewData = {
	key: ScheduleViews;
	pickerMode: PickerMode;
	toString: (date: Moment) => string;
	getNextDate: (moment: Moment, direction: DateNavigateDirection) => Moment;
}

export enum Scales {
	QUARTER_HOUR,
	HALF_HOUR,
	FULL_HOUR,
	TWO_HOURS
}

export const VIEWS: { [key in ScheduleViews]: ViewData } = {
	day: {
		key: 'day',
		pickerMode: 'date',
		toString: (date) => date.format('DD MMMM YYYY'),
		getNextDate: (date, direction = 'forward') => {
			return moment(date).add(direction === 'forward' ? 1 : -1, 'day');
		}
	},
	week: {
		key: 'week',
		pickerMode: 'week',
		toString: (date) => {
			const start = moment(date).startOf('week');
			const end = moment(date).endOf('week');

			return `${ start.format('DD MMMM YYYY') } - ${ end.format('DD MMMM YYYY') }`;
		},
		getNextDate: (date, direction = 'forward') => {
			return moment(date).add(direction === 'forward' ? 1 : -1, 'weeks');
		}
	},
	month: {
		key: 'month',
		pickerMode: 'month',
		toString: (date) => _.capitalize(date.format('MMMM')),
		getNextDate: (date, direction = 'forward') => {
			return moment(date).add(direction === 'forward' ? 1 : -1, 'months');
		}
	}
};

export interface IScheduleHelper {
	currentView: ScheduleViews;

	currentDate: Moment;

	currentDateString: string;

	pickerMode: PickerMode;

	navigate: (direction?: DateNavigateDirection) => void;

	scale: Scales;
}

class ScheduleHelper implements IScheduleHelper {
	currentView: IScheduleHelper['currentView'] = VIEWS.day.key;
	currentDate: IScheduleHelper['currentDate'] = moment();
	scale: IScheduleHelper['scale'] = Scales.HALF_HOUR;

	constructor() {
		makeAutoObservable(this);
	}

	public get currentDateString() {
		return VIEWS[this.currentView].toString(this.currentDate);
	}

	public get pickerMode() {
		return VIEWS[this.currentView].pickerMode;
	}

	navigate(direction: DateNavigateDirection = 'forward'): ReturnType<IScheduleHelper['navigate']> {
		this.currentDate = VIEWS[this.currentView].getNextDate(this.currentDate, direction);
	}
}

export const scheduleHelper = new ScheduleHelper();