import React from 'react'
import { Card } from 'antd'

export default ({ children }) => (
	<Card bodyStyle={{ padding: 10 }} bordered={false}>
		{children}
	</Card>
)
