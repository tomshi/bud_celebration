/*global module:false*/
module.exports = function (grunt) {

	var path = require('path');
	require("load-grunt-tasks")(grunt);

	grunt.registerTask("default", [
		'clean',
		'copy:dist',
		'less',
		'autoprefixer'
	]);

	grunt.registerTask("image", [
		'clean',
		'responsive_images',
		'sprite',
		'less'
	]);

	grunt.registerTask('release', [
		'clean:release',
		'default',
		'useminPrepare',
		'concat',
		'uglify',
		'cssmin',
		'usemin',
		'copy:release'
	]);

	grunt.registerTask('serve', function (target) {
		grunt.task.run([
			'clean:dist',
			'less',
			'connect:livereload',
			'watch'
		]);
	});

	var config = {
		pkg: grunt.file.readJSON('package.json'),
		bowerDir: 'site/src/bower_components',
		clean: {
			tmp: '.tmp',
			dist: 'site/src/dist/',
			release: 'site/src/release/'
		},
		copy: {
			// Copying all sources to a temporary dir.
			'dist': {
				files: [
					{
						expand: true,
						src: ['site/src/bower_components/**/*', 'site/src/css/**/*.css', '{site/src/js/**/*', 'site/src/{fonts,icons,sprites,img}/**/*', 'site/src/*.html', 'bower.json'],
						dest: '.tmp'
					}
				]
			},
			// Release the bundled scripts, all CSS, images and bower components, but not the HTML pages.
			'release': {
				files: [
					{
						expand: true,
						cwd: 'dist',
						src: ['bower_components/**/*', 'js/**/.*', '{fonts,css,sprites,img}/**/*', 'bower.json'],
						dest: 'site/release/<%= pkg.version %>'
					},
					{
						expand: true,
						cwd: 'dist/icons',
						src: ['fonts/*'],
						dest: 'site/release/<%= pkg.version %>/css'
					}
				]
			}
		},
		less: {
			development: {
				files: [
					{
						'site/src/css/main.css': 'site/src/less/main.less'
					}
				]
			}
		},
		responsive_images: {
			x2: {
				options: {
					sizes: [
						{
							name: 'i',
							width: '100%'
						}
					]
				},
				files: [
					{
						expand: true,
						cwd: 'site/src/img/',
						src: '{,*/}*.{png,jpg,jpeg}',
						dest: '.tmp/img/imgx2'
					}
				]
			},
			x1: {
				options: {
					sizes: [
						{
							name: 'i',
							width: '50%'
						}
					]
				},
				files: [
					{
						expand: true,
						cwd: 'site/src/img/',
						src: '{,*/}*.{png,jpg,jpeg}',
						dest: '.tmp/img/imgx1'
					}
				]
			}
		},
		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 2 version']
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'site/src/css',
						src: '{,*/}*.css',
						dest: 'site/src/css'
					}
				]
			}
		},
		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ['site/src/js/{,*/}*.js'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['site/src/less/{,*/}*.less'],
				tasks: ['less', 'newer:autoprefixer']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'site/src/*.html',
					'site/src/js/{,*/}*.js',
					'site/src/css/{,*/}*.css',
					'site/src/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},
		// The actual grunt server settings
		connect: {
			options: {
				port: 8010,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					base: [
						'./site/src'
					]
				}
			},
			dist: {
				options: {
					base: 'site/dist/'
				}
			}
		},
		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '*.html',
			options: {
				root: 'site/dist'
			}
		},
		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ['site/dist/*.html'],
			css: ['site/dist/css/**/*.css'],
			options: {
				assetsDirs: ['site/dist/']
			}
		},
		processhtml: {
			dist: {
				files: {
					'site/dist/index.html': 'site/src/index.html'
				}
			}
		},
		// The following *-min tasks produce minified files in the dist folder
		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: {
					'site/dist/index.html': 'site/src/index.html'
				}
			}
		},
		imagemin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '/site/img',
						src: '{,*/}*.{png,jpg,jpeg,gif}',
						dest: 'site/dist/img'
					}
				]
			}
		}
	};

	// Project configuration.
	grunt.initConfig(config);
};
