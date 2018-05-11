import React, { Component } from 'react'
import { Form, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form'
import presetsType from './presetsType'

const FormItem = Form.Item

export interface FieldsItem {
	label: string
	/** 与getFieldDecorator绑定的id */
	key: string
	required?: boolean
	rules?: Array<any>,
	rulesType?: string
	/** render的控件，默认为Input */
	node?: React.ReactElement<any>
}

export interface FormWrapProps extends FormComponentProps {
	formItemLayout?: any
	fields: Array<FieldsItem>
}

class FormWrap extends Component<FormWrapProps, any> {
	static defaultProps = {
		formItemLayout: {
			labelCol: { span: 7 },
			wrapperCol: { span: 12 },
		},
	}

	getRules = (record: FieldsItem) => {
		let rules: Array<any> = []

		// check presetsType
		if (!!record.rulesType && (record.rulesType in presetsType)) {
			const { rulesType } = record
			rules.push(presetsType[rulesType])
		}

		if (!!record.required) {
			rules.push({ message: `请输入${record.label}!`, required: record.required })
		}

		if (record.rules) {
			rules = [
				...record.rules,
				...rules,
			]
		}

		return rules
	}


	render() {
		const { getFieldDecorator } = this.props.form
		const { fields, formItemLayout } = this.props

		const fieldNode = fields.map(item => {
			const { label, key, node } = item

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
					{getFieldDecorator(key, { rules: this.getRules(item) } as GetFieldDecoratorOptions)(formItemNode)}
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
