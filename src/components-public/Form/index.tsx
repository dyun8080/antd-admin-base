import React, { Component } from 'react'
import { Form, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form'

const FormItem = Form.Item

interface FieldsItem {
	label: string
	key: string
	rules?: any,
	node?: React.ReactElement<any>
}

interface Props extends FormComponentProps {
	formItemLayout?: any
	fields: Array<FieldsItem>
}

class FormWrap extends Component<Props, any> {
	static defaultProps = {
		formItemLayout: {
			labelCol: { span: 7 },
			wrapperCol: { span: 12 },
		},
	}

	render() {
		const { getFieldDecorator } = this.props.form
		const { fields, formItemLayout } = this.props

		const fieldNode = fields.map(item => {
			const { label, rules, key, node, ...rest } = item

			// const getPopupContainer = getWrap ? {
			// 	getPopupContainer: () => this.refs.wrap,
			// } : {}

			// const getCalendarContainer_ = getCalendarContainer ? {
			// 	getCalendarContainer: () => this.refs.wrap,
			// } : {}

			const placeholder = `请输入${label}`
			const formItemNode = node
				// ? React.cloneElement(item.node, { placeholder, style: { width: '100%' }, ...getPopupContainer, ...getCalendarContainer_ })
				? React.cloneElement(node, { placeholder, style: { width: '100%' } })
				: React.cloneElement(<Input />, { placeholder, style: { width: '100%' } })

			return (
				<FormItem
					key={key}
					label={label}
					{...formItemLayout}
				>
					{getFieldDecorator(key, {
						rules: rules ? [{ message: `请输入${label}!`, ...rules }] : [],
						...rest,
					} as GetFieldDecoratorOptions)
						(formItemNode)
					}
				</FormItem>
			)
		})

		return (
			<div ref="wrap">
				<Form>
					{fieldNode}
				</Form>
			</div>
		)
	}
}

export default Form.create()(FormWrap)
