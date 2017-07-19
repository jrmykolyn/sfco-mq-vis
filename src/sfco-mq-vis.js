// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const React = require( 'react' );
const ReactDOM = require( 'react-dom' );

// Project
const App = require( './components/app' );

// --------------------------------------------------
// PRIVATE VARS.
// --------------------------------------------------
var DEFAULTS = {
	identifiers: {
		namespace: 'sfco-mq-vis',
		wrapper: 'wrapper',
		wrapperInner: 'wrapper__inner',
		item: 'item',
		itemDismiss: 'item-dismiss',
		text: 'text',
		joinWith: '-'
	}
};

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

		var _this = this;

		/// TODO[@jrmykolyn] - Review assignment below, remove if possible.
		_this.sheets = [];

		/// TODO[@jrmykolyn] - Remove block below.
		// Add 'base' stylesheets to document.
		// buildAndInsertBaseStyles();

		/// TEMP - START
		var target = document.createElement( 'div' );
		target.setAttribute( 'id', 'sfcoMqVisTarget' );
		target.setAttribute( 'style', 'position: relative; z-index: 999999' );
		document.body.appendChild( target );

		ReactDOM.render(
			<App data={ opts } />,
			document.getElementById( 'sfcoMqVisTarget' )
		);
		/// TEMP - END

		// _this.update( opts );

		_this.isInitialized = true;

		return _this;
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
