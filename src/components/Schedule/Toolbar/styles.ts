import styled from '@emotion/styled/macro';
import { paddings } from '../../../styles/constants';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: ${ paddings.vertical } 0px;
	position: sticky;
	top: 0;
	background-color: #fff;
	z-index: 3;
`;

export const Inputs = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	& > div {
		margin-bottom: 0;
	}

	& > div:not(:last-child) {
		margin-right: calc(3 * ${ paddings.horizontal });
	}
`;