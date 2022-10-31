import styled from '@emotion/styled/macro';
import { paddings } from '../../../../styles/constants';
import { Typography } from 'antd';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;

export const ButtonsWrapper = styled(Wrapper)`
	& > button:not(:last-child) {
		margin-right: ${ paddings.horizontal };
	}
`;

export const DateTitle = styled(Typography.Title)``;