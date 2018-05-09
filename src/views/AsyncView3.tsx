import React, { Component } from 'react'
import { Card } from 'antd'

import { AsyncViewProps } from '@/stores/RouterStore'

export default class extends Component<AsyncViewProps, any> {
	render() {
		return (
			<Card bodyStyle={{ padding: 10, minHeight: 500 }} bordered={false}>
				{this.props.title}
			</Card>
		)
	}
}
