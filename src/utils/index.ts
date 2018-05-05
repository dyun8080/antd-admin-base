export function getAssetParams(values) {

	const query = JSON.parse(JSON.stringify(values))

	if ('size' in query && 'current' in query) {
		query.from = (query.current - 1) * query.size
		delete query.current
	}

	Object.keys(query).forEach((key) => {
		// 处理moment对象 ==>	dateValoe
		// if (moment.isMoment(values[key])) values[key] = moment(values[key]).startOf('day').valueOf()

		// 数组逗号隔开
		if (Array.isArray(query[key]) && query[key].length == 0) {
			delete query[key]
		} else if (Array.isArray(query[key])) query[key] = query[key].toString()
	})

	return query
}
