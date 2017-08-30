"use strict";

console.log("Downloading...");
var zipPath = process.env.tmp + "\\mychainmaster.zip";
var extractPath = process.env.tmp + "\\mychainmasterzip";
var http = require('https');
var fs = require('fs');

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
	response.pipe(file);
	file.on('finish', function() {
	  file.close(cb);
	});
  });
};

download("https://codeload.github.com/gusarov/mychain/zip/master", zipPath, function() {
	console.log("Extracting...");
	var extract = require('extract-zip');
	extract(zipPath, {dir: extractPath}, function (err) {
		if (err)
			console.error(err);
		var copydir = require('copy-dir');
		console.log("Copying...");
		copydir.sync(extractPath+'\\mychain-master', '.');
		console.log("Done");
	});
});

