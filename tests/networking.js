"use strict";

var chai = require('chai');
var assert = require('assert');
var net = require('net');

var networking = require('./../networking');

describe("Bootstrap Nodes", function() {
	return;
	it('Should known some active root nodes', function() {
		var discovery = new networking.Discovery();
		var peers = discovery.FindPeers();
		assert(peers instanceof Array, "Should return an array");
		assert(peers.length > 0, "Should have some nodes");
		for (var i = 0; i < peers.length; i++) {
			// assert(peers[i] instanceof networking.PeerAddress, "Elements should be PeerAddress");
			// check
			// var client = new net.createConnection();
		}
		// make sure all of them are passed
		for (var i = 0; i < peers.length; i++) {
			assert.equal(peers[i], 'good');
		};
	});
});