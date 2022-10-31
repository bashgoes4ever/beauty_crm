import styled from '@emotion/styled/macro';
import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';
import { Typography } from 'antd';
import { GridType } from './index';
import { cellSizes, colors } from '../../../styles/constants';

type GridProps = {
	type: GridType;
}

type HeaderCellProps = {
	isCurrent: boolean;
}

const columnsCount = ({ type }: GridProps) => {
	const columns = type === 'week' ? 7 : 1;
	return css`
		grid-template-columns: repeat(${ columns }, 1fr);
	`;
};

const currentDay = ({ isCurrent }: HeaderCellProps) => isCurrent && css`
	color: ${ colors.current } !important;
`;

export const Wrapper = styled.div`
	user-select: none;
`;

export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	border-bottom: 1px solid ${ colors.gray };
`;

export const HeaderEmptyCell = styled.div`
	width: ${ cellSizes.width };
	height: ${ cellSizes.headerHeight };
`;

export const HeaderDates = styled.div`
	display: grid;
	height: ${ cellSizes.headerHeight };
	flex: 1 1 0;
	${ columnsCount }
`;

export const HeaderCell = styled.div`
	width: 100%;
	height: 100%;
	border-left: 1px solid ${ colors.gray };
	padding: 8px 8px 8px 16px;
	cursor: pointer;
	transition: all .3s;

	&:hover {
		opacity: .6;
	}
`;

export const HeaderCellWeekDay = styled(Typography.Text,
	{ shouldForwardProp: prop => isPropValid(prop) || prop !== 'isCurrent' })`
	${ currentDay }
`;

export const HeaderCellDate = styled(Typography.Title,
	{
		shouldForwardProp: prop => isPropValid(prop) || prop !== 'isCurrent'
	})`
	margin: 0 !important;
	line-height: 1 !important;
	${ currentDay }
`;

export const Body = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	position: relative;
`;

export const Hours = styled.div`
	width: ${ cellSizes.width };
`;

export const HourCellText = styled(Typography.Text)`
	display: block;
	position: relative;
	top: -10px;
	text-align: right;
	padding-right: 15px;
`;

export const HourCell = styled.div`
	width: 100%;
	height: ${ cellSizes.height };
	position: relative;

	&::after {
		content: '';
		width: 7px;
		height: 1px;
		background-color: ${ colors.gray };
		position: absolute;
		top: -1px;
		right: 0
	}

	&:first-of-type {
		&::after {
			display: none;
		}

		${ HourCellText } {
			display: none;
		}
	}
`;

export const MainLayout = styled.div`
	flex: 1 1 0;
`;

export const MainRow = styled.div`
	display: grid;
	height: ${ cellSizes.height };

	${ columnsCount }
	&:not(:last-child) {
		border-bottom: 1px solid ${ colors.gray };
	}
`;

export const MainCell = styled.div`
	height: 100%;
	border-left: 1px solid ${ colors.gray };
	transition: all .3s;
	cursor: pointer;
	position: relative;

	&::after {
		content: '+';
		color: ${ colors.lightGray };
		font-size: 24px;
		font-weight: 600;
		opacity: 0;
		position: absolute;
		top: calc(50% - 2px);
		left: 50%;
		transform: translate(-50%, -50%);
	}

	&:hover {
		background-color: #f8f8f8;

		&::after {
			opacity: 1;
		}
	}
`;