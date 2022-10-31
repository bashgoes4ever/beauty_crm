import { Moment } from 'moment';
import { makeAutoObservable } from 'mobx';

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

export interface IClient {
	data: Client;

	isValid: boolean;

	clearData: () => void;

	setData: (data: Client) => void;
}

const defaultData: Client = {
	id: null,
	name: null,
	phone: null,
	email: null,
	sex: null,
	birthDate: null,
	description: null,
	discount: null,
	lastVisit: null,
	categories: []

};

class ClientStore implements IClient {
	data: IClient['data'] = defaultData;
	isValid: IClient['isValid'] = false;

	constructor() {
		makeAutoObservable(this);
	}

	clearData(): ReturnType<IClient['clearData']> {
		this.isValid = false;
		this.data = defaultData;
	}

	setData(data: Client): ReturnType<IClient['setData']> {
		this.isValid = true;
		this.data = {
			...defaultData,
			...data
		};
	}
}

export const clientStore = new ClientStore();