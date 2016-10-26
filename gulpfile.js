"use strict";

var gulp = require('gulp'),
  useref = require('gulp-useref'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    maps = require('gulp-sourcemaps'),
     del = require('del');

var options = {
  src: 'src/',
  dist: 'dist/'
};

gulp.task('compileSass', function() {
  return gulp.src(options.src + "scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest(options.src + 'css'));
});

gulp.task('watchFiles', function() {
  gulp.watch(options.src + 'scss/**/*.scss', ['compileSass']);
  // gulp.watch(options.src + 'js/main.js', ['concatScripts']);
})

gulp.task('clean', function() {
  del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task('html', function() {
  return gulp.src(options.src + 'index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', csso()))
    .pipe(gulp.dest(options.dist));
});

gulp.task("build", ['html'], function() {
  return gulp.src([options.src + "img/**/*"], { base: options.src})
            .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
