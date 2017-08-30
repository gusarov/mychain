"use strict";

var net = require('net');
var JsonSocket = require('json-socket');

class NetNode {
	constructor(port) {
		this.port = port;
		this.server = null;
	}

	start() {
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
	}
}

module.exports = {
	NetNode: NetNode
};
