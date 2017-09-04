"use strict";

const assert = require('assert');
// var CryptoJS = require("crypto-js");
const crypto = require('crypto');

class Block {
	constructor(
		  chain // 2 (0-2)
		, previousHash // 20 (2-22)
		, timestamp // 4 (22-26)
		, data // N (26-)
	) {
		if (typeof data == 'string') {
			data = new Buffer(data);
		}

		assert.equal(typeof chain, 'number', 'chain');
		assert.equal(previousHash.constructor, Buffer, 'previousHash');
		assert(timestamp instanceof Date, 'timestamp');

		assert.equal(data.constructor, Buffer, 'data');

		// DATA
		this.chain = chain; // the chain id bytes
		this.previousHash = previousHash;
		this.timestamp = timestamp;
		this.data = data;

		// TEMP
		this.hash = null;
		this.buffer = Buffer.allocUnsafe(26 + data.byteLength, 0);
		this.buffer.writeUInt16BE(this.chain, 0); // 2
		this.previousHash.copy(this.buffer, 2, 0, 20); // 20
		this.buffer.writeUInt32BE(this.timestamp.getDate() / 1000, 22); // 4 bytes - UInt32 Unix Time (1970-2106 years)
		this.data.copy(this.buffer, 26);
	}

	getBuffer (unsafe) {
		if (unsafe) {
			return this.buffer;
		}
		return new Buffer(this.buffer);
	}

	getHash (forceUpdate) {
		if (this.hash === null || forceUpdate) {
			var hashing = crypto.createHash('sha256');
			hashing.update(this.buffer);
			this.hash = hashing.digest();
		}
		return this.hash;
	}
}

Block.generateNextBlock = (chain, prevBlockHash, newBlockData) => {
	var ts = Date.now();
	return new Block(chain, prevBlockHash, ts, newBlockData);
};

Block.chainMaster = 0xd62f;
Block.chainAnarchy = 0x8fbf;
Block.chainPow = 0xc5de;
Block.zeroHash = Buffer.alloc(20);

Block.getGenesisBlock = (chainCode) => {
	switch (chainCode) {
		case 'master': return new Block(Block.chainMaster, Block.zeroHash, new Date('2017-09-03T14:28:00.000Z'), 'init');
		case 'anarchy': return new Block(Block.chainAnarchy, Block.zeroHash, new Date('2017-09-03T14:28:00.000Z'), 'init');
		case 'pow': return new Block(Block.chainPow, Block.zeroHash, new Date('2017-09-03T14:28:00.000Z'), 'init');
	}
	return null; // unknown chain
};

module.exports = {
	Block: Block
}
