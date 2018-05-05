import React, { Component } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table'
import { getXSrcoll, computeColumns, computeDataSource } from './utils'

import { getAssetParams } from '@/utils'

interface Props extends TableProps<any> {
	columns: Array<any>,
	dataSource: Array<any>,
}

const size = 2

export default class BaseTable extends Component<Props, any> {
	columns: any
	query: any


	static defaultProps = {
		// columns: [{ title: '姓名', key: 'name' }],
		// dataSource: [],
	}

	constructor(props) {
		super(props)

		// init query
		this.query = {
			size,
		}

		this.state = {
			selectedRowKeys: [],
			current: 1,
		}
	}

	onChange = (pagination, filters) => {
		const { current } = pagination


		this.setState({
			current,
		}, () => {

			this.query = {
				...this.query,
				...filters,
				current: this.state.current,
			}

			this.getData()
		})
	}

	getData = () => {
		const query = getAssetParams(this.query)

		console.log(query)
	}

	onSelectChange = (selectedRowKeys) => {
		this.setState({ selectedRowKeys })
	}


	render() {
		const { dataSource, columns, ...rest } = this.props
		const { selectedRowKeys, current } = this.state

		console.log(current)

		const dataSourceWorked = computeDataSource(dataSource)
		const columnsWorked = computeColumns(columns)

		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		}

		return (
			<div style={{ backgroundColor: '#fff' }}>
				<Table
					dataSource={dataSourceWorked}
					columns={columnsWorked}
					size="middle"
					pagination={{ pageSize: this.query.size, current }}
					scroll={{ x: getXSrcoll(columnsWorked) }}
					onChange={this.onChange}
					rowSelection={rowSelection}

					{...rest}
				/>
			</div>
		)
	}
}
