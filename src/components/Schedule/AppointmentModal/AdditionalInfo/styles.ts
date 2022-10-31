import styled from '@emotion/styled/macro';
import { Radio } from 'antd';
import { paddings } from '../../../../styles/constants';

export const RadioWrapper = styled.div`
	height: 80px;
	position: relative;
	margin-bottom: ${ paddings.vertical };
`;

export const RadioGroup = styled(Radio.Group)`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: calc(${ paddings.horizontal } / 2);
`;