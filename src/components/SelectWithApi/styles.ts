import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';

type ColoredBoxProps = {
	color: string
}

const withColor = ({ color }: ColoredBoxProps) => css`
	background-color: ${ color };
`;

export const ColoredBox = styled.span`
	width: 100%;
	height: 70%;
	display: block;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	${ withColor }
`;