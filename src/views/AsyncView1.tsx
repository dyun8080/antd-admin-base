import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { AsyncViewProps } from '@/stores/RouterStore'
import CommonAsyncTable from '@/components-public/Table/CommonAsyncTable'
import modal, { WrappedComponentProps } from '@/hoc/modal'

class AddModal extends Component<WrappedComponentProps, any> {
	handleOk = () => {
		return new Promise(((_, reject) => {
			setTimeout(() => {
				reject('xixixi')
			}, 2000)
		}))
	}


	render() {
		return (
			<Modal
				visible={this.props.visible}
				onCancel={() => this.props.handleCancel()}
				onOk={() => this.props.asyncConfirm(this.handleOk)}
				confirmLoading={this.props.confirmLoading}
			>
				<div>
					<p>asadasd</p>
				</div>
			</Modal>
		)
	}
}
const HOCAddModal = modal(AddModal)


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
			<div style={{ backgroundColor: '#fff', padding: 10 }}>
				<HOCAddModal>
					<Button type="primary">新建商品</Button>
				</HOCAddModal>
				<CommonAsyncTable
					columns={columns}
					apiString="https://sscsapi.fongwell.com/api/skus"
				/>
			</div>
		)
	}
}
