//From http://stackoverflow.com/questions/25384796/can-i-set-gulp-livereload-to-run-after-all-files-are-compiled

var express = require('express');
var gulp = require('gulp');

var jade = require('gulp-jade');
var sass = require('gulp-sass');
//var gutil = require('gulp-util');
//var uglify = require('gulp-uglify');
var connect = require('connect-livereload');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');

var sources = {
    jade: "./*.jade",
    sass: "./scss/*.scss",
    js: "./*.js"
};

// Define destinations object
var dest = {
    html: "./",
    css: "./css/",
    js: "./js/"
};

// Compile and copy Jade
gulp.task("jade", function (event) {
    return gulp.src(sources.jade)
        .pipe(jade({
            //pretty: true
        }))
        .pipe(gulp.dest(dest.html))
});

gulp.task('sass-sources', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./css'));
});
gulp.task('sass', function (event) {
    return gulp.src(sources.sass)
        .pipe(sass({
            //outputStyle: 'compressed'
        })
        .on('error', sass.logError))
        .pipe(gulp.dest(dest.css))
});
// Minify and copy all JavaScript
//gulp.task('scripts', function () {
//    gulp.src(sources.scripts)
//        .pipe(uglify())
//        .pipe(gulp.dest(destinations.js));
//});
//babel

// Server
gulp.task('server', function () {
    var app = express();
    app.use(connect());
    app.use(express.static(__dirname));
    //app.listen(4000, '127.0.0.1');
});

// Watch sources for change, executa tasks
gulp.task('watch', function () {
    livereload.listen({
        host: '127.0.0.1',
        port: 37687,
    });
    gulp.watch(sources.jade, ["jade", "refresh"]);
    gulp.watch(sources.sass, ["sass", "refresh"]);
    gulp.watch(sources.js, ["refresh"]);
    
});

gulp.task("refresh", function () {
    livereload();
    console.log('LiveReload is triggered');
});

// Define default task
gulp.task("default", ["jade", "sass", "watch"]);