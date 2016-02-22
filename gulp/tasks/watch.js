var config = require('../config');
var gulp = require('gulp');

gulp.task('watch', function () {

  gulp.watch([config.server.src], ['transpileServer']);
  gulp.watch([config.scripts.src], ['transpileClient']);
  gulp.watch([config.json.src], ['cpjson']);
  gulp.watch([config.views.src], ['views']);
  gulp.watch([config.ng1.src], ['ng1bundle']);
  
});
