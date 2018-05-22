import { History } from 'history'
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { RouteComponentProps } from 'react-router-dom'

import asyncComponent from '../hoc/asyncComponent'

export interface AssetRouteItem {
	url: string
	title: string
	Component: React.ComponentType<AsyncViewProps>
}

export interface AsyncViewProps extends RouteComponentProps<any>, RouteItemValues { }

export interface RouteItemValues {
	/** 用于侧边栏和面包屑导航 */
	title: string
	url: string
	Component: React.ComponentType<AsyncViewProps>
	/** 是否在侧边栏显示 */
	hide?: boolean
	iconType?: string
	children?: Array<RouteItemValues>
}

const AsyncView1 = asyncComponent(() => import('@/views/AsyncView1'))
const AsyncView2 = asyncComponent(() => import('@/views/AsyncView2'))
const AsyncView3 = asyncComponent(() => import('@/views/AsyncView3'))

export class RouterStore extends BaseRouterStore {
	static RouteList: Array<RouteItemValues> = [
		{
			title: 'AsyncView1',
			iconType: 'login',
			url: '/table',
			Component: AsyncView1,
			children: [
				{ title: 'AsyncView1', url: '/AsyncView1', Component: AsyncView1 },
				{ title: 'AsyncView2', url: '/AsyncView2', Component: AsyncView2 },
			],
		},
		{ title: 'AsyncView3', url: '/AsyncView3', Component: AsyncView3 },

		{ hide: true, title: '商品详情', url: '/AsyncView1/:id', Component: AsyncView1 },
	]

	static get assetRoutelist(): Array<AssetRouteItem> {
		const _assetRouteList = RouterStore.RouteList
			.filter(i => !i.children)
			.map(i => ({
				url: i.url,
				Component: i.Component,
				title: i.title,
			}))

		let childrenRouteList: Array<AssetRouteItem> = []

		RouterStore.RouteList.forEach(item => {
			if (item.children) {
				childrenRouteList = [
					...childrenRouteList,
					...item.children.map(i => ({
						url: i.url,
						Component: i.Component,
						title: i.title,
					})),
				]
			}
		})

		const result = [
			..._assetRouteList,
			...childrenRouteList,
		]

		return result
	}

	constructor(history?: History) {
		super()
		if (history) {
			this.history = syncHistoryWithStore(history, this)
		}
	}
}

export default RouterStore
