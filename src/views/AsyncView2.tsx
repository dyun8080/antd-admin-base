import React, { Component } from 'react'
import { AsyncViewProps } from '@/stores/RouterStore'
import { Button, Modal } from 'antd'
import modal, { WrappedComponentProps } from '@/hoc/modal'

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
		return (
			<HOCAddModal>
				<Button>HOCAddModal</Button>
			</HOCAddModal>
		)
	}
}
