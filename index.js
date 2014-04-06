#!/usr/bin/env node
var http = require('http')

var request = http.get('http://169.254.169.254/latest/meta-data/public-hostname', function(res) {

	var statusCode = res.statusCode;
	if (statusCode === 200) {
		printResponse(res)
	} else {
		errorAndDie('response status code was ' + statusCode)
	}
});

request.on('error', errorAndDie)

function errorAndDie(err) {
	console.error(err.toString())
	process.exit(1)
}

function printResponse(res) {
	var result = ''

	function read() {
		var line

		while (line = res.read())
			result += line
	}

	res.on('readable', read)
	res.on('end', function () {
		console.log(result)
	})
}