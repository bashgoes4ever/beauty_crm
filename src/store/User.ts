import { makeAutoObservable } from 'mobx';
import { loginApi } from '../utils/api';

export type WorkingHours = {
	from: string,
	to: string
}

export type UserData = {
	name: string;
	workingHours: WorkingHours;
	description?: string;
	img?: string;
}

export type User = {
	login: string;
	email: string;
	phone?: string;
	userData: UserData
}

export interface IUserStore {
	isAuthorized: boolean;

	data: User;

	setUserData: (data: User) => void;

	login: (username: string, password: string) => Promise<unknown>;
}

class UserStore implements IUserStore {
	isAuthorized: IUserStore['isAuthorized'] = true;
	data: IUserStore['data'] = null;

	constructor() {
		this.data = {
			login: 'bash359',
			email: 'mb@mail.ru',
			phone: '1234',
			userData: {
				name: 'Богдан',
				workingHours: {
					from: '08:00',
					to: '18:00'
				}
			}
		};
		makeAutoObservable(this);
	}

	setUserData(data: User): ReturnType<IUserStore['setUserData']> {
		this.data = data;
	}

	login(username: string, password: string): ReturnType<IUserStore['login']> {
		console.log(username, password);
		return loginApi().then((res) => {
			this.setUserData(res);
			this.isAuthorized = true;
		});
	}
}

export const userStore = new UserStore();