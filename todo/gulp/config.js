'use strict';

var appRoot = 'www';
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

var paths = {
  bowerComponents: appRoot + '/lib',
  nodeModules: appRoot + '/node_modules',
  scssRoot: './scss',
  appStyles: appRoot + '/styles',
  app: appRoot,
  distStyles: appRoot + '/css',
  scripts: appRoot + '/js'
};

var files = {
  bowerComponents: paths.bowerComponents + '/**/*',
  nodeModules: paths.nodeModules + '/**/*',
  scripts: paths.scripts + '/**/*.js',
  styles: paths.scssRoot + '/**/*.scss',
  mainScss: paths.scssRoot + '/ionic.app.scss',
  indexHtml: paths.app + '/index.html',
  packageJson: 'package.json',
  bowerJson: 'bower.json',
  distCss: paths.distStyles + '/**/*.css'
};

var fileCollections = {
  scripts: [
		files.scripts,
    '!' + files.bowerComponents,
	],
	styles: [
    files.styles,
    '!' + files.bowerComponents,
    '!' + files.distCss
  ]
};

module.exports = {
	paths: paths,
	files: files,
	fileCollections: fileCollections
};
