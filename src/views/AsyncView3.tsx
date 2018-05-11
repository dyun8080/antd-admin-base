import React, { Component } from 'react'
import { Card, Button } from 'antd'
import style from './AsyncView3.less'
import ModalAsyncForm from '@/components-public/Form/ModalAsyncForm'

import { AsyncViewProps } from '@/stores/RouterStore'

export default class extends Component<AsyncViewProps, any> {
	render() {
		const fields = [
			{ label: '姓名', key: 'name', rules: { required: true } },
			{ label: '电子邮箱', key: 'sad', rules: { required: true, type: 'email' } },
			{ label: '手机号', key: 'asdasd', rules: { required: true, pattern: /^1\d{10}$/ } },
		]

		return (
			<Card bodyStyle={{ padding: 10, minHeight: 500 }} bordered={false}>
				test css-modules: <span className={style.red}>{this.props.title}</span>
				<ModalAsyncForm fields={fields} apiString="damao">
					<Button>addModal</Button>
				</ModalAsyncForm>
			</Card>
		)
	}
}
