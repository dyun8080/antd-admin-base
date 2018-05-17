const Koa = require('koa')
const app = new Koa()

// x-response-time

app.use(async (ctx, next) => {
	await next()
})

app.use(async ctx => {
	ctx.body = 'Hello World'
})

app.listen(3000)

