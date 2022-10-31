import { IUserStore } from './User';
import React from 'react';
import { IScheduleHelper } from './ScheduleHelper';
import { IModal } from './Modal';
import { IAppointmentModal } from './AppointmentModal';
import { IAppointmentsStore } from './Appointments';
import { IClient } from './Client';

export type IStoreContext = {
	user: IUserStore,
	scheduleHelper: IScheduleHelper,
	modalsStore: IModal
	appointmentCreationStore: IAppointmentModal
	appointmentsStore: IAppointmentsStore
	clientStore: IClient
}

export const StoreContext = React.createContext<IStoreContext>(null);