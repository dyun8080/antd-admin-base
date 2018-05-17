import '@/utils'
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { createHashHistory } from 'history'

import Layout from './Layout'
import { createStores } from './stores'

import 'ant-design-pro/dist/ant-design-pro.less'
import '../assets/styles/layout.less'
import '../assets/styles/flex.less'
import '../assets/styles/classes.less'
import '../assets/styles/custom.less'

const RouterContainer = withRouter(props => <Layout {...props} />)

const history = createHashHistory()
const rootStore = createStores(history)



ReactDOM.render(
	<LocaleProvider locale={zhCN}>
		<Provider {...rootStore}>
			<Router>
				<RouterContainer />
			</Router>
		</Provider>
	</LocaleProvider>,
	document.getElementById('root') as HTMLElement,
)


const data1 = [
	{ 'id': 1, 'url': '1111' },
	{ 'id': 2, 'url': '111' },
	{ 'id': 3, 'url': '22222' },
	{ 'id': 4, 'url': '222' },
	{ 'id': 5, 'url': '2222' },
	{ 'id': 6, 'url': '22222是' },
]
const data2 = [
	{ 'id': 1, 'remark': '备注1' },
	{ 'id': 2, 'remark': '备注2' },
	{ 'id': 3, 'remark': '' },
	{ 'id': 4, 'remark': '' },
	{ 'id': 5, 'remark': '' },
	{ 'id': 6, 'remark': 'beizhu6' },
]

const data3 = data1.map(i => ({ ...i, ...data2.map(o => ({ id: o.id, remark: o.remark })).find(o => o.id === i.id) }))

console.log(data3)
