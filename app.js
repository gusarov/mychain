"use strict";

var networking = require('./networking');
var netnode = require('./netnode');
var http = require('https');
var fs = require('fs');
var autodeploy = require('./autodeploy.js');

var daemon = false;

/*
process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
});
*/

if (process.argv.length > 2) {
	if (process.argv[2] == 'svc') {
		daemon = true;
	}
}

if (daemon) {
	console.info('Checking for updates on startup...');
	autodeploy.run();

	setInterval(function(){
		console.info('Checking for updates...');
		autodeploy.run();
	}, 1000 * 60); // 1h
}

console.info('Starting mychain node...');

var myNode = new netnode.NetNode();
myNode.start();

console.info('Ready.');

