import styled from '@emotion/styled/macro';
import { colors } from '../../styles/constants';
import { Typography } from 'antd';

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const Text = styled(Typography.Text)`
	color: ${ colors.gray };
`;

export const Spinner = styled.div`
	display: inline-block;
	position: relative;
	width: 20px;
	height: 20px;
	margin-right: 8px;

	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 16px;
		height: 16px;
		margin: 2px;
		border: 2px solid ${ colors.gray };
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: ${ colors.gray } transparent transparent transparent;

		&:nth-of-type(1) {
			animation-delay: -0.45s;
		}

		&:nth-of-type(2) {
			animation-delay: -0.3s;
		}

		&:nth-of-type(3) {
			animation-delay: -0.15s;
		}
	}
`;