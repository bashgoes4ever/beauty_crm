import { IUser } from './User';
import React from 'react';

export type IStoreContext = {
	user: IUser
}

export const StoreContext = React.createContext<IStoreContext>(null);