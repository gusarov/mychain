"use strict";

var chai = require('chai');
var assert = require('assert');

var Foo = require('./../sampleModule');

describe('First Test Suite', function() {
	it('Foo() ctor should increase number of instancies', function() {
		var before = Foo.sGetTotalObjects();
		var obj = new Foo([]);
		assert.equal(Foo.sGetTotalObjects(), before + 1);
	});
});
