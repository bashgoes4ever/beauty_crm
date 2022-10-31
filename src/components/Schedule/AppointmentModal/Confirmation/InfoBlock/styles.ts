import styled from '@emotion/styled/macro';
import { Typography } from 'antd';
import { paddings } from '../../../../../styles/constants';

export const Title = styled(Typography.Title)`
	margin: 0 !important;
`;

export const Header = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;

	& > *:first-of-type {
		margin-right: calc(${ paddings.horizontal } / 2);
	}
`;

export const Wrapper = styled.div`
	margin-bottom: ${ paddings.vertical };
`;