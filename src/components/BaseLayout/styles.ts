import styled from '@emotion/styled';
import { Layout as AntdLayout, Typography } from 'antd';
import { colors } from '../../styles/constants';

export const Layout = styled(AntdLayout)`
	min-height: 100vh;
`;

export const Content = styled(AntdLayout.Content)`
	margin: 16px 16px 0 16px;
	background-color: #fff;
	flex: 1 1 0;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-track {
		background-color: #e9e9e9;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${ colors.gray };
	}
`;

export const Footer = styled(AntdLayout.Footer)`
	text-align: center;
`;

export const SideMenu = AntdLayout.Sider;

export const ContentWrapper = styled.div`
	padding: 24px;
	min-height: 360px;
	background-color: #fff;
`;

export const Logo = styled(Typography.Title)`
	margin: 16px 16px 16px 24px;
	color: #fff !important;
`;