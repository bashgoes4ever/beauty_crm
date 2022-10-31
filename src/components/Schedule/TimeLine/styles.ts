import styled from '@emotion/styled/macro';
import { cellSizes, colors } from '../../../styles/constants';
import { css } from '@emotion/react';

type TimeLineProps = {
	top: number;
}

const timeLineTop = ({ top }: TimeLineProps) => css`
	top: ${ top }px;
`;

export const TimeLine = styled.div`
	position: absolute;
	left: ${ cellSizes.width };
	height: 1px;
	width: calc(100% - ${ cellSizes.width });
	background-color: ${ colors.current };

	${ timeLineTop }
	&::before {
		content: '';
		width: 7px;
		height: 7px;
		background-color: ${ colors.current };
		position: absolute;
		top: 50%;
		left: -5px;
		transform: translateY(-50%);
		clip-path: polygon(0 0, 0% 100%, 100% 50%);
	}
`;