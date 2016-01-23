'use strict';

/* ================================
 * Dependencies
 * ================================ */

var gulp        = require('gulp');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync').create();
var notify      = require('gulp-notify');
var jscs        = require('gulp-jscs');
var jsStylish   = require('gulp-jscs-stylish');
var noop        = function () {};
var browserify  = require('gulp-browserify');
var uglify      = require('gulp-uglify');



/* ================================
 * Config variables
 * ================================ */

var docRoot = './';
var assets = docRoot + 'src/';

// JS Code Style options
var jscsOptions = {
	src  : [assets + 'js/*.js'],
	opts : {
		config : '.jscsrc',

	}
};

// Notify options
var notifyOptions = {
	sound : false
};

// Browser Sync options
var browserSyncOptions = {
	watchTask: true,
	open: false,
	server: {
		baseDir: './'
	}
};

// Watch options
var watchOptions = [
	// surveille les fichiers php pour l'intégration
	docRoot + 'index.html',
	// surveille les fichiers js
	docRoot + 'dist/js/app.js',
];


/* ================================
 * Tasks
 * ================================ */

// JS Code Style linting
gulp.task('js-lint', function () {

	return gulp.src(jscsOptions.src)
		.pipe(jscs())
		.on('error', noop)
		.pipe(jsStylish())
});

// Browserify
gulp.task('scripts', function() {
	// Single entry point to browserify
	gulp.src(assets +'js/app.js')
		.pipe(browserify())
		.pipe(gulp.dest('./dist/js'))
});

// Uglify
gulp.task('uglify', function() {
	gulp.src(assets +'js/app.js')
		.pipe(browserify())
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
});

// Watch
gulp.task('watch', ['scripts'], function() {
	browserSync.init(browserSyncOptions);

	gulp.watch(docRoot +'src/js/app.js', ['scripts']);
	gulp.watch(watchOptions).on('change', browserSync.reload);
});

gulp.task('default', ['watch']);