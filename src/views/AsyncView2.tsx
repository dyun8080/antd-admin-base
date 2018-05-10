import React, { Component } from 'react'
import { AsyncViewProps } from '@/stores/RouterStore'
import { Button, Modal, Card } from 'antd'
import modal, { WrappedComponentProps } from '@/hoc/modal'
import CommonAsyncTable from '@/components-public/Table/CommonAsyncTable'

class AddModal extends Component<WrappedComponentProps, any> {
	render() {
		return (
			<Modal
				visible={this.props.visible}
				onCancel={() => this.props.handleCancel()}
				onOk={() => this.props.asyncConfirm()}
				confirmLoading={this.props.confirmLoading}
				title="Modal"
			>
				<p>
					HOCAddModal
				</p>
			</Modal>
		)
	}
}

const HOCAddModal = modal(AddModal)

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
			<Card bodyStyle={{ padding: 10 }} bordered={false}>
				<HOCAddModal>
					<Button>HOCAddModal11</Button>
				</HOCAddModal>
				<CommonAsyncTable
					columns={columns}
					pageSize={10}
					apiString="https://sscsapi.fongwell.com/api/stores"
				/>
			</Card>
		)
	}
}
