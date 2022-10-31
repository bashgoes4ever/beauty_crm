import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Route as RouteType, routes } from '../../routes';
import { LOGIN_ROUTE, SCHEDULE_ROUTE } from '../../utils/consts';
import { StoreContext } from '../../store/context';
import { observer } from 'mobx-react-lite';

const getRoutes = (routes: RouteType[], isAuthorized: boolean): any => routes.map(
	({ path, Component, shouldBeAuthorized, key, children }) => {
		if (children && children.length > 0) {
			return getRoutes(children, isAuthorized);
		}

		if (!Component || !path) {
			return null
		}

		if (shouldBeAuthorized && !isAuthorized) {
			return <Route path="*" element={ <Navigate to={ LOGIN_ROUTE } /> } key={ key } />;
		}

		return <Route path={ path } element={ <Component /> } key={ key } />;
	}
);

const AppRouter: React.FC = () => {
	const { user: { isAuthorized } } = useContext(StoreContext);

	return (
		<Routes>
			{ getRoutes(routes, isAuthorized) }

			<Route path="*" element={ <Navigate to={ SCHEDULE_ROUTE } /> } />
		</Routes>
	);
};

export default observer(AppRouter);