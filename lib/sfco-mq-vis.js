// --------------------------------------------------
// PRIVATE VARS.
// --------------------------------------------------
var DEFAULTS = {
	identifiers: {
		namespace: 'sfco-mq-vis',
		wrapper: 'wrapper',
		item: 'item',
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
	decBlock += 'background-color: #222;';
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
	decBlock += 'max-width: 400px;';
	decBlock += 'height: auto;';
	decBlock += 'display: block;';
	decBlock += 'color: #FFF;';
	decBlock += 'background-color: #2ecc71;';
	decBlock += 'margin: 0 auto;';
	decBlock += 'margin-bottom: 10px;';
	decBlock += 'padding: 20px;';
	decBlock += 'opacity: 0.2;';
	decBlock += '-webkit-transition: transform 0.2s ease-in-out, transform 0.2s ease-in-out, opacity 0.2s, background-color 0.2s;';
	decBlock += 'transition: transform 0.2s ease-in-out, transform 0.2s ease-in-out, opacity 0.2s, background-color 0.2s;';

	sheet.insertRule( getClass( 'item' ) + '{' + decBlock + '}', 0 );

	// ...
	decBlock = '';
	decBlock += 'opacity: 0.4;';

	sheet.insertRule( getClass( 'item' ) + ':hover {' + decBlock + '}', 0 );

	// ...
	decBlock = '';
	decBlock += 'width: 100%;';
	decBlock += 'height: auto;';
	decBlock += 'display: block;';
	decBlock += 'font-family: monospace;';
	decBlock += 'font-size: 16px;';
	decBlock += 'font-weight: 400;';
	decBlock += 'text-align: center;';
	decBlock += 'line-height: 1;';
	decBlock += 'white-space: nowrap;';
	decBlock += 'text-overflow: ellipsis;';
	decBlock += 'overflow: hidden;';

	sheet.insertRule( getClass( 'text' ) + '{' + decBlock + '}', 0 );

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
		textElem = document.createElement( 'span' ),
		features = queryData.features || [],
		textNodeArr = [],
		textNode;

	elem.setAttribute( 'class', getClass( 'item', { nameOnly: true } ) + ' ' + classSelector );
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
// PUBLIC FUNCTIONS
// --------------------------------------------------
/**
 * Initalizing function.
 *
 * @param {Object} `opts`
*/
function mqVis( opts ) {
	opts = opts || null;

	// Break out of function if no `opts` provided.
	if ( !opts ) { throw 'Did not receive `opts` argument on initialization.'; }

	// Add 'base' stylesheets to document.
	buildAndInsertBaseStyles();

	// Declare vars.
	var wrapper = buildAndReturnWrapperElem(),
		sheets = [];

	if ( opts.queries ) {
		for ( var i = 0, x = opts.queries.length; i < x; i ++ ) {
			var query = opts.queries[i],
				classSelector,
				elem;

			// Build selector.
			classSelector = buildClassSelector();

			// Construct styles and add to DOM.
			sheets.push( buildStyleElemAndAddToDOM( query, classSelector ) );

			// Build elem.
			elem = buildHTMLElem( query, classSelector );

			// Add elem. to `wrapper`.
			addElemToContainer( elem, wrapper );
		}
	}

	// Add `wrapper` to DOM.
	addElemToContainer( wrapper, document.getElementsByTagName( 'body' )[0] );

	return { sheets: sheets };
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = mqVis;
