import { RefObject, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { StoreContext } from '../../../store/context';
import moment from 'moment';
import { getNumberFromTimeString } from '../../../utils/helpers';

type UseTimeLineHookValues = {
	shouldShow: boolean;
	offsetTop: number;
}

type UseTimeLineHookParams = {
	hoursRef: RefObject<HTMLDivElement>;

	timeFrom: string;

	timeTo: string;
}

const useTimeLine = ({ hoursRef, timeFrom, timeTo }: UseTimeLineHookParams): UseTimeLineHookValues => {
	const { scheduleHelper: { currentDate, scale } } = useContext(StoreContext);
	const [timeLineOffsetTop, setTimeLineOffsetTop] = useState(null);

	const { minutesFrom, minutesNow, minutesTo } = useMemo(() => {
		return {
			minutesNow: moment().hours() * 60 + moment().minutes(),
			minutesFrom: getNumberFromTimeString(timeFrom) * 60,
			minutesTo: getNumberFromTimeString(timeTo) * 60
		};
	}, [timeFrom, timeTo]);

	const shouldShowTimeline: boolean = useMemo(() => {
		return !(minutesNow > minutesTo || minutesNow < minutesFrom || !moment().isSame(currentDate, 'day'));
	}, [currentDate, minutesFrom, minutesNow, minutesTo]);

	const getTimeLineOffsetTop = useCallback((): number => {
		const cellHeight = hoursRef.current.offsetHeight / hoursRef.current.childElementCount;
		const minuteInPixel = (hoursRef.current.offsetHeight - cellHeight) / (minutesTo - minutesFrom);

		return (minutesNow - minutesFrom) * minuteInPixel;
	}, [hoursRef, minutesFrom, minutesNow, minutesTo, scale]);

	useLayoutEffect(() => {
		if (hoursRef.current) {
			setTimeLineOffsetTop(getTimeLineOffsetTop());
		}
	}, [getTimeLineOffsetTop, hoursRef]);

	return {
		shouldShow: shouldShowTimeline,
		offsetTop: timeLineOffsetTop
	};
};

export default useTimeLine;