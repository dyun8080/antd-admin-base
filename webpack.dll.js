import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
const { NODE_ENV } = process.env

const webpackConfig = {
	mode: NODE_ENV || 'development',

	entry: {
		build: [
			'react',
			'react-dom',
			'react-router-dom',
			'mobx-react-router',
			'mobx-react',
			'moment',
			'mobx',
			'antd',
		],
	},

	output: {
		filename: '[name].dll.js',
		path: path.join(__dirname, 'dist'),
		library: '[name]'
	},

	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, 'dist/manifest.json'),
			name: '[name]',
			context: __dirname,
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'client/index.html'),
			inject: true,
		}),
	],
}
export default webpackConfig
