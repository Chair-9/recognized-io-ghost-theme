'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var bower = require('gulp-bower');

var config = {
  scssDir:  'assets/scss',
  bowerDir: 'bower_components'
}

gulp.task('bower', function(){
  return bower()
    .pipe(gulp.dest(config.bowerDir))
});

gulp.task('sass', function () {
  gulp.src(config.scssDir + '/**/*.scss')
    .pipe(
      sass({
        includePaths: [
          config.scssDir,
          config.bowerDir + "/normalize-css",
          config.bowerDir + "/bourbon/app/assets/stylesheets",
          config.bowerDir + "/neat/app/assets/stylesheets",
        ]
      }).on('error', notify.onError(function(error){
        return "Error: " + error.message;
      }))
    ).pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(config.scssDir + '/**/*.scss', ['sass']);
});

gulp.task('dev',['bower', 'sass:watch']);
