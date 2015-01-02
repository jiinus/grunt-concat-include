/*
* grunt-concat-include
* https://github.com/abcum/grunt-concat-include
*
* Copyright (c) 2013 Abcum Ltd, Contributors
* Licensed under the MIT license.
*/

'use strict';

module.exports = function(grunt) {

	var path = require('path');
	var chalk = require('chalk');

	grunt.registerMultiTask('concatinclude', 'Concatenate files.', function() {

		var options = this.options({
			banner: '',
			footer: '',
			separator: grunt.util.linefeed,
			processIncludeContents: function(fileData, filePath) {
				return fileData;
			}
		});

		// ++++++++++++++++++++++++++++++
		// Get banner and footer
		// ++++++++++++++++++++++++++++++

		var banner = grunt.template.process(options.banner);
		var footer = grunt.template.process(options.footer);

		// ++++++++++++++++++++++++++++++
		// Loop through src:dest
		// ++++++++++++++++++++++++++++++

		this.files.forEach(function(f) {
			var missing = [];

			var src = f.src.map(function(filepath) {

				// ++++++++++++++++++++++++++++++
				// Get working directory
				// ++++++++++++++++++++++++++++++

				var wdir = path.dirname(filepath) + '/';

				var require = /@require (.*)/g;
				var include = grunt.file.read(filepath);

				var match = null;
				var matches = [];

				// ++++++++++++++++++++++++++++++
				// Get all files recursively
				// ++++++++++++++++++++++++++++++

				while (match = require.exec(include)) {

					match = match[1];

					match = wdir + match;

					matches.push(match);

				}

				// ++++++++++++++++++++++++++++++
				// Get src from all files
				// ++++++++++++++++++++++++++++++

				return matches.map(function(match) {

					var files = grunt.file.expand(match);
					
					if (files.length === 0) {
						missing.push(match);
					}
					
					return files.map(function(file) {

						var fileContent = (grunt.file.isFile(file)) ? grunt.file.read(file) : null;
						return options.processIncludeContents(fileContent, file);

					}).join(options.separator);

				}).join(options.separator);

			}).join(options.separator);

			// Write the destination file.
			grunt.file.write(f.dest, banner + src + footer);
			
			// List missing files
			missing.map(function(file) {
				grunt.log.writeln('File "' + chalk.red(file) + '" was not found!');
			});

			// Print a success message.
			grunt.log.writeln('File ' + chalk.cyan(f.dest) + ' created.');

		});

	});

};
