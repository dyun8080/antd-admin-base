import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import lessToJs from 'less-vars-to-js'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const { NODE_ENV } = process.env
const modifyVars = lessToJs(fs.readFileSync(path.join(__dirname, 'assets/styles/__theme.less'), 'utf8'))

const webpackConfig = {
	mode: NODE_ENV || 'development',

	entry: {
		index: [
			path.join(__dirname, `./client/${NODE_ENV !== 'production' ? 'entry.dev' : 'entry'}.tsx`),
		]
	},

	output: {
		filename: 'entry.[name].js',
		chunkFilename: '[name].js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
	},

	resolve: {
		modules: ['node_modules'],
		extensions: ['.json', '.jsx', '.js', '.ts', '.tsx'],
		alias: {
			assets: path.resolve(__dirname, 'assets'),
			'@': path.resolve(__dirname, 'src'),
		},
	},

	plugins: [
		/*eslint-disable */
		new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(zh-cn|en-gb)$/),
		/*eslint-enable */
		new HtmlWebpackPlugin({
			template: path.join(__dirname, `${NODE_ENV !== 'production' ? 'dist' : 'client'}/index.html`),
			inject: true,
		}),
	],

	module: {
		rules: [
			{
				test: /\.(eot|JPEG|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192
					}
				}],
			},
			{
				test: /\.(ts|tsx)$/,
				use: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.(less)$/,
				include: [
					path.resolve(__dirname, 'src'),
				],
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							minimize: !(NODE_ENV !== 'production'),
							sourceMap: !!(NODE_ENV !== 'production'),
							importLoaders: 1,
							localIdentName: '[name]-[local]__[hash:base64:5]'
						}
					},
					'postcss-loader',
					{
						loader: 'less-loader',
						options: {
							modifyVars,
						},
					},
				]
			},

			{
				test: /\.(less)$/,
				exclude: [
					path.resolve(__dirname, 'src'),
				],
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { minimize: !(NODE_ENV !== 'production') }
					},
					// 'postcss-loader',
					{
						loader: 'less-loader',
						options: {
							modifyVars,
						}
					}
				]
			},
		]
	},
}


/**
|--------------------------------------------------
| development
|--------------------------------------------------
*/
if (NODE_ENV !== 'production') {
	webpackConfig.devtool = 'cheap-module-eval-source-map'
	webpackConfig.entry.index = [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://0.0.0.0:7777/',
		...webpackConfig.entry.index
	]
	webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
	// quick encode
	webpackConfig.plugins.push(new webpack.DllReferencePlugin({
		context: __dirname,
		manifest: path.join(__dirname, 'dist/manifest.json'),
	}))
}
/**
|--------------------------------------------------
| production
|--------------------------------------------------
*/
else {
	webpackConfig.plugins.push(new BundleAnalyzerPlugin())
	webpackConfig.plugins.push(new MiniCssExtractPlugin({
		// Options similar to the same options in webpackOptions.output
		// both options are optional
		filename: 'style.[chunkhash:8].css',
		chunkFilename: 'styles/[id].chunk.[chunkhash:8].css'
	}))
	webpackConfig.optimization = {
		// runtimeChunk 为true时，会把一个js文件变成2个，总体积变小一点点
		runtimeChunk: false,
		splitChunks: {
			chunks: 'all',
			minSize: 0,
			minChunks: 1,
			maxAsyncRequests: 1,
			maxInitialRequests: 1,
			name: true,
			cacheGroups: {
				// 打包第三方库
				// vendor: {
				// 	name: 'vendor',
				// 	chunks: 'all',
				// 	// test: /react-dom|axios/,
				// 	test: /react-dom/,
				// 	minChunks: 1,
				// 	enforce: true
				// },
				// 抽离公共的异步代码
				common: {
					name: 'common',
					chunks: 'all',
					test: /[\\/]node_modules[\\/]/,
					// minChunks通过异步加载的打包次数进行优
					minChunks: 2,
					enforce: true
				},
			},
		}
	}
	webpackConfig.output.filename = '[name].[chunkhash:8].js'
	webpackConfig.output.chunkFilename = 'core/[name].[chunkhash:8].js'
	// webpackConfig.module.rules = [
	// 	...webpackConfig.module.rules,
	// ]
	webpackConfig.module.rules.forEach(item => {
		if ([/\.(less)$/.toString(), /\.(css)$/.toString(),].includes(item.test.toString())) {
			item.use.splice(0, 1, MiniCssExtractPlugin.loader)
		}
	})
}

export default webpackConfig
