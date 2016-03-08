'use strict';

var gulp = require('gulp'),
	plugins = {
		inject: require('gulp-inject'),
		sass: require('gulp-sass'),
    minifyCss: require('gulp-minify-css'),
    rename: require('gulp-rename'),
    concat: require('gulp-concat')
  };

var config = require('./config'),
	paths = config.paths,
	files = config.files;

function compileStyles() {
  return gulp.src(files.mainScss)
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(gulp.dest(paths.distStyles))
    .pipe(plugins.minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(plugins.rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.distStyles));
}

module.exports = {
	compileStyles: compileStyles
};
