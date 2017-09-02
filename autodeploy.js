"use strict";

var http = require('https');
var fs = require('fs');

function performUpdate() {
	console.log("Downloading...");
	var zipPath = process.env.tmp + "\\mychainmaster.zip";
	var extractPath = process.env.tmp + "\\mychainmasterzip";

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
			process.exit(1); // kill itself to trigger autorestart
		});
	});
	
}

module.exports = {
	run: function() {
		// local
		var localVersion = JSON.parse(fs.readFileSync('./package.json')).version;
		console.info('Local Version: ' + localVersion);

		// remote
		http.get('https://raw.githubusercontent.com/gusarov/mychain/master/package.json', function(response) {
			var body = '';
			response.on('data', function (chunk) {
				// console.info('data');
				body += chunk;
			});
			response.on('end', function () {
				// console.info('end');
				var json = JSON.parse(body);
				var remoteVersion = json.version;
				console.info('Remote Version: ' + remoteVersion);
				if (localVersion != remoteVersion) {
					// update!!
					performUpdate();
				}
			});
		});
	}
}