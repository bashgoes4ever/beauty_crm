import styled from '@emotion/styled/macro';
import { Radio } from 'antd';
import { paddings } from '../../../../styles/constants';

export const RadioGroup = styled(Radio.Group)`
	display: flex;
	justify-content: space-between;
	margin-bottom: ${ paddings.vertical };
`;

export const RadioButton = styled(Radio.Button)`
	width: 50%;
	text-align: center;
`;