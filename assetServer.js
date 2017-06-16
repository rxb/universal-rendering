var express = require('express');
var path = require('path');
var gm = require('gm').subClass({imageMagick: true});

var app = express();

// serve colorized png
app.get('/:shape?', function(req, res){
	var { shape = 'feather' } = req.params;
	var { color = 'purple' } = req.query
	var filename = path.join(__dirname, `public/${shape}.png`);
	gm(filename)
		.fill(color)
		.colorize(100)
		.stream()
		.pipe(res);
});

// start server
app.set('port', 4000);
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
