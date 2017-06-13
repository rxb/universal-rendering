module.exports = {
	webpack: {
		module: {
			rules: [{
	          test: /\.(inc)$/,
	          loader: 'raw-loader'
			}]
		}
	}
}