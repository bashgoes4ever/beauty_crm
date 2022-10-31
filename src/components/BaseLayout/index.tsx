import { Layout as MainSection } from 'antd';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { Content, ContentWrapper, Footer, Layout, Logo, SideMenu } from './styles';
import { TitleProps } from 'antd/es/typography/Title';
import Menu from './Menu';
import ModalsPortal from './ModalsPortal';

type Props = {
	children: ReactNode
}

type LogoProps = {
	level: TitleProps['level'];
	title: string;
}

const BaseLayout: React.FC<Props> = ({ children }) => {
	const [isMenuCollapsed, setIsMenuCollapsed] = useState<boolean>(false);

	const onCollapse = useCallback((value: boolean): void => {
		setIsMenuCollapsed(value);
	}, []);

	const { level, title }: LogoProps = useMemo(() => ({
		level: isMenuCollapsed ? 3 : 2,
		title: isMenuCollapsed ? 'BIS' : 'BIS CRM'
	}), [isMenuCollapsed]);

	return (
		<Layout>
			<SideMenu
				collapsible
				collapsed={ isMenuCollapsed }
				onCollapse={ onCollapse }
				breakpoint="lg"
			>
				<Logo italic level={ level }>{ title }</Logo>
				<Menu />
			</SideMenu>
			<MainSection>
				<Content>
					<ContentWrapper>
						{ children }
					</ContentWrapper>
				</Content>
				<Footer>B.I.S. (Beauty Industry Specialist) CRM ©2022 Created by Bash</Footer>
			</MainSection>
			
			<ModalsPortal />
		</Layout>
	);
};

export default BaseLayout;