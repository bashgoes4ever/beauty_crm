import React from 'react';
import ClientSelection from '../components/Schedule/AppointmentModal/ClientSelection';
import ServiceSelection from '../components/Schedule/AppointmentModal/ServiceSelection';
import DateSelection from '../components/Schedule/AppointmentModal/DateSelection';
import AdditionalInfo from '../components/Schedule/AppointmentModal/AdditionalInfo';
import Confirmation from '../components/Schedule/AppointmentModal/Confirmation';
import { Moment } from 'moment';
import { Client } from './Client';
import { makeAutoObservable } from 'mobx';
import _ from 'lodash';
import { Service } from './Services';

export enum Steps {
	CLIENT_SELECTION = 1,
	SERVICE_SELECTION,
	DATE_SELECTION,
	ADDITIONAL_INFO,
	CONFIRMATION
}

export type AppointmentService = {
	service: Service;
	quantity: number;
	discount?: number;
	totalPrice: number;
}

export type AppointmentStatus = {
	id: number;
	title: string;
	priority: number;
}

export type AppointmentData = {
	id: number;
	client?: Client;
	services?: AppointmentService[];
	startDateTime?: Moment;
	duration?: number;
	status?: AppointmentStatus;
	description?: string;
}

type StepData = {
	component: React.FC,
	validate: (data: AppointmentData) => boolean,
	okText: string;
	cancelText: string;
}

type AllStepsData = { [key in Steps]: StepData }

type Direction = 'forward' | 'backward'

const stepsData: AllStepsData = {
	[Steps.CLIENT_SELECTION]: {
		component: ClientSelection,
		validate: ({ client }) => !!(client?.name || client?.id),
		okText: 'Далее',
		cancelText: 'Отмена'
	},
	[Steps.SERVICE_SELECTION]: {
		component: ServiceSelection,
		validate: ({ services }) => _.size(services) > 0 && _.every(services, (service) => service?.service?.id),
		okText: 'Далее',
		cancelText: 'Назад'
	},
	[Steps.DATE_SELECTION]: {
		component: DateSelection,
		validate: ({ duration, startDateTime }) => duration && duration > 0 && !_.isNil(startDateTime),
		okText: 'Далее',
		cancelText: 'Назад'
	},
	[Steps.ADDITIONAL_INFO]: {
		component: AdditionalInfo,
		validate: ({ status }) => !_.isNil(status),
		okText: 'Далее',
		cancelText: 'Назад'
	},
	[Steps.CONFIRMATION]: {
		component: Confirmation,
		validate: (data) => true,
		okText: 'Сохранить',
		cancelText: 'Назад'
	}
};

const defaultAppointmentData: AppointmentData = {
	id: null,
	client: {
		id: null,
		name: '',
		phone: '',
		email: ''
	},
	services: [
		{
			service: null,
			quantity: null,
			discount: null,
			totalPrice: null
		}],
	startDateTime: null,
	duration: null,
	status: null,
	description: ''
};

export interface IAppointmentModal {
	appointment: AppointmentData;

	currentStep: Steps;

	currentComponent: React.FC,

	stepsData: AllStepsData;

	navigate: (direction?: Direction, event?: () => void) => void;

	isStepValid: boolean;

	buttonsText: { okText: string; cancelText: string };

	clearData: () => void;

	isNewClient: boolean;

	clearClientData: () => void;

	totalPrice: number;

	durationFromServices: number;
}

class AppointmentModal implements IAppointmentModal {
	appointment: IAppointmentModal['appointment'] = defaultAppointmentData;
	stepsData: IAppointmentModal['stepsData'] = null;
	currentStep: IAppointmentModal['currentStep'] = Steps.CLIENT_SELECTION;
	isNewClient: IAppointmentModal['isNewClient'] = true;

	constructor(stepsData: AllStepsData) {
		this.stepsData = stepsData;

		makeAutoObservable(this);
	}

	get isStepValid() {
		return this.stepsData[this.currentStep].validate(this.appointment);
	}

	get buttonsText() {
		return {
			okText: this.stepsData[this.currentStep].okText,
			cancelText: this.stepsData[this.currentStep].cancelText
		};
	}

	get currentComponent() {
		return this.stepsData[this.currentStep].component;
	}

	get totalPrice() {
		if (_.size(this.appointment.services) <= 0) {
			return 0;
		}

		return _.reduce(this.appointment.services, (total, current) => total + (current?.totalPrice || 0), 0);
	}

	get durationFromServices() {
		if (_.size(this.appointment.services) <= 0) {
			return 0;
		}

		return _.reduce(
			this.appointment.services,
			(total, current) => total + (current?.service?.duration * current?.quantity || 0),
			0);
	}

	navigate(
		direction: Direction = 'forward', event: () => void = _.noop): ReturnType<IAppointmentModal['navigate']> {
		if (direction === 'forward') {
			if (this.currentStep === Steps.CONFIRMATION) {
				event();
				return;
			}

			this.currentStep = this.currentStep + 1;
			return;
		}

		if (this.currentStep === Steps.CLIENT_SELECTION) {
			event();
			return;
		}

		this.currentStep = this.currentStep - 1;
	}

	clearData(): ReturnType<IAppointmentModal['clearData']> {
		this.currentStep = Steps.CLIENT_SELECTION;
		this.appointment = defaultAppointmentData;
	}

	clearClientData(): ReturnType<IAppointmentModal['clearClientData']> {
		this.appointment.client = defaultAppointmentData.client;
	}
}

export const appointmentCreationStore = new AppointmentModal(stepsData);