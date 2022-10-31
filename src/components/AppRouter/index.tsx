import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '../routes';
import { SCHEDULE_ROUTE } from '../utils/consts';

const AppRouter: React.FC = () => {
	return (
		<Routes>
			{ routes.map(({ path, Component }) =>
				<Route path={ path } element={ <Component /> } key={ path } />
			) }

			<Route path="*" element={ <Navigate to={ SCHEDULE_ROUTE } /> } />
		</Routes>
	);
};

export default AppRouter;