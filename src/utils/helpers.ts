import _ from 'lodash';
import { Scales } from '../store/ScheduleHelper';
import { AppointmentData } from '../store/AppointmentModal';
import moment from 'moment';

export const delay = (d: number = 500) => new Promise((resolve) => {
	setTimeout(() => {
		resolve(true);
	}, d);
});

/**
 * Convert time string in format hh:mm to number
 * @param time time string
 */
export const getNumberFromTimeString = (time: string) => +time.split(':')[0] + (time.split(':')[1] === '00' ? 0 : .5);

const getTimeStringFromNumber = (num: number): string => [
	Math.floor(num),
	num % 1 === 0 ? '00' : (num % 1) * 60].join(':');

const scaleMinutesToAdd = {
	[Scales.QUARTER_HOUR]: .25,
	[Scales.HALF_HOUR]: .5,
	[Scales.FULL_HOUR]: 1,
	[Scales.TWO_HOURS]: 2
};

/**
 * Make an array of working hours between two time strings in format hh:mm
 * and return new end time if time cant be divided on equal parts
 * @param from time from
 * @param to time to
 * @param scale scale
 */
export const getWorkingHours = (
	from: string, to: string,
	scale: Scales = Scales.HALF_HOUR
): { workingHours: string[], timeTo: string } => {
	const fromNumber = getNumberFromTimeString(from);
	const toNumber = getNumberFromTimeString(to);
	let timeTo = to;

	const res = [];
	let hasMatchWithEndTime = false;
	let current = fromNumber;

	const time = getTimeStringFromNumber(current);
	res.push(time);

	while (current <= toNumber) {
		current = current + scaleMinutesToAdd[scale];

		const time = getTimeStringFromNumber(current);

		if (current === toNumber) {
			hasMatchWithEndTime = true;
		}

		if (current > toNumber) {
			if (!hasMatchWithEndTime) {
				timeTo = time;
				res.push(time);
			}
			break;
		}

		res.push(time);
	}

	return {
		workingHours: res,
		timeTo
	};
};

/**
 * Format number to string and make it starts with zero
 * @param num number
 */
export const startWithZero = (num: number): string => num > 9 ? _.toString(num) : `0${ num }`;

export const hasAppointmentIntersection = (appointment1: AppointmentData, appointment2: AppointmentData): boolean => {
	const a1Start = moment(appointment1.startDateTime);
	const a1End = moment(appointment1.startDateTime).add(appointment1.duration, 'minutes');
	const a2Start = moment(appointment2.startDateTime);
	const a2End = moment(appointment2.startDateTime).add(appointment2.duration, 'minutes');

	return a1Start.isBetween(a2Start, a2End)
		|| a1End.isBetween(a2Start, a2End)
		|| a2Start.isBetween(a1Start, a1End)
		|| a2End.isBetween(a1Start, a1End);
};