import React, { useCallback, useContext } from 'react';
import CommonGrid from '../CommonGrid';
import { Moment } from 'moment';
import { StoreContext } from '../../../store/context';
import { VIEWS } from '../../../store/ScheduleHelper';

const WeekView: React.FC = () => {
	const { scheduleHelper } = useContext(StoreContext);

	const onHeaderCellClick = useCallback((date: Moment) => {
		scheduleHelper.currentDate = date;
		scheduleHelper.currentView = VIEWS.day.key;
	}, [scheduleHelper]);

	return <CommonGrid type="week" onHeaderCellClick={ onHeaderCellClick } />;
};

export default WeekView;