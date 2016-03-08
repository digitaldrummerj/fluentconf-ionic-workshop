'use strict';

var gulp = require('gulp'),
  plugins = {
    angularFilesort: require('gulp-angular-filesort'),
    naturalSort: require('gulp-natural-sort'),
    inject: require('gulp-inject'),
    concat: require('gulp-concat')
  };

var config = require('./config'),
  paths = config.paths,
  files = config.files,
  fileCollections = config.fileCollections;

var filesToWatch = [
  files.distCss,
  files.scripts,
  '!' + files.bowerComponents
];

function injectJsAndCss() {
  return gulp.src(files.indexHtml)
    .pipe(plugins.inject(
      gulp.src(fileCollections.scripts)
        .pipe(plugins.naturalSort())
        .pipe(plugins.angularFilesort()),
      { relative: true }))
    .pipe(gulp.dest(paths.app))
    .pipe(plugins.inject(
      gulp.src(files.distCss, { read: false }),
      { relative: true }))
    .pipe(gulp.dest(paths.app));
}


module.exports = {
  injectJsAndCss: injectJsAndCss,
  filesToWatch: filesToWatch
  
};