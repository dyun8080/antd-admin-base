import React, { Component } from 'react'
import { Button, Input, Modal } from 'antd'

import style from './AsyncView3.less'
import ModalAsyncForm from '@/components-public/Form/ModalAsyncForm'
import { Content } from '@/components/Layout'
import modal, { WrappedComponentProps } from '@/hoc/modal'
import { AsyncViewProps } from '@/stores/RouterStore'

class BasicModal extends Component<WrappedComponentProps, any> {
	render() {
		return (
			<Modal
				visible={this.props.visible}
				confirmLoading
				onCancel={() => { this.props.handleCancel() }}
				onOk={() => { this.props.asyncConfirm() }}
			>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		)
	}
}
const HOCBasicModal = modal(BasicModal)

export default class extends Component<AsyncViewProps, any> {
	render() {
		const fields = [
			{ label: '姓名', key: 'name', required: true },
			{ label: '电子邮箱', key: 'sad', required: true },
			{ label: '手机号', key: 'asdasd', required: true, rulesType: 'phone' },
			{
				label: '备注消息',
				key: 'people',
				node: (
					<Input.TextArea rows={4} />
				),
			},
		]

		return (
			<Content>
				test css-modules: <span className={style.red}>{this.props.title}</span>
				<HOCBasicModal>
					<Button>HOCBasicModal</Button>
				</HOCBasicModal>
				<ModalAsyncForm fields={fields} apiString="damao">
					<Button>ModalAsyncForm</Button>
				</ModalAsyncForm>
			</Content>
		)
	}
}
