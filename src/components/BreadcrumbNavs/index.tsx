import React from 'react'
import { Breadcrumb } from 'antd'
import { Link, RouteComponentProps } from 'react-router-dom'
import { RouterStore } from '@/stores'

export default (props: RouteComponentProps<any>) => {
	const { path } = props.match
	const breadcrumbNameMap = {} as Object

	RouterStore.assetRoutelist.forEach(item => {
		breadcrumbNameMap[item.url] = item.title
	})

	const pathSnippets = path.split('/').filter(i => i)

	const extraBreadcrumbItems = pathSnippets.map((_, index, arr) => {
		const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
		const node = index === arr.length - 1 ? breadcrumbNameMap[url] : <Link to={url}>{breadcrumbNameMap[url]}</Link>

		return (
			<Breadcrumb.Item key={url}>
				{node}
			</Breadcrumb.Item>
		)
	})

	const breadcrumbItems = [
		<Breadcrumb.Item key="home">首页</Breadcrumb.Item>,
		...extraBreadcrumbItems,
	]

	return (
		<Breadcrumb style={{ margin: '16px 0' }}>
			{breadcrumbItems}
		</Breadcrumb>
	)
}
