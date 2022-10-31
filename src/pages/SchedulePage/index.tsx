import * as React from 'react';
import Schedule from '../../components/Schedule';
import { Typography } from 'antd';

const SchedulePage: React.FC = () => {
	return (
		<>
			<Typography.Title>Расписание</Typography.Title>
			<Schedule />
		</>
	);
};

export default SchedulePage;