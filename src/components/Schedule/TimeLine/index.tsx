import React, { RefObject } from 'react';
import { TimeLine as Component } from './styles';
import useTimeLine from './useTimeLine';
import { observer } from 'mobx-react-lite';

type Props = {
	hoursRef: RefObject<HTMLDivElement>;

	timeFrom: string;

	timeTo: string;
}

const TimeLine: React.FC<Props> = ({ hoursRef, timeFrom, timeTo }) => {
	const { shouldShow, offsetTop } = useTimeLine({ hoursRef, timeFrom, timeTo });

	if (!shouldShow) {
		return null;
	}

	return <Component top={ offsetTop } />;
};

export default observer(TimeLine);