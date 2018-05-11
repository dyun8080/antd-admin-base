import fs from 'fs'

const files = fs.readdirSync('./server/config').map(item => item.split('.')[0])
let NODE_ENV = process.env.NODE_ENV || 'development'

process.argv.slice(2).forEach(arg => {
	if (files.includes(arg)) NODE_ENV = arg
})

const config = require(`./${NODE_ENV}.js`)

export default config.default
