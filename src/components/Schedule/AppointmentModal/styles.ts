import styled from '@emotion/styled/macro';

export const FooterWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const MainBtnsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;

	//& > *:not(:last-child) {
	//	margin-right: 1px;
	//}
`;