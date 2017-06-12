module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-svgstore');
	grunt.loadNpmTasks('grunt-contrib-clean');


	// how to make svgs nice:
	// optimize your svgs into a folder
	// create an svg sprite
	// if you really want to be fancy, xhr the sprite into the document to allow caching


	// reference the node_modules package
	// go through child folders
	var SRC = 'node_modules/feather-icons/icons/',
		SRC_REGEX = '**/*.svg';

	var DIST = 'dist/',
		DIST_OPTIMIZED = `${DIST}optimized/`,
		DIST_SPRITE = `${DIST}sprite/`;


	grunt.initConfig({
		package: grunt.file.readJSON('package.json'),

		//
		// CLEAN
		// removes all distrubtions prior to rebuilding
		//
		'clean': {
			all: [
				DIST_OPTIMIZED,
				DIST_SPRITE,
			],
		},

		//
		// SVG optimization
		// Gets rid of extra svg nonsense
		// "flatten" puts everything from the folders into one folder
		//
		'svgmin': {
			options: {
				plugins: [
					{ removeDesc: true },
					{ collapseGroups: true },
					{ removeEmptyAttrs: true },
					{ removeUselessStrokeAndFill: true },
					{ removeViewbox: false },
					{
						removeAttrs: {
							attrs: ['fill']
						}
					}
				]
			},
			dist: {
				files: [{
					expand: true,
					flatten: true,
					cwd: SRC,
					src: [SRC_REGEX],
					dest: DIST_OPTIMIZED
				}]
			}
		},

		//
		// SVG sprite
		// For including in HTML
		//
		'svgstore': {
			options: {
				prefix: 'icon-'
			},
			default: {
				files: [{
					src: [`${DIST_OPTIMIZED}*.svg`],
					dest: `${DIST_SPRITE}sprite.inc`
				}]
			}
		}

	});
};