import React, { Component } from 'react'
import { AsyncViewProps } from '@/stores/RouterStore'
import { Button, Modal } from 'antd'
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

export default class AsyncView2 extends Component<AsyncViewProps, any> {
	render() {
		return (
			<div>
				<HOCAddModal>
					<Button>HOCAddModal</Button>
				</HOCAddModal>
				AsyncView22
			</div>
		)
	}
}
