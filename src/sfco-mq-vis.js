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
// DEFINE CLASS
// --------------------------------------------------
var MqVis = ( function() {
	/**
	 * Initalizing function.
	 *
	 * @param {Object} `opts`
	*/
	function MqVis( opts ) {
		opts = ( opts && typeof opts === 'object' ) ? opts : {};

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

		return _this;
	}

	return MqVis;
} )();

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = MqVis;
