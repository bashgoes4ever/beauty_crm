import { makeAutoObservable } from 'mobx';
import React from 'react';
import _ from 'lodash';

export interface IModal {
	modals: Array<JSX.Element>;

	show: (modal: JSX.Element) => void;

	close: (id: number) => void;
}

class Modal implements IModal {
	modals: IModal['modals'] = [];

	constructor() {
		makeAutoObservable(this);
	}

	show(modal: JSX.Element): ReturnType<IModal['show']> {
		const props = _.get(modal, 'props', {});

		this.modals.push(React.cloneElement(
			modal, {
				...props,
				onClose: () => {
					props?.onClose && props.onClose();
					this.close(this.modals.length - 1);
				}
			}
		));
	}

	close(id: number): ReturnType<IModal['close']> {
		this.modals.splice(id, 1);
	}
}

export const modalsStore = new Modal();