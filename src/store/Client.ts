import { Moment } from 'moment';

export type Sex = {
	id: number;
	title: string;
}

export type ClientCategory = {
	id: number;
	title: string;
	color: string;
}

export type Client = {
	id: number;
	name: string;
	phone?: string;
	email?: string
	sex?: Sex;
	birthDate?: Moment;
	description?: string;
	discount?: number;
	lastVisit?: Moment;
	categories?: ClientCategory[]
}

export interface IClients {
	data: Client[];
}