import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Typography } from 'antd';
import { GridType } from './index';

type GridProps = {
	type: GridType
}

const cellSizes = {
	width: '70px',
	height: '40px',
	headerHeight: '60px'
};

const columnsCount = (props: GridProps) => {
	const columns = props.type === 'week' ? 7 : 1;
	return css`
		grid-template-columns: repeat(${ columns }, 1fr);
	`;
};

export const Wrapper = styled.div`
	user-select: none;
`;

export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	border-bottom: 1px solid #ccc;
`;

export const HeaderEmptyCell = styled.div`
	width: ${ cellSizes.width };
	height: ${ cellSizes.headerHeight };
`;

export const HeaderDates = styled.div`
	display: grid;
	//grid-template-columns: repeat(7, 1fr);
	height: ${ cellSizes.headerHeight };
	flex: 1 1 0;
	${ columnsCount }
`;

export const HeaderCell = styled.div`
	width: 100%;
	height: 100%;
	border-left: 1px solid #ccc;
	padding: 8px 8px 8px 16px;
`;

export const HeaderCellWeekDay = styled(Typography.Text)``;

export const HeaderCellDate = styled(Typography.Title)`
	margin: 0 !important;
	line-height: 1 !important;
`;

export const Body = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`;

export const Hours = styled.div`
	width: ${ cellSizes.width };
`;

export const HourCell = styled.div`
	width: 100%;
	height: ${ cellSizes.height };
	position: relative;

	&::after {
		content: '';
		width: 7px;
		height: 1px;
		background-color: #ccc;
		position: absolute;
		bottom: 0;
		right: 0
	}
`;

export const HourCellText = styled(Typography.Text)`
	display: block;
	position: relative;
	top: 29px;
	text-align: right;
	padding-right: 15px;
`;

export const MainLayout = styled.div`
	flex: 1 1 0;
	border-left: 1px solid #ccc;
`;

export const MainRow = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	height: ${ cellSizes.height };
	border-bottom: 1px solid #ccc;

	&:last-child {
		border-bottom: none;
	}
`;

export const MainCell = styled.div`
	height: 100%;
`;