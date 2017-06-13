(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
var MqVis = require( '../../../' );

// --------------------------------------------------
// INIT
// --------------------------------------------------
window.MqVis = MqVis;

},{"../../../":2}],2:[function(require,module,exports){
/**
 * MQ Vis. (Media Query Visualizer) is a JavaScript utility that allows developers to quickly 'visualize' one or more media queries.
 *
 * On initialization, MQ Vis. is given a series of objects containing media query information (media type, features, etc.).
 * MQ Vis. builds an HTML element and stylesheet for each query, and inserts both into the DOM.
 *
 * When a given query is satisfied, its associated HTML element will become visible within the viewport.
 *
 * @summary   MQ Vis. is a JavaScript utility that allows developers to quickly 'visualize' one or more media queries.
 *
 * @link      N/A
 * @since     0.0.0
 * @requires  N/A
 *
 * @author    Jesse R Mykolyn <jrmykolyn@gmail.com>
*/

// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Project
const mqVis = require( './lib/sfco-mq-vis' );

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = mqVis;

},{"./lib/sfco-mq-vis":3}],3:[function(require,module,exports){
// --------------------------------------------------
// PRIVATE VARS.
// --------------------------------------------------
var DEFAULTS = {
	identifiers: {
		namespace: 'sfco-mq-vis',
		wrapper: 'wrapper',
		item: 'item',
		itemDismiss: 'item-dismiss',
		text: 'text',
		joinWith: '-'
	}
};

// --------------------------------------------------
// PRIVATE FUNCTIONS
// --------------------------------------------------
/**
 * ...
 */
function getClass( type, options ) {
	options = ( options && typeof options === 'object' ) ? options : {};

	try {
		var className = DEFAULTS.identifiers.namespace + DEFAULTS.identifiers.joinWith + DEFAULTS.identifiers[ type ];

		return ( options.nameOnly ) ? className : '.' + className;
	} catch ( err ) {
		console.log( err );

		return '';
	}
}


/**
 * ...
 */
/// TODO[@jrmykolyn] - Add documentation.
/// TODO[@jrmykolyn] - Consolidate <style> elem. costruction with duplicate logic in other function.
function buildAndInsertBaseStyles() {
	var styleElem = document.createElement( 'style' );
	var sheet;

	// WebKit hack, borrowed from David Walsh:
	// Insert empty text node into `styleElem`.
	styleElem.appendChild( document.createTextNode( '' ) );

	// Add `styleElem` to DOM.
	document.head.appendChild( styleElem );

	// Update `sheet` var.
	// NOTE: Will error if assignment occurs *before* the <style> elem. is added to the DOM.
	sheet = styleElem.sheet;

	// Build and insert rule(s).
	var decBlock = '';

	// ...
	decBlock += 'width: 100%;';
	decBlock += 'height: 100%;';
	decBlock += 'display: block;';
	decBlock += 'background-color: #EFEFEF;';
	decBlock += 'margin: 0;';
	decBlock += 'padding: 50px 20px;';
	decBlock += 'position: fixed;';
	decBlock += 'top: 0;';
	decBlock += 'left: 0;';
	decBlock += 'overflow: auto;';

	sheet.insertRule( getClass( 'wrapper' ) + '{' + decBlock + '}', 0 );

	// ...
	decBlock = '';
	decBlock += 'width: 100%;';
	decBlock += 'max-width: 600px;';
	decBlock += 'height: auto;';
	decBlock += 'display: block;';
	decBlock += 'color: #FFF;';
	decBlock += 'background-color: #666;';
	decBlock += 'margin: 0 auto;';
	decBlock += 'margin-bottom: 10px;';
	decBlock += 'padding: 20px; 50px;';
	decBlock += 'opacity: 0.3;';
	decBlock += '-webkit-transition: transform 0.2s ease-in-out, transform 0.2s ease-in-out, opacity 0.2s, background-color 0.2s;';
	decBlock += 'transition: transform 0.2s ease-in-out, transform 0.2s ease-in-out, opacity 0.2s, background-color 0.2s;';
	decBlock += 'position: relative;';

	sheet.insertRule( getClass( 'item' ) + '{' + decBlock + '}', 0 );

	// ...
	decBlock = '';
	decBlock += 'width: 100%;';
	decBlock += 'height: auto;';
	decBlock += 'display: block;';
	decBlock += 'color: #000;';
	decBlock += 'font-family: Helvetica, Arial, sans-serif;';
	decBlock += 'font-size: 18px;';
	decBlock += 'font-weight: 500;';
	decBlock += 'text-align: center;';
	decBlock += 'line-height: 1;';
	decBlock += 'letter-spacing: 0.5px;';
	decBlock += 'white-space: nowrap;';
	decBlock += 'text-overflow: ellipsis;';
	decBlock += 'overflow: hidden;';
	decBlock += 'opacity: 0.8;';

	sheet.insertRule( getClass( 'text' ) + '{' + decBlock + '}', 0 );

	// ...
	decBlock = '';
	decBlock += 'width: 26px;';
	decBlock += 'height: 26px;';
	decBlock += 'display: block;';
	decBlock += 'position: absolute;';
	decBlock += 'top: 50%;';
	decBlock += 'right: 15px;';
	decBlock += '-webkit-transform: translateY( -50% );';
	decBlock += 'transform: translateY( -50% );';
	decBlock += 'opacity: 0.5;';
	decBlock += '-webkit-transition: all 0.25s;';
	decBlock += 'transition: all 0.25s;';

	sheet.insertRule( getClass( 'itemDismiss' ) + '{' + decBlock + '}', 0 );

	// ...
	decBlock = '';
	decBlock += 'opacity: 1;';

	sheet.insertRule( getClass( 'itemDismiss' ) + ':hover, ' + getClass( 'itemDismiss' ) + ':focus {' + decBlock + '}', 0 );

	// ...
	decBlock = '';
	decBlock += 'content: "";';
	decBlock += 'width: 80%;';
	decBlock += 'height: 3px;';
	decBlock += 'display: block;';
	decBlock += 'background-color: #000;';
	decBlock += 'position: absolute;';
	decBlock += 'top: 50%;';
	decBlock += 'left: 50%;';
	decBlock += '-webkit-transform: translate( -50%, -50% ) rotate( 45deg );';
	decBlock += 'transform: translate( -50%, -50% ) rotate( 45deg );';
	decBlock += 'transform-origin: center;';

	console.log( decBlock );

	sheet.insertRule( getClass( 'itemDismiss' ) + '::before {' + decBlock + '}', 0 );

	// ...
	decBlock += '-webkit-transform: translate( -50%, -50% ) rotate( 135deg );';
	decBlock += 'transform: translate( -50%, -50% ) rotate( 135deg );';

	sheet.insertRule( getClass( 'itemDismiss' ) + '::after {' + decBlock + '}', 0 );

	return styleElem;
}


/**
 * Function adds a given `elem` to the target `container`.
 *
 * @param {HTMLElement} `elem`
 * @param {HTMLElement} `container`
*/
function addElemToContainer( elem, container ) {
	container.appendChild( elem );
}


/**
 * Creates and returns a new 'wrapper' HTML element.
 *
 * NOTE:
 * - All 'breakpoint elements' are inserted into 'wrapper'.
 *
 * @return {HTMLElement}
*/
function buildAndReturnWrapperElem() {
	var wrapper = document.createElement( 'div' );

	wrapper.setAttribute( 'class' , getClass( 'wrapper', { nameOnly: true } ) );

	return wrapper;
}


/**
 * Given a 'query data' object and a selector string,
 * the function builds a new HTML element wih the correct
 * attributes and content. The new element is returned.
 *
 * @param {Object} `queryData`
 * @param {String} `classSelector`
 * @return {HTMLElement}
*/
function buildHTMLElem( queryData, classSelector ) {
	queryData = queryData || {};
	classSelector = classSelector || '';

	var elem = document.createElement( 'div' ),
		dismissElem = document.createElement( 'a' ),
		textElem = document.createElement( 'span' ),
		features = queryData.features || [],
		textNodeArr = [],
		textNode;

	elem.setAttribute( 'class', getClass( 'item', { nameOnly: true } ) + ' ' + classSelector );
	dismissElem.setAttribute( 'class', getClass( 'itemDismiss', { nameOnly: true } ) );
	dismissElem.setAttribute( 'href', '#' );
	textElem.setAttribute( 'class', getClass( 'text', { nameOnly: true } ) );

	features.forEach( function( feature ) {
		var key = feature.key;
		var value = feature.value;

		if ( key && typeof key === 'string' ) {
			textNodeArr.push( buildFeatureString( key, value ) );
		}
	} );

	textNode = textNodeArr.join( ' and ' );

	textElem.appendChild( document.createTextNode( textNode ) );
	elem.appendChild( textElem );
	elem.appendChild( dismissElem );

	return elem;
}


/**
 * Given an object of 'query data', function builds
 * and returns a unique selector for the current query.
 *
 * @param {Object} `queryData`
 * @return {String}
*/
function buildClassSelector() {
	var output = getClass( 'item', { nameOnly: true } ) + '--',
		numStr = Math.random().toString().substring( 2, 20 );

	return output + numStr;
}


/**
 * Given the 'query data' and the selector, the function builds
 * a stylesheet (<style> elem.) with the appropriate media type
 * and features, adds it to the DOM, and returns a reference to
 * the elemenet's `sheet` property.
 *
 * @param {Object} `queryData`
 * @param {String} `classSelector`
 * @return {Object}
*/
function buildStyleElemAndAddToDOM( query, classSelector ) {
	query = query || {};
	classSelector = classSelector || '';

	// Create the <style> tag
	var styleElem = document.createElement( 'style' ),
		sheet;

	// Build media query string.
	var mediaQuery = buildMediaQueryFromOpts( query );

	styleElem.setAttribute( 'media' , mediaQuery );

	// WebKit hack, borrowed from David Walsh:
	// Insert empty text node into `styleElem`.
	styleElem.appendChild( document.createTextNode( '' ) );

	// Add `styleElem` to DOM.
	document.head.appendChild( styleElem );

	// Update `sheet` var.
	// NOTE: Will error if assignment occurs *before* the <style> elem. is added to the DOM.
	sheet = styleElem.sheet;

	// Build styles
	var rule = '';
	var decBlock = '';

	decBlock += 'background-color: #2ecc71;';
	decBlock += 'opacity: 1 !important;';

	rule = '.' + classSelector + ' { ' + decBlock + ' }';


	// Insert rule into `sheet`.
	sheet.insertRule( rule , 0 );

	return sheet;
}


/**
 * Given a 'query data' object, function creates and
 * returns a new media query string.
 *
 * @param {Object} `queryData`
 * @return {String}
*/
function buildMediaQueryFromOpts( query ) {
	query = query || {};

	// Initialize local vars.
	var output = '',
		type = query.type || 'all',
		features = query.features || null,
		conditions = [];

	features.forEach( function( feature ) {
		var key = feature.key;
		var value = feature.value;

		if ( key && typeof key === 'string' ) {
			conditions.push( buildFeatureString( key, value ) );
		}
	} );

	output += type;

	if ( conditions.length ) {
		output += ' and ';
		output += conditions.join( ' and ' );
	}

	return output;
}


/**
 * Function creates a new 'feature string' for a give
 * media query feature (eg. 'width', 'height', etc.).
 *
 * @param {String} `featureKey`
 * @param {Object} `featureData`
 * @return {String}
*/
function buildFeatureString( key, value ) {
	key = ( typeof key === 'string' ) ? key : '';
	value = ( typeof key !== 'undefined' ) ? value : null;

	var output = '';

	output += '(';
	output += key;
	output += ':';
	output += value;
	output += ')';

	return output;
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
		opts = opts || null;

		this.sheets = [];
		this.wrapper = buildAndReturnWrapperElem();

		// Break out of function if no `opts` provided.
		if ( !opts ) { throw 'Did not receive `opts` argument on initialization.'; }

		// Add 'base' stylesheets to document.
		buildAndInsertBaseStyles();

		if ( opts.queries ) {
			for ( var i = 0, x = opts.queries.length; i < x; i ++ ) {
				var query = opts.queries[i],
					classSelector,
					elem;

				// Build selector.
				classSelector = buildClassSelector();

				// Construct styles and add to DOM.
				this.sheets.push( buildStyleElemAndAddToDOM( query, classSelector ) );

				// Build elem.
				elem = buildHTMLElem( query, classSelector );

				// Add elem. to `wrapper`.
				addElemToContainer( elem, this.wrapper );
			}
		}

		// Add `wrapper` to DOM.
		addElemToContainer( this.wrapper, document.getElementsByTagName( 'body' )[0] );

		// Add event listeners.
		window.addEventListener( 'click', function( e ) {
			if ( e.target.classList.contains( getClass( 'itemDismiss', { nameOnly: true } ) ) ) {
				e.target.parentNode.remove();
			}
		} );

		return this;
	}

	return MqVis;
} )();

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = MqVis;

},{}]},{},[1])