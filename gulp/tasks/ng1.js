'use strict';

var config     = require('../config');
var gulp       = require('gulp');

gulp.task('ng1bundle', function() {

  return gulp.src(config.ng1.src)
    .pipe(gulp.dest(config.ng1.dest))

});