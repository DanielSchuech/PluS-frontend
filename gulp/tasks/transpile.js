var gulp = require('gulp');
var ts = require('gulp-typescript');
var config = require('../config');
 
gulp.task('transpile', function () {
	return gulp.src(config.server.src)
		.pipe(ts({
			noImplicitAny: true,
			module: 'commonjs'
		}))
		.pipe(gulp.dest(config.server.dest));
});
