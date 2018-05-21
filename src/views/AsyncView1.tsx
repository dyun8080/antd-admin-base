import React, { Component } from 'react'
import { Button } from 'antd'

import { AsyncViewProps } from '@/stores/RouterStore'
import CommonAsyncTable from '@/components-public/Table/CommonAsyncTable'
import ModalAsyncForm from '@/components-public/Form/ModalAsyncForm'
import { Content } from '@/components/Layout'

export default class AsyncView1 extends Component<AsyncViewProps, any> {
	render() {
		const fields = [
			{ label: '姓名', key: 'name', required: true },
			{ label: '电子邮箱', key: 'sad', required: true },
			{ label: '手机号', key: 'asdasd' },
		]
		const columns = [
			{ title: '货品名称', key: 'name' },
			{ title: '货品编号', key: 'number' },
			{ title: '大类', key: 'bigStyle' },
			{ title: '小类', key: 'smallStyle' },
			{ title: '品牌', key: 'brand' },
			{ title: '采购价', key: 'costPrice' },
			{ title: '零售价', key: 'price' },
			{ title: '日期', key: 'createdDate' },
		]

		return (
			<Content>
				<ModalAsyncForm fields={fields}>
					<Button icon="plus" type="primary">新建商品</Button>
				</ModalAsyncForm>
				<CommonAsyncTable
					columns={columns}
					pageSize={15}
					apiString="https://sscsapi.fongwell.com/api/skus"
				/>
			</Content>
		)
	}
}
