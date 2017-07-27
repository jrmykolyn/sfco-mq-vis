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
function validateOpts( opts ) {
	opts = ( opts && typeof opts === 'object' ) ? opts : {};

	if ( !opts.queries || !Array.isArray( opts.queries ) ) {
		opts.queries = [];
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
		opts = validateOpts( opts );

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
		opts = validateOpts( opts );

		if ( !this.isInitialized ) {
			/// TODO[@jrmykolyn] - Consider logging message to console.
			return;
		}

		var e = new CustomEvent( 'SFCO_MQ_VIS_UPDATE', { detail: { data: opts } } );

		window.dispatchEvent( e );
	}

	return MqVis;
} )();

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = MqVis;
