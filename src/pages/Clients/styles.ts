import styled from '@emotion/styled/macro';
import { paddings } from '../../styles/constants';

export const ToolbarWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	padding: ${ paddings.vertical } 0px;
	position: sticky;
	top: 0;
	background-color: #fff;
	z-index: 3;
`;