"use strict";

const assert = require('assert');
// var CryptoJS = require("crypto-js");
const crypto = require('crypto');
const sha256 = crypto.createHash('sha256');

class Block {
	constructor(chain, previousHash, timestamp, data) {
		assert.equal(chain.constructor, Buffer);
		assert.equal(previousHash.constructor, Buffer);
		assert(timestamp instanceof Date);
		// DATA
		this.chain = chain; // the chain id bytes
		this.previousHash = previousHash;
		this.timestamp = timestamp;
		this.data = data;
		
		// TEMP
		this.hash = null;
	}

	getHash () {
		if (this.hash === null) {
			// Buffer
			// this.hash = new Int8Array(sha256(this.previousHash + this.timestamp + this.data));
		}
		return this.hash;
	}
}

Block.generateNextBlock = (chain, prevBlockHash, newBlockData) => {
	var ts = Date.now();
	return new Block(chain, prevBlockHash, ts, newBlockData);
};

Block.chainMaster = new Buffer([0xd6,0x2f]);
Block.chainAnarchy = new Buffer([0x8f,0xbf]);
Block.chainPow = new Buffer([0xc5,0xde]);

Block.getGenesisBlock = (chainCode) => {
	switch(chainCode){
		case 'master': return new Block(Block.chainMaster, new Buffer(20), new Date('2017-09-03T14:28:00.000Z'), 'init');
		case 'anarchy': return new Block(Block.chainAnarchy, new Buffer(20), new Date('2017-09-03T14:28:00.000Z'), 'init');
		case 'pow': return new Block(Block.chainPow, new Buffer(20), new Date('2017-09-03T14:28:00.000Z'), 'init');
	}
	throw 'wrong chain code';
};

module.exports = {
	Block: Block
}
