import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';
import { colors, paddings } from '../../styles/constants';

type StepProps = {
	isActive: boolean;
}

const isStepActive = ({ isActive }: StepProps) => css`
	background-color: ${ isActive ? colors.current : colors.lightGray };

	&::before {
		background-color: ${ isActive ? colors.current : 'transparent' };
	}
`;

export const Wrapper = styled.div`
	width: 100%;
	overflow: hidden;
	height: 10px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: ${ paddings.vertical };
`;

export const Line = styled.div`
	width: 100%;
	height: 2px;
	border-radius: 4px;
	background-color: ${ colors.lightGray };
	display: flex;
	justify-content: space-between;
	padding: 0 10%;
`;

export const Step = styled.div`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	position: relative;
	top: -3px;

	${ isStepActive }
	&::before {
		content: '';
		width: 500px;
		height: 2px;
		position: absolute;
		top: 3px;
		right: 2px;
	}
`;