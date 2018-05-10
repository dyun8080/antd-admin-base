import React, { Component } from 'react'
import { Button, Modal, Card } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'

import { AsyncViewProps } from '@/stores/RouterStore'
import CommonAsyncTable from '@/components-public/Table/CommonAsyncTable'
import CusForm from '@/components-public/Form'
import modal, { WrappedComponentProps } from '@/hoc/modal'

// const TabPane = Tabs.TabPane

class AddModal extends Component<WrappedComponentProps, any> {
	form: WrappedFormUtils

	handleOk = () => {
		this.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)
				this.props.asyncConfirm(async () => {
					const res = new Promise(resolve => {
						setTimeout(() => {
							resolve()
						}, 2000)
					})
					await res
				}, () => {
					this.form.resetFields()
				})
			}
		})
	}

	render() {
		const fields = [
			{ label: '姓名', key: 'name', rules: { required: true } },
			{ label: '电子邮箱', key: 'sad', rules: { required: true, type: 'email' } },
			{ label: '手机号', key: 'asdasd', rules: { required: true, pattern: /^1\d{10}$/ } },
		]

		return (
			<Modal
				visible={this.props.visible}
				onCancel={() => this.props.handleCancel()}
				title="新建商品"
				onOk={() => this.handleOk()}
				confirmLoading={this.props.confirmLoading}
			>
				{/* <Tabs defaultActiveKey="1">
					<TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
					<TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
					<TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
				</Tabs> */}
				<CusForm ref={(ele: any) => this.form = ele} fields={fields} />
			</Modal>
		)
	}
}
const HOCAddModal = modal(AddModal)

export { HOCAddModal }


export default class AsyncView1 extends Component<AsyncViewProps, any> {
	render() {
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
			<Card bodyStyle={{ padding: 10 }} bordered={false}>
				<HOCAddModal>
					<Button icon="plus" type="primary">新建商品1</Button>
				</HOCAddModal>
				<CommonAsyncTable
					columns={columns}
					pageSize={10}
					apiString="https://sscsapi.fongwell.com/api/skus"
				/>
			</Card>
		)
	}
}
