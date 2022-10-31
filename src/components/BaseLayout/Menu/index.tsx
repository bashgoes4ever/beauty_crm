import React, { useContext, useMemo } from 'react';
import { Menu as AntdMenu } from 'antd';
import { observer } from 'mobx-react-lite';
import { NavLink, useLocation } from 'react-router-dom';
import { routes } from '../../../routes';
import { StoreContext } from '../../../store/context';
import _ from 'lodash';

const Menu: React.FC = () => {
	const { user: { isAuthorized } } = useContext(StoreContext);
	const location = useLocation();

	const menuItems = useMemo(() =>
			routes.filter(({ shouldHideIfAuthorized, shouldBeAuthorized }) => isAuthorized === !shouldHideIfAuthorized ||
				isAuthorized === shouldBeAuthorized)
				.map(({ path, label, icon: Icon, children, key }) =>
					children && children.length > 0 ? (
						<AntdMenu.SubMenu key={ key } icon={ Icon && <Icon /> } title={ label }>
							{
								_.map(children, ({ path, label, icon: Icon, key }) => (
									<AntdMenu.Item key={ path } icon={ Icon && <Icon /> }>
										<NavLink to={ path }>{ label }</NavLink>
									</AntdMenu.Item>
								))
							}
						</AntdMenu.SubMenu>
					) : (
						<AntdMenu.Item key={ path } icon={ Icon && <Icon /> }>
							<NavLink to={ path }>{ label }</NavLink>
						</AntdMenu.Item>
					)),
		[isAuthorized]);

	return (
		<AntdMenu theme="dark" selectedKeys={ [location.pathname] } mode="inline">
			{ menuItems }
		</AntdMenu>
	);
};

export default observer(Menu);