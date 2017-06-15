/*
var express = require('express');
var path = require('path');
var app = express();

// Define the port to run on
app.set('port', 4000);

app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
*/

var express = require('express');
var path = require('path');
var gm = require('gm').subClass({imageMagick: true});
var fs = require('fs');

var app = express();


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


// Define the port to run on
app.set('port', 4000);

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
