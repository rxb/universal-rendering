module.exports = {
	type: 'react-app',
	webpack: {
		module: {
			rules: [{
	          test: /\.(inc)$/,
	          loader: 'raw-loader'
			}]
		}
	}
}