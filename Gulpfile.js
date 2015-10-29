'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var bower = require('gulp-bower');
var autoprefixer = require('gulp-autoprefixer');
var zip = require('gulp-zip');

var config = {
  scssDir:  'assets/scss',
  bowerDir: 'bower_components'
}

gulp.task('bower', function(){
  return bower()
    .pipe(gulp.dest(config.bowerDir))
});

gulp.task('sass', function() {
  gulp.src(config.scssDir + '/**/*.scss')
    .pipe(
      sass({
        includePaths: [
          config.scssDir,
          config.bowerDir + "/bourbon/app/assets/stylesheets",
          config.bowerDir + "/neat/app/assets/stylesheets",
        ]
      }).on('error', notify.onError(function(error){
        return "Error: " + error.message;
      })))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', function() {
  gulp.watch(config.scssDir + '/**/*.scss', ['sass']);
});

gulp.task('build:zip', function() {
  gulp.src([
      "./**/*",
      '!Gulpfule.js',
      '!./assets/scss/**/*',
      '!./bower_components/**/*',
      '!./dist/**/*',
      '!./node_modules/**/*'
     ])
    .pipe(zip('theme.zip'))
    .pipe(gulp.dest("dist"))
});

gulp.task('build', ['bower', 'sass', 'build:zip']);

gulp.task('dev',['bower', 'sass:watch']);
