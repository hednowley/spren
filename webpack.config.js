const path = require('path');

module.exports = {
	mode: 'development',
	entry: './source/ts/index.tsx',
	module: {
		rules: [
			{ test: /\.(ts|tsx)$/, use: "awesome-typescript-loader" },
			{ test: /\.css$/, use: ["style-loader", "css-loader"] }
		]
	},
	resolve: {
		extensions: ["css", ".scss", ".ts", ".tsx", ".js"]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	}
};