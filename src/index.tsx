import React, { useMemo } from 'react';
import 'moment/locale/ru';
import { observer } from 'mobx-react-lite';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import BaseLayout from './components/BaseLayout';
import { IStoreContext, StoreContext } from './store/context';
import { userStore as user } from './store/User';

import './index.css';
import { scheduleHelper } from './store/ScheduleHelper';
import { modalsStore } from './store/Modal';
import { appointmentCreationStore } from './store/AppointmentModal';
import { appointmentsStore } from './store/Appointments';
import { clientStore } from './store/Client';

const App = observer(() => {
	const storeContextValue: IStoreContext = useMemo(() => ({
		user,
		scheduleHelper,
		modalsStore,
		appointmentCreationStore,
		appointmentsStore,
		clientStore
	}), []);

	return (
		<StoreContext.Provider value={ storeContextValue }>
			<BrowserRouter>
				<BaseLayout>
					<AppRouter />
				</BaseLayout>
			</BrowserRouter>
		</StoreContext.Provider>
	);
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);