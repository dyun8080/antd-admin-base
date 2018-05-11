import React, { Component } from 'react'
import { Modal } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'

import FormWrap, { FormWrapProps, FieldsItem } from './FormWrap'
import modal, { WrappedComponentProps } from '@/hoc/modal'

export interface ModalAsyncFormProps extends FormWrapProps, WrappedComponentProps {
	/** 请求后端的接口 */
	apiString: string
	title?: string
}

class ModalContent extends Component<ModalAsyncFormProps, any> {
	form: WrappedFormUtils

	static defaultProps = {
		title: '新增',
		fields: [
			{ label: 'label', key: 'name' },
		] as Array<FieldsItem>,
	}

	handleOk = () => {
		this.form.validateFields((err, values) => {
			if (!err) {
				// clg
				console.log('Received values of form: ', values)

				this.props.asyncConfirm(async () => {
					/** test ===> PASS  2018-5-11 11:34:24 */
					const res = new Promise((resolve) => {
						setTimeout(() => {
							resolve()
						}, 2000)
					})
					await res
				}, () => {
					// 添加成功后清空表单
					this.form.resetFields()
				})
			}
		})
	}

	render() {
		return (
			<Modal
				visible={this.props.visible}
				title={this.props.title}
				onCancel={() => this.props.handleCancel()}
				onOk={() => this.handleOk()}
				confirmLoading={this.props.confirmLoading}
			>
				<FormWrap ref={(element: any) => this.form = element} fields={this.props.fields} />
			</Modal>
		)
	}
}

const HOCModalContent = modal(ModalContent)

export default HOCModalContent
