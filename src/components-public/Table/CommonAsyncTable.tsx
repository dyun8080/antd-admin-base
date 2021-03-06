import React, { Component } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table'

import { getXSrcoll, getComputedColumns, getComputedData } from './utils'
import { getAssetParams, get } from '@/utils'

interface Props extends TableProps<any> {
	columns: Array<any>
	/** 请求后端的接口 */
	apiString: string
	/** 每页展示的数量 */
	pageSize?: number
	/** 是否使用Row筛选功能 */
	useRowSelection?: boolean
}

interface State {
	/** 当前页数 */
	current: number
	/** 列表总数 */
	count: number
	/** 加载动画 */
	loading: boolean
	/** 列表总数 */
	data: Array<any>
	/** 开启筛选时选中的ID数组 */
	selectedRowKeys: Array<number>
}

export default class CommonAsyncTable extends Component<Props, State> {
	query: any

	static defaultProps = {
		pageSize: 20,
		useRowSelection: false,
	}

	constructor(props: Props) {
		super(props)

		this.query = {}

		this.state = {
			current: 1,
			count: 0,
			loading: false,
			data: [],
			selectedRowKeys: [],
		}
	}

	componentDidMount() {
		this.getData()
	}

	onChange = (pagination, filters) => {
		const { current } = pagination

		this.setState({
			current,
		}, () => {
			this.query = {
				...this.query,
				...filters,
			}
			this.getData()
		})
	}


	getData = async (): Promise<any> => {
		const { apiString, pageSize } = this.props
		const { current } = this.state

		const querySource = {
			current,
			size: pageSize,
			...this.query,
		}

		const params = getAssetParams(querySource)

		this.setState({ loading: true })
		const [dataResponse, countResponse] = await Promise.all([get(apiString, params), get(`${apiString}/count`, params)]) as any

		this.setState({
			loading: false,
			data: dataResponse.data,
			count: countResponse.data,
		})
	}

	onSelectChange = (selectedRowKeys: Array<number>) => {
		this.setState({ selectedRowKeys })
	}

	render() {
		const { columns, pageSize, ...rest } = this.props
		const { selectedRowKeys, current, data, loading, count } = this.state

		const computedDataSource = getComputedData(data)
		const computedColumns = getComputedColumns(columns)

		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		}

		return (
			<Table
				dataSource={computedDataSource}
				loading={loading}
				columns={computedColumns}
				size="middle"
				pagination={{ pageSize, current, total: count }}
				scroll={{ x: getXSrcoll(computedColumns) }}
				onChange={this.onChange}
				rowSelection={this.props.useRowSelection ? rowSelection : undefined}
				{...rest}
			/>
		)
	}
}
