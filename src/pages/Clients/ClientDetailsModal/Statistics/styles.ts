import styled from '@emotion/styled/macro';
import { paddings } from '../../../../styles/constants';
import { Form } from 'antd';

export const TotalsWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: start;
	margin-bottom: calc(${ paddings.vertical } * 2);

	& > *:not(:last-child) {
		margin-right: calc(${ paddings.horizontal } * 2);
	}
`;

export const TotalSuffix = styled.span`
	font-size: .6em;
`;

export const ControlsWrapper = styled(Form)`
	display: flex;
	justify-content: flex-start;
	align-items: start;

	& > *:not(:last-child) {
		margin-right: ${ paddings.horizontal };
	}
`;