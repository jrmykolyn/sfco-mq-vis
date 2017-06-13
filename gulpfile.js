// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
const gulp = require( 'gulp' );
const browserify = require( 'gulp-browserify' );
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

gulp.task( 'watch', function() {
	gulp.watch( PATHS.demoScriptsSrc, [ 'scripts' ] );
} );
