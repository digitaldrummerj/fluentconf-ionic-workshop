
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');

var sh = require('shelljs');

var config = require('./gulp/config'),
    paths = config.paths,
    files = config.files,
    fileCollections = config.fileCollections;

var styles = require('./gulp/styles');
gulp.task('sass', styles.compileStyles);

var inject = require('./gulp/inject');
gulp.task('inject', inject.injectJsAndCss);

gulp.task('default', ['sass', 'inject']);

gulp.task('watch', function () {
    gulp.watch(files.styles, ['sass']);
    gulp.watch(inject.filesToWatch, ['inject']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        gutil.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
            );
        process.exit(1);
    }
    done();
});

