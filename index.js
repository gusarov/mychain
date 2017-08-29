"use strict";

var networking = require('./networking');
var netnode = require('./netnode');

console.info('Starting mychain node...');

var myNode = new netnode.NetNode();
myNode.start();

console.info('Ready.');

