'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//                                                             ██████╗  ██╗   ██╗ ██╗
//                                                            ██╔════╝  ██║   ██║ ██║
//                                                            ██║  ███╗ ██║   ██║ ██║
//                                                            ██║   ██║ ██║   ██║ ██║
//                                                            ╚██████╔╝ ╚██████╔╝ ██║
//                                                             ╚═════╝   ╚═════╝  ╚═╝
//                                                                       Created by Dominik Wilkowski
//
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// External dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Grunt module
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = function(grunt) {


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Dependencies
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-multi-dest');
	grunt.loadNpmTasks('grunt-font');
	grunt.loadNpmTasks('grunt-wakeup');


	grunt.initConfig({

		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// clean task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		clean: {
			pre: ['./temp'], //delete before running
			post: ['./temp'], //delete after running
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// concatenating files
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		concat: {
			mixins: {
				src: [
					'./base/less/base.less',
					'./**/*-mixins.less',
					'!./test/**',
				],
				dest: './temp/mixins.less',
			},
			js: {
				expand: true,
				src: [
					'./test/**/js/*.js',
					'!./test/**/js/site.js',
				],
				dest: 'site.js',
				rename : function( dest, src ) {
					var parts = src.split( '/' );
					parts.splice((parts.length -1), 1);
					var path = parts.join('/');

					return path + '/' + dest;
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// less task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		less: {
			test: {
				options: {
					cleancss: true,
					compress: false,
					ieCompat: true,
					report: 'min',
				},
				files: [
					{
						expand: true,
						src: './test/**/less/*.less',
						dest: 'site.css',
						rename : function( dest, src ) {
							var parts = src.split( '/' );
							parts.splice((parts.length -2), 2);
							var path = parts.join('/');
							var newPath = path + '/css/' + dest;

							return newPath;
						},
					},
				],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// copy files
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		copy: {
			mixins: {
				src: './temp/mixins.less',
				dest: './module 1/download/',
			},
			module1: {
				src: './module 1/module-1.js',
				dest: './test/1+2/assets/js/module-1.js',
			},
			module2: {
				src: './module 2/module-2.js',
				dest: './test/1+2/assets/js/module-2.js',
			},
			module3: {
				src: './module 3/module-3.js',
				dest: './test/1+3/assets/js/module-3.js',
			},
			module4: {
				src: './module 4/module-4.js',
				dest: './test/1+4/assets/js/module-4.js',
			},
			modulesvg: {
				src: './module svg/module-svg.js',
				dest: './test/1+svg/assets/js/module-svg.js',
			},
			base: {
				src: './base/js/020-app.js',
				dest: './test/1+2/assets/js/020-app.js',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Multicopy
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		multidest: {
			mixins: {
				tasks: [
					'copy:mixins',
				],
				dest: [
					'./module 1/download/mixins.less',
					'./module 2/download/mixins.less',
					'./module 3/download/mixins.less',
					'./module 4/download/mixins.less',
					'./module svg/download/mixins.less',
					'./test/1+2/assets/less/mixins.less',
					'./test/1+2+4/assets/less/mixins.less',
					'./test/1+3/assets/less/mixins.less',
					'./test/1+4/assets/less/mixins.less',
					'./test/1+svg/assets/less/mixins.less',
					'./test/all/assets/less/mixins.less',
				],
			},
			module1: {
				tasks: [
					'copy:module1',
				],
				dest: [
					'./module 1/download/module-1.js',
					'./test/1+2/assets/js/module-1.js',
					'./test/1+2+4/assets/js/module-1.js',
					'./test/1+3/assets/js/module-1.js',
					'./test/1+4/assets/js/module-1.js',
					'./test/1+svg/assets/js/module-1.js',
					'./test/all/assets/js/module-1.js',
				],
			},
			module2: {
				tasks: [
					'copy:module2',
				],
				dest: [
					'./module 2/download/module-2.js',
					'./test/1+2/assets/js/module-2.js',
					'./test/1+2+4/assets/js/module-2.js',
					'./test/all/assets/js/module-2.js',
				],
			},
			module3: {
				tasks: [
					'copy:module3',
				],
				dest: [
					'./module 3/download/module-3.js',
					'./test/1+3/assets/js/module-3.js',
					'./test/all/assets/js/module-3.js',
				],
			},
			module4: {
				tasks: [
					'copy:module4',
				],
				dest: [
					'./module 4/download/module-4.js',
					'./test/1+2+4/assets/js/module-4.js',
					'./test/1+4/assets/js/module-4.js',
					'./test/all/assets/js/module-4.js',
				],
			},
			modulesvg: {
				tasks: [
					'copy:modulesvg',
				],
				dest: [
					'./module svg/download/module-svg.js',
					'./test/1+svg/assets/js/module-svg.js',
					'./test/all/assets/js/module-svg.js',
				],
			},
			base: {
				tasks: [
					'copy:base',
				],
				dest: [
					'./test/1+2/assets/js/020-app.js',
					'./test/1+2+4/assets/js/020-app.js',
					'./test/1+3/assets/js/020-app.js',
					'./test/1+4/assets/js/020-app.js',
					'./test/1+svg/assets/js/020-app.js',
					'./test/all/assets/js/020-app.js',
				],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Banner
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		font: {
			options: {
				space: false,
				maxLength: 13,
			},

			title: {
				text: ' GUI POC',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Wakeup
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		wakeup: {
			wakeme: {
				options: {
					randomize: true,
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// server
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		connect: {
			server: {
				options: {
					open: false,
					port: 1337,
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// watch for changes
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		watch: {
			all: {
				files: [
					'**/*',
				],
				tasks: [
					'build',
					'wakeup',
				],
			},
		},

	});



	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Tasks breakdown
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('build', [
		'multidest',
		'concat',
		'multidest:mixins',
		'less',
	]);


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Build tasks
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('default', [
		'font',
		'clean:pre',
		'build',
		'wakeup',
		'clean:post',
		'watch',
	]);

};