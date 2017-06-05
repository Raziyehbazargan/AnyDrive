const webpack = require("webpack");
const path = require('path')

module.exports = {
	entry: "./app/entry.js",
	output: {
		path: "./build",
		filename: "bundle.js",
		publicPath: "build"
	},
	devServer: {
		inline: true,
		contentBase: `${__dirname}/app`,
		port: 4000
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: ["babel-loader"],
				query: {
					presets: ["latest", "stage-0", "react"]
				}
			},
			{
				test: /\.json$/,
				exclude: /(node_modules)/,
				loader: "json-loader"
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!autoprefixer-loader'
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
			}
		]
	}
}
