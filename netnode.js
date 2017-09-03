"use strict";

var net = require('net');
var express = require('express');
var Dao = require('./localDao').Dao;

//var JsonSocket = require('json-socket');

class NetNode {
	constructor(port) {
		this.port = port != null ? port : (process.env.PORT != null ? process.env.PORT : 7770);
		this.server = null;
		this.dao = new Dao();
	}

	start() {
		var app = express();
		
		var options = {
			index: "index.htm"
		};

		app.use(express.static(__dirname + '/public', options));
		// app.use('/files', directory(__dirname + '/public/files', {'icons': true}));
		// app.use(serveFavicon(__dirname + '/public/favicon.ico'));

		app.get('/peers', (req, res) => {
			res.send(this.sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
		});

		app.get('/ver', (req, res) => {
			var ver = JSON.parse(require('fs').readFileSync('./package.json')).version;
			res.send(ver);
		});
		
		var server = app.listen(this.port, function () {
			var port = server.address().port;
			console.log('Server running at port %s', port);
		});

		/*
		this.server = net.createServer();
		this.server.listen(this.port == null ? 7770 : this.port);
		this.server.on('connection', function(socket) {
			socket = new JsonSocket(socket);
			socket.on('message', function(message) {
				if (message.command == 'a') {
				} else if (message.command == 'b') {
				}
			});
		});
		*/
		this.server = server;
	}
}

module.exports = {
	NetNode: NetNode
};
