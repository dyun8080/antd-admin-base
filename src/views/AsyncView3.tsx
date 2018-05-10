import React, { Component } from 'react'
import { Card } from 'antd'
import style from './AsyncView3.less'

import { AsyncViewProps } from '@/stores/RouterStore'

console.log(style)

export default class extends Component<AsyncViewProps, any> {
	render() {
		return (
			<Card bodyStyle={{ padding: 10, minHeight: 500 }} bordered={false}>
				<div className={style.red}>
					{this.props.title}
				</div>
			</Card>
		)
	}
}
