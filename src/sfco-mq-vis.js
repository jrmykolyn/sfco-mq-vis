// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const React = require( 'react' );
const ReactDOM = require( 'react-dom' );

// Project
const App = require( './components/App' );

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
/// TODO[@jrmykolyn] - Consider converting to an `MqVis` class method.
function getDefaults() {
	return {
		queries: [],
	};
}

/// TODO[@jrmykolyn] - Consider converting to an `MqVis` class method.
function sanitizeOpts( opts ) {
	opts = ( opts && typeof opts === 'object' ) ? JSON.parse( JSON.stringify( opts ) ) : getDefaults();

	if ( !Array.isArray( opts.queries ) ) {
		opts.queries = [];
	}

	opts.queries = opts.queries
		.filter( ( query ) => {
			return ( query && typeof query === 'object' );
		} )
		.map( ( query ) => {
			let features = ( Array.isArray( query.features ) ) ? query.features : [];

			features = features
				.filter( ( feature ) => {
					return ( feature && typeof feature === 'object' );
				} )
				.filter( ( feature ) => {
					return ( feature.key && feature.value );
				} );

			return Object.assign( query, { features } );
		} );

	return opts;
}

/// TODO[@jrmykolyn] - Consider converting to an `MqVis` class method.
/// TODO[@jrmykolyn] - Consider refactoring into a `do...while`.
function validateOpts( opts ) {
	opts = ( opts && typeof opts === 'object' ) ? opts : getDefaults();

	// Ensure that `opts` object includes a valid `queries` array.
	if ( !opts.queries || !Array.isArray( opts.queries ) ) {
		return null;
	}

	// Ensure that `queries` array contains at least 1x `query` object.
	if ( !opts.queries.length || !opts.queries[ 0 ] || typeof opts.queries[ 0 ] !== 'object' ) {
		return null;
	}

	// Ensure that each `query` object contains a valid `features` array.
	if ( !Array.isArray( opts.queries[ 0 ].features ) || !opts.queries[ 0 ].features.length ) {
		return null;
	}

	// Ensure that each `feature` object contains the correct properties.
	if ( typeof opts.queries[ 0 ].features[ 0 ].key === undefined || typeof opts.queries[ 0 ].features[ 0 ].value === undefined ) {
		return null;
	}

	return opts;
}

// --------------------------------------------------
// DEFINE CLASS
// --------------------------------------------------
var MqVis = ( function() {
	/**
	 * Initalizing function.
	 *
	 * @param {Object} `opts`
	 */
	function MqVis( opts ) {
		// On instantiation, massage `opts` into correct shape via `sanitizeOpts()`.
		opts = sanitizeOpts( opts );

		var defaults = getDefaults();
		var settings = Object.assign( defaults, opts );

		// Build HTML and add to DOM.
		var target = document.createElement( 'div' );
		target.setAttribute( 'id', 'sfcoMqVisTarget' );
		target.setAttribute( 'style', 'position: relative; z-index: 999999' );
		document.body.appendChild( target );

		// Render React component in new DOM node.
		ReactDOM.render(
			<App data={ opts } />,
			document.getElementById( 'sfcoMqVisTarget' )
		);

		// Update instance state/props.
		this.isInitialized = true;

		return this;
	}

	/**
	 * Function provides an interface for updating the `MqVis` instance.
	 *
	 * @param {Object} `opts`
	 */
	MqVis.prototype.update = function( opts ) {
		// On update, `opts` must be valid.
		opts = validateOpts( opts );

		// Break out of method if:
		// - `opts` are not valid;
		// - OR instance has not been init'd.
		if ( !opts || !this.isInitialized ) {
			var e = new CustomEvent( 'SFCO_MQ_VIS_UPDATE_FAILED', { detail: { data: opts } } );

			window.dispatchEvent( e );

			return;
		}

		// Otherwise, emit 'update' event.
		var e = new CustomEvent( 'SFCO_MQ_VIS_UPDATE', { detail: { data: opts } } );

		window.dispatchEvent( e );
	}

	return MqVis;
} )();

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = MqVis;
