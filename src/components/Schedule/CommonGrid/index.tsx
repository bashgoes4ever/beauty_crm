import React from 'react';
import {
	Body,
	Header,
	HeaderCell,
	HeaderCellDate,
	HeaderCellWeekDay,
	HeaderDates,
	HeaderEmptyCell,
	HourCell,
	HourCellText,
	Hours,
	MainCell,
	MainLayout,
	MainRow,
	Wrapper
} from './styles';

export type GridType = 'week' | 'day'

const DayView: React.FC = () => {
	return (
		<Wrapper>
			<Header>
				<HeaderEmptyCell />
				<HeaderDates type="day">
					<HeaderCell>
						<HeaderCellWeekDay>Суббота</HeaderCellWeekDay>
						<HeaderCellDate level={ 3 }>20</HeaderCellDate>
					</HeaderCell>
					<HeaderCell>
						<HeaderCellWeekDay>Воскресенье</HeaderCellWeekDay>
						<HeaderCellDate level={ 3 }>21</HeaderCellDate>
					</HeaderCell>
				</HeaderDates>
			</Header>
			<Body>
				<Hours>
					<HourCell>
						<HourCellText>10:00</HourCellText>
					</HourCell>
					<HourCell>
						<HourCellText>10:30</HourCellText>
					</HourCell>
					<HourCell>
						<HourCellText>11:00</HourCellText>
					</HourCell>
					<HourCell>
						<HourCellText>11:30</HourCellText>
					</HourCell>
					<HourCell>
						<HourCellText>12:00</HourCellText>
					</HourCell>
				</Hours>
				<MainLayout>
					<MainRow><MainCell /></MainRow>
					<MainRow><MainCell /></MainRow>
					<MainRow><MainCell /></MainRow>
					<MainRow><MainCell /></MainRow>
					<MainRow><MainCell /></MainRow>
					<MainRow />
				</MainLayout>
			</Body>
		</Wrapper>
	);
};

export default DayView;