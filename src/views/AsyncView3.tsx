import React, { Component } from 'react'
import { Card } from 'antd'
import style from './AsyncView3.less'

import { AsyncViewProps } from '@/stores/RouterStore'

export default class extends Component<AsyncViewProps, any> {
	render() {
		return (
			<Card bodyStyle={{ padding: 10, minHeight: 500 }} bordered={false}>
				test css-modules: <span className={style.red}>{this.props.title}</span>
			</Card>
		)
	}
}
