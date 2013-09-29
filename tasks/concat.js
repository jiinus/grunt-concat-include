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

	grunt.registerMultiTask('concatinclude', 'Concatenate files.', function() {

		var options = this.options({
			banner: '',
			footer: '',
			separator: ';'
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

					return files.map(function(file) {

						return grunt.file.read(file);

					});

				});

			}).join(options.separator);

			// Write the destination file.
			grunt.file.write(f.dest, banner + src + footer);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');

		});

	});

};
