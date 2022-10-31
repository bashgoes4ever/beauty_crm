import styled from '@emotion/styled/macro';
import { cellSizes, colors, paddings } from '../../../styles/constants';
import { Typography } from 'antd';
import { css } from '@emotion/react';

type Cell = {
	isCurrentMonth: boolean;
	isCurrentDay: boolean;
}

const cellStyles = ({ isCurrentMonth, isCurrentDay }: Cell) => css`
	background: ${ isCurrentMonth ? 'inherit' : colors.lightGray } !important;

	${ HeaderCellDate } {
		color: ${ isCurrentDay ? colors.current : 'inherit' }
	}
`;

export const Wrapper = styled.div`
	user-select: none;
	border: 1px solid ${ colors.gray };
	border-bottom: none;
`;

export const Header = styled.div`
	display: grid;
	height: ${ cellSizes.headerHeight };
	flex: 1 1 0;
	grid-template-columns: repeat(7, 1fr);
	border-bottom: 1px solid ${ colors.gray };
`;

export const HeaderCell = styled.div`
	width: 100%;
	height: 100%;
	padding: 8px 8px 8px 16px;
	display: flex;
	align-items: center;

	&:not(:first-of-type) {
		border-left: 1px solid ${ colors.gray };
	}
`;

export const HeaderCellDate = styled(Typography.Title)`
	margin: 0 !important;
	line-height: 1 !important;
`;

export const Body = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
`;

export const BodyCell = styled.div`
	height: ${ cellSizes.width };
	padding: 8px;
	transition: all .3s;
	cursor: pointer;
	position: relative;
	border-bottom: 1px solid ${ colors.gray };

	${ cellStyles }
	&:hover {
		opacity: .6;
	}

	&:not(:nth-of-type(7n + 1)) {
		border-left: 1px solid ${ colors.gray };
	}
`;

export const CellText = styled(Typography.Text)`
	display: block;
	margin-top: calc(${ paddings.vertical } / 2);
	color: ${ colors.darkGray };
`;