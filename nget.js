#!/usr/bin/env node

var http;
var url = require('url');

var location = process.argv[2];

if (!location) {
	console.log('\nnget --> Simply stream http(s) responses to stdout.\n');
	console.log('  Usage:');
	console.log('  nget http://www.google.com/\n');
	process.exit();
}

location = url.parse(location);

if (location.href == location.path) {
	location.hostname = location.path;
	location.path = '/';
	location.protocol = 'http:';
	location.port = 80;
}

http = location.protocol == 'https:'
	? require('https')
	: require('http');

var response = http.get({
	path: location.path,
	host: location.hostname,
	port: location.port
}, function(res) {
	res.pipe(process.stdout);

	res.on('end', function() {
		console.log('\n');
	});
});

