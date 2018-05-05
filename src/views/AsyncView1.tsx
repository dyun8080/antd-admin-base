import React, { Component } from 'react'

import { AsyncViewProps } from '@/stores/RouterStore'
import BaseTable from '@/components-public/Table/BaseTable'

export default class AsyncView1 extends Component<AsyncViewProps, any> {
	render() {
		const columns = [
			{
				title: '姓名', key: 'name', filters: [
					{ text: 'Joe', value: 'Joe' },
					{ text: 'Jim', value: 'Jim' },
				],
			},
			{ title: '年级', key: 'age' },
			{ title: '班级', key: 'cls' },
			{ title: '性别', key: 'sex' },
		]

		return (
			<div style={{ height: 2000 }}>
				<BaseTable
					columns={columns}
					dataSource={[
						{ name: 'damao', id: 1, age: 25, cls: '奥术大师多撒', sex: '男' },
						{ name: 'damao', id: 2, age: 25, cls: '奥术大师多', sex: '男' },
						{ name: 'damao', id: 3, age: 25, cls: '奥术大师多', sex: '男' },
						{ name: 'damao', id: 4, age: 25, cls: '奥术大师多', sex: '男' },
					]} />
			</div>
		)
	}
}
