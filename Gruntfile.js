/*global module:false*/
module.exports = function (grunt) {

	var path = require('path');
	require("load-grunt-tasks")(grunt);

	var config = {
			app: 'site/src',
			dist: 'site/dist'
		};

	var setting = {
		pkg: grunt.file.readJSON('package.json'),
		bowerDir: 'site/src/bower_components',
		config: config,
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/*'
					]
				}]
			}
		},
		copy: {
			// Copying all sources to a temporary dir.
			'dist': {
				files: [
					{
						expand: true,
						cwd: 'site/src',
						src: ['bower_components/**/*', 'css/**/*.css', 'js/**/*', '{fonts,icons,sprites,img}/**/*', '*.html', 'bower.json'],
						dest: 'site/dist'
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
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
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
		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= config.dist %>/js/{,*/}*.js',
						'<%= config.dist %>/css/{,*/}*.css',
						'<%= config.dist %>/img/{,*/}*.*',
						'<%= config.dist %>/css/fonts/{,*/}*.*',
						'<%= config.dist %>/*.{ico,png}'
					]
				}
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
			options: {
				cwd: '<%= config.app %>',
				dest: '<%= config.dist %>'
			},
			html: '<%= config.app %>/index.html'
		},
		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: [
					'<%= config.dist %>',
					'<%= config.dist %>/img',
					'<%= config.dist %>/css'
				]
			},
			html: ['<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.dist %>/css/{,*/}*.css']
		},
		processhtml: {
			dist: {
				files: {
					'.tmp/index.html': 'site/src/index.html'
				}
			}
		},
		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/img',
					src: '{,*/}*.{gif,jpeg,jpg,png}',
					dest: '<%= config.dist %>/img'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/img',
					src: '{,*/}*.svg',
					dest: '<%= config.dist %>/img'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					src: '{,*/}*.html',
					dest: '<%= config.dist %>'
				}]
			}
		}
	};

	// Project configuration.
	grunt.initConfig(setting);

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
		'clean',
		'default',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'copy:release',
//		'rev',
		'usemin',
		'htmlmin'
	]);

	grunt.registerTask('serve', function (target) {
		grunt.task.run([
			'clean:dist',
			'less',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});
};
