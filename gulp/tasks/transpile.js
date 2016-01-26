var gulp = require('gulp');
var ts = require('gulp-typescript');
var config = require('../config');
 
gulp.task('transpileServer', function () {
	return gulp.src(config.server.src)
		.pipe(ts({
		  target: 'es5',
		  module: 'commonjs',
			noImplicitAny: true,
      sourceMap: true,
			experimentalDecorators: true,
			emitDecoratorMetadata: true
		}))
		.pipe(gulp.dest(config.server.dest));
});

gulp.task('transpileClient', function () {
	return gulp.src(config.scripts.src)
		.pipe(ts({
		  target: "ES5",
      module: "system",
      moduleResolution: "node",
      sourceMap: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      removeComments: false,
      noImplicitAny: false
		}))
		.pipe(gulp.dest(config.scripts.dest));
});
