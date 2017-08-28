"use strict";

var assert = require('assert');
var fs = require('fs');

class PeerAddress {
	constructor (address, port) {
		this.address = address;
		this.port = port;
	}
}

class Discovery {
	FindPeers() {
		var data = JSON.parse(fs.readFileSync('./_bootsources.json'));
		assert(data instanceof Array, "_bootsources should contain an array");
		data.forEach(x=>{
			// assert(typeof data === "string", "_bootsources item should be a string but it is " + typeof data);
		});
		return [new PeerAddress("gusarov.noip.me", 7770)];
	}
}

module.exports = {
	PeerAddress : PeerAddress,
	Discovery : Discovery,
}
