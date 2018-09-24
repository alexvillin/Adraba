var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserify = require('gulp-browserify'),
  concat = require('gulp-concat'),
  embedlr = require('gulp-embedlr'),
  refresh = require('gulp-livereload'),
  lrserver = require('tiny-lr')(),
  express = require('express'),
  livereload = require('connect-livereload')
  livereloadport = 35729,
  serverport = 5000,
  paths = {
    sassFiles: 'sass/*.scss',
    scriptFiles: 'js/*.js',
    viewFiles: 'views/*.html',
    staticDir: 'static'
  };

//We only configure the server here and start it only when running the watch task
var server = express();
//Add livereload middleware before static-middleware
server.use(livereload({
  port: livereloadport
}));
server.use(express.static(paths.staticDir));

//Task for sass using libsass through gulp-sass
gulp.task('sass', function(){
  gulp.src()
    .pipe(sass(paths.sassFiles))
    .pipe(gulp.dest('build'))
    .pipe(refresh(lrserver));
});

//Task for processing js with browserify
gulp.task('browserify', function(){
  gulp.src(paths.scriptFiles)
   .pipe(browserify())
   .pipe(concat('bundle.js'))
   .pipe(gulp.dest('build'))
   .pipe(refresh(lrserver));
});

//Task for moving html-files to the build-dir
//added as a convenience to make sure this gulpfile works without much modification
gulp.task('html', function(){
  gulp.src(paths.viewFiles)
    .pipe(gulp.dest('build'))
    .pipe(refresh(lrserver));
});

//Convenience task for running a one-off build
gulp.task('build', function() {
  gulp.run('html', 'browserify', 'sass');
});

gulp.task('serve', function() {
  //Set up your static fileserver, which serves files in the build dir
  server.listen(serverport);
});

// Requires gulp >=v3.5.0
gulp.task('watch', function () {
    gulp.watch(paths.scriptFiles, ['browserify']);
    gulp.watch(paths.sassFiles, ['sass']);
    gulp.watch(paths.viewFiles, ['html']);
});

gulp.task('default', function () {
  gulp.run('build', 'serve', 'watch');
});