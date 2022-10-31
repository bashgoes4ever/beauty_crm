import styled from '@emotion/styled/macro';
import { paddings } from '../../../styles/constants';
import { Tabs } from 'antd';

export const TabsWrapper = styled(Tabs)`
	width: 100%;
	min-height: 300px;
`;

export const TabContent = styled(Tabs.TabPane)`
	width: 100%;
	padding: ${ paddings.horizontal };
`;