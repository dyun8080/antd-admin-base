import express from 'express'
import path from 'path'
import morgan from 'morgan'
import config from './config'
// import oauthRoute from './oauthRoute'
import bodyParser from 'body-parser'
// import compression from 'compression'

const app = express()

console.log('NODE_ENV:', app.get('env'))

// app.use(morgan('short'))
app.use(morgan('dev'))

// app.use(compression())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '../dist'), {
	maxAge: 600 * 1000
}))

// oauthRoute(app)

let data = [
	{ name: 'damao', skill: ' 开撸11了' }
]


app.use((req, res, next) => {
	console.log(req.header)

	res.header('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate', )

	next()
})

app.get('/getInfo', (req, res) => {
	// res.header('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate', )
	res.send({
		code: 0,
		data
	})
})

app.get('/**', (req, res) => {
	res.sendfile(`${path.join(__dirname, '../dist')}/index.html`)
})

const server = app.listen(config.port, () => {
	const host = server.address().address
	const port = server.address().port
	console.log('Example app listening at http://%s:%s', host, port)
})
