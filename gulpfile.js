// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
const gulp = require( 'gulp' );
const browserify = require( 'gulp-browserify' );
const minify = require( 'gulp-minify' );
const rename = require( 'gulp-rename' );
const PathMap = require( 'sfco-path-map' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const PATHS = new PathMap( {
	demo: './demo',
	demoSrc: '{{demo}}/src',
	demoDest: '{{demo}}/public',
	demoScriptsSrc: '{{demoSrc}}/js/**/*.js',
	demoScriptsDest: '{{demoDest}}/js'
} );

// --------------------------------------------------
// DEFINE TASKS
// --------------------------------------------------
gulp.task( 'default', [ 'scripts', 'watch' ] );

gulp.task( 'scripts', function() {
	return gulp.src( PATHS.demoScriptsSrc )
		.pipe( browserify() )
		.pipe( rename(
			function( file ) {
				file.basename = 'bundle';
				return file;
			} )
		)
		.pipe( gulp.dest( PATHS.demoScriptsDest ) );
} );

/// TODO[@jrmykolyn] - Consolidate with `scipts` task.
gulp.task( 'scripts:minify', function() {
	return gulp.src( './demo/public/js/bundle.js' ) /// TODO[@jrmykolyn] - Replace with `PATHS` ref.
		.pipe( minify( {
			ext: {
				min: '.min.js'
			}
		} ) )
		.pipe( gulp.dest( './demo/public/js' ) ); /// TODO[@jrmykolyn] - Replace with `PATHS` ref.
} );

gulp.task( 'watch', function() {
	gulp.watch( PATHS.demoScriptsSrc, [ 'scripts' ] );
} );
