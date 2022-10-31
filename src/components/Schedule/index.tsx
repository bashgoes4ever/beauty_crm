import React, { useContext, useMemo } from 'react';
import { Wrapper } from './styles';
import DayView from './DayView';
import WeekView from './WeekView';
import { StoreContext } from '../../store/context';
import { observer } from 'mobx-react-lite';
import Toolbar from './Toolbar';
import MonthView from './MonthView';

const Schedule: React.FC = () => {
	const { scheduleHelper: { currentView } } = useContext(StoreContext);

	const viewComponent = useMemo(() => {
		if (currentView === 'day') {
			return <DayView />;
		}

		if (currentView === 'month') {
			return <MonthView />
		}

		return <WeekView />;
	}, [currentView]);

	return (
		<Wrapper>
			<Toolbar />
			{ viewComponent }
		</Wrapper>
	);
};

export default observer(Schedule);