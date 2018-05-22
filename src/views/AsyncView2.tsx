import React, { Component } from 'react'
import { AsyncViewProps } from '@/stores/RouterStore'
import { Content } from '@/components/Layout'

import CommonAsyncTable from '@/components-public/Table/CommonAsyncTable'

export default class AsyncView2 extends Component<AsyncViewProps, any> {
	render() {
		const columns = [
			{ title: '名称', key: 'name' },
			{ title: '编号', key: 'number' },
			{ title: '联系人', key: 'contact' },
			{ title: '联系方式', key: 'contactWay' },
			{ title: '开业日期', key: 'openDate' },
		]

		return (
			<Content>
				<CommonAsyncTable
					columns={columns}
					pageSize={10}
					apiString="https://sscsapi.fongwell.com/api/stores"
				/>
			</Content>
		)
	}
}
