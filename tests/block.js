"use strict";

var chai = require('chai');
var assert = require('assert');
var net = require('net');

var block = require('./../block');

describe("Crypto Basics", function() {
	// Buffer is initially NodeJS specific type been introduced prior to TypedArray and ArrayBuffer in ES6
	// ArrayBuffer is now underlying of Buffer (Buffer.buffer instanceof ArrayBuffer)
	// Int8Array is a view: new Int8Array(arrayBuffer)
	it('Should hash some data', function() {
		var hash = require('crypto').createHash('sha1');
		hash.update('data1');
		var q1 = hash.digest();
		//hash.update('data1');
		//var q2 = hash.digest();
		
		assert.equal(q1.constructor, Buffer);
		assert.equal(q1.buffer.constructor, ArrayBuffer);
		
		var i8b = new Int8Array(q1.buffer);
		assert.equal(q1[2], i8b[2]);
		
		assert.equal(i8b.constructor, Int8Array);
		// assert.equal(q1.constructor, Int8Array);
		// assert.fail(hash.digest());
	});
});	

describe("Block Basics", function() {
	it('Block should have genesis', function() {
		var gen = block.Block.getGenesisBlock('master');
		assert(gen instanceof block.Block);

		assert.equal(typeof gen.chain, 'number');
		assert.equal(gen.chain, 0xd62f, 'magic');

		assert.equal(gen.previousHash.constructor, Buffer);
		assert.equal(gen.previousHash.byteLength, 20);
		gen.previousHash.forEach(function(element) {
			assert.equal(element, 0x00);
		}, this);

		assert.equal(gen.timestamp.toString(), new Date('2017-09-03T14:28:00.000Z').toString());
		assert.equal(gen.data, 'init');
	});
	it('Block should have hash', function() {
		var gen = block.Block.getGenesisBlock('master');
		var hash = gen.getHash();
		assert(hash instanceof Buffer, 'hash instanceof Buffer');
		assert.notEqual(hash.toString('hex'), '0101010101010101010101010101010101010101010101010101010101010101');
		assert.notEqual(hash.toString('hex'), '0000000000000000000000000000000000000000000000000000000000000000');
		assert.equal(hash.toString('hex'), '6999f94546ec2b1a9068ed3808e1e31f2de0109f87b198903575c523cba8eeee');
	});
});