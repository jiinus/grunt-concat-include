# grunt-concat-include

> Concatenate files using an include file.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-concat-include --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-concat-include');
```




## Concat task
_Run this task with the `grunt concatinclude` command._

Task targets, files and options may be specified according to the Grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### separator
Type: `String`
Default: `grunt.util.linefeed`

Concatenated files will be joined on this string. If you're post-processing concatenated JavaScript files with a minifier, you may need to use a semicolon `';'` as the separator.

#### banner
Type: `String`
Default: empty string

This string will be prepended to the beginning of the concatenated output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

#### footer
Type: `String`
Default: empty string

This string will be appended to the end of the concatenated output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

### Usage Examples

#### Concatenating with a custom separator

In this example, running `grunt concatinclude:dist` (or `grunt concatinclude` because `concatinclude` is a [multi task][multitask]) will concatenate the files listed in the include.inc file, joining files with `;` and writing the output to `dist/built.js`.

```js
// Project configuration.
grunt.initConfig({
  concatinclude: {
    options: {
      separator: ';',
    },
    dist: {
      files: {
      	'dist/built.js': ['src/include.inc]
      }
    }
  }
});
```

#### Banner comments

In this example, running `grunt concatinclude:dist` will concatenate the files listed in the include.inc file, placing a banner comment at the top, and writing the output to `dist/built.js`.

This generated banner will be the contents of the `banner` template string interpolated with the config object. In this case, those properties are the values imported from the `package.json` file (which are available via the `pkg` config property) plus today's date.

_Note: you don't have to use an external JSON file. It's also valid to create the `pkg` object inline in the config. That being said, if you already have a JSON file, you might as well reference it._

```js
// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  concatinclude: {
    options: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */
    },
    dist: {
      files: {
      	'dist/built.js': ['src/include.inc]
      }
    }
  }
});
```

#### Footer comments

In this example, running `grunt concatinclude:dist` will concatenate the files listed in the include.inc file, placing a footer comment at the bottom, and writing the output to `dist/built.js`.

This generated footer will be the contents of the `footer` template string interpolated with the config object. In this case, those properties are the values imported from the `package.json` file (which are available via the `pkg` config property) plus today's date.

_Note: you don't have to use an external JSON file. It's also valid to create the `pkg` object inline in the config. That being said, if you already have a JSON file, you might as well reference it._

```js
// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  concatinclude: {
    options: {
      footer: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */
    },
    dist: {
      files: {
      	'dist/built.js': ['src/include.inc]
      }
    }
  }
});
```

#### include.inc file

The `grun concatinclude` task will look for files to concatenate together from a include.inc file.

The task will include all files with an `@require` directive, and will ignore all other lines.

Include files directly: `@require external/example.js`

Include all files of a type: `@require external/*.js`

Include all files in a directory: `@require external/*`

Include all files in a directory and all sub-directories: `@require external/**`

```js

-- jQuery files			 // this line will be ignored

	@require external/jquery/jquery.js
	@require external/jquery/jquery.plugin1.js
	@require external/jquery/jquery.plugin2.js
	@require external/jquery/jquery.plugin3.js

-- External files		 // this line will be ignored

	@require external/external/*.js

-- Project files		 // this line will be ignored

	@require app/objects/**
	@require app/helpers/**
	@require app/models/**
	@require app/routes/**
	@require app/views/**
	
```

## Release History

 * 2013-11-17   v0.2.0   Disable concatenation for directories and update documentation.
 * 2013-09-29   v0.1.1   Update default concatenation character.
 * 2013-09-29   v0.1.0   Initial commit.

---

Task submitted by [Tobie Morgan Hitchcock](http://abcum.com/)

*This file was generated on Sun Nov 17 2013 13:40:52.*