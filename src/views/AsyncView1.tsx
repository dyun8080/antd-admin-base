import React, { Component } from 'react'
import { AsyncViewProps } from '@/stores/RouterStore'
import CommonAsyncTable from '@/components-public/Table/CommonAsyncTable'

export default class AsyncView1 extends Component<AsyncViewProps, any> {
	render() {
		const columns = [
			{ title: '货品名称', key: 'name' },
			{ title: '货品编号', key: 'number' },
			{ title: '大类', key: 'bigStyle' },
			{ title: '小类', key: 'smallStyle' },
			{ title: '采购价', key: 'costPrice' },
			{ title: '零售价', key: 'price' },
			{ title: '日期', key: 'createdDate' },
		]

		return (
			<div style={{ backgroundColor: '#fff' }}>
				<CommonAsyncTable
					columns={columns}
					apiString="https://sscsapi.fongwell.com/api/skus"
				/>
			</div>
		)
	}
}
