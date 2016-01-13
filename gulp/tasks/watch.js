var config = require('../config');
var gulp = require('gulp');

gulp.task('watch', function () {

  gulp.watch([config.server.src], ['transpile']);
  
});
