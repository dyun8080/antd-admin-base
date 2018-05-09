import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Route, Switch, Link, RouteComponentProps } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { STORE_ROUTER } from './constants/stores'
import { RouterStore } from './stores'
import BreadcrumbNavs from './components/BreadcrumbNavs'

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

@inject(STORE_ROUTER)
@observer
class SiderDemo extends React.Component<RouteComponentProps<any>, any> {
	routerStore = this.props[STORE_ROUTER] as RouterStore

	state = {
		collapsed: false,
	}

	componentWillMount() {
		const { innerWidth } = window

		if (innerWidth < 1420) {
			this.setState({
				collapsed: true,
			})
		}
	}

	onCollapse = (collapsed) => {
		this.setState({ collapsed })
	}

	render() {
		const { pathname } = this.props.location

		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					collapsible
					width={180}
					collapsed={this.state.collapsed}
					onCollapse={this.onCollapse}
				>
					<div className="logo" />
					<Menu
						theme="dark"
						selectedKeys={[pathname]}
						mode="inline">
						{RouterStore.RouteList.filter(i => !i.hide).map(item => {
							if (item.children) {
								return (
									<SubMenu
										key={item.title}
										title={<span><Icon type={item.iconType || 'pie-chart'} /><span>{item.title}</span></span>}
									>
										{item.children.map(i => (
											<Menu.Item key={i.url}>
												<Link to={i.url}>
													<span>{i.title}</span>
												</Link>
											</Menu.Item>
										))}
									</SubMenu>
								)
							}

							return (
								<Menu.Item key={item.url}>
									<Link to={item.url}>
										<Icon type={item.iconType || 'pie-chart'} /><span>{item.title}</span>
									</Link>
								</Menu.Item>
							)
						})}
					</Menu>
				</Sider>

				<Layout>
					<Header style={{ backgroundColor: '#fff' }} >
						ant-design-admin
					</Header>
					<Content style={{ margin: '0 16px' }}>
						<Switch>
							{RouterStore.assetRoutelist.map(item => {
								return <Route exact path={item.url} key={item.title} render={props => {
									const { Component } = item
									return (
										<React.Fragment>
											<BreadcrumbNavs {...props} />
											<Component {...item} {...props} />
										</React.Fragment>
									)
								}} />
							})}
						</Switch>
					</Content>

					<Footer style={{ textAlign: 'center' }}>
						Ant Design ©2018 Created by Fongwell
          </Footer>

				</Layout>

			</Layout>
		)
	}
}

export default SiderDemo
