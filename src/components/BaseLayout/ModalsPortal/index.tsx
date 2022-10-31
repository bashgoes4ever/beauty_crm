import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../../store/context';
import _ from 'lodash';

const ModalsPortal: React.FC = () => {
	const { modalsStore: { modals } } = useContext(StoreContext);

	return (
		<div>
			{ _.map(modals, (Component, i) => {
				return React.cloneElement(Component, {
					key: i
				});
			}) }
		</div>
	);
};

export default observer(ModalsPortal);