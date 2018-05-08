import { History } from 'history'
import { computed } from 'mobx'
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { RouteComponentProps } from 'react-router-dom'

import asyncComponent from '../hoc/asyncComponent'

export interface AsyncViewProps extends RouteComponentProps<any>, RouteItemValues { }

export interface RouteItemValues {
	/** 是否在侧边栏显示 */
	hide?: boolean
	/** 用于侧边栏和面包屑导航 */
	title: string
	url: string
	Component: React.ComponentType<AsyncViewProps>
}

const AsyncView1 = asyncComponent(() => import('../views/AsyncView1'))
const AsyncView2 = asyncComponent(() => import('../views/AsyncView2'))


export class RouterStore extends BaseRouterStore {
	static RouteList: Array<RouteItemValues> = [
		{ title: '商品列表', url: '/AsyncView1', Component: AsyncView1 },
		{ title: 'AsyncView2', url: '/AsyncView2', Component: AsyncView2 },
		{ hide: true, title: '商品详情', url: '/AsyncView1/:id', Component: AsyncView1 },

	]

	constructor(history?: History) {
		super()
		if (history) {
			this.history = syncHistoryWithStore(history, this)
		}
	}

	@computed get menuList() {
		return this.location && this.location.pathname
	}
}

export default RouterStore
