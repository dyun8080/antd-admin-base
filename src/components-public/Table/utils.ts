import moment from 'moment'
import numeral from 'numeral'
import cloneDeep from 'lodash/clonedeep'

// const TwoRow = ({ text, secondary }) => (
// 	<React.Fragment>
// 		<p>{text}</p>
// 		<p style={{ opacity: 0.67 }}>{secondary}</p>
// 	</React.Fragment>
// )

export function getXSrcoll(columns: Array<any>) {
	return columns.map(item => item.width).reduce((a, b) => a + b, 0)
}

export function getComputedData(dataSource: Array<any>) {
	// clone dataSource，防止对原数据直接篡改
	const newData = cloneDeep(dataSource)

	const numeralMap = [
		'totalCostPrice',
		'totalPrice',
		'price',
		'costPrice',
		'amount',
		'totalAmount',
		'availableAmount',
		'totalAvailableAmount',
		'totalCostPriceDiff',
		'totalPriceDiff',
		'totalAmountDiff',
	]

	const dateMap = [
		'createdDate',
		'checkedDate',
		'confirmedDate',
		'purchaseDate',
		'arrivalDate',
		'shipDate',
		'openDate',
		'stocktakingDate',
	]

	return newData.map(item => {
		Object.keys(item).forEach(key => {
			if (numeralMap.includes(key)) item[key] = numeral(item[key]).format('0,0[.]00')
			if (dateMap.includes(key)) item[key] = item[key] && moment(item[key]).format('YYYY.MM.DD')
		})

		return ({
			key: item.id,
			...item,
		})
	})
}

export function getComputedColumns(columns: Array<any>) {
	return columns.map(item => {
		// analyzeKey(item)
		return {
			width: 100,
			...item,
			dataIndex: item.key,
			className: 'text-overflow',
			render: item.render ? item.render : (text) => {
				// text = formatValue(text, item.key)
				// if (item.type == 'info') return <p className="info-color" > { text } < /p>
				// if (item.type == 'error') return <p className="error-color" > { text } < /p>
				return text
				// return <Tooltip placement="top" title = { text } > { text } < /Tooltip>
			},
		}
	})
}



// export function analyzeKey(item = {}) {
// 	const twoRowMap = [
// 		'warehouse',
// 		'supplier',
// 		'toWarehouse',
// 		'fromWarehouse',
// 		'store',
// 	]
// 	if (twoRowMap.includes(item.key)) item.render = (_, record) => <TwoRow text={record[`${item.key}Number`]} secondary={record[`${item.key}Name`]} />
// }
