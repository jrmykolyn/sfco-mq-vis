/** global
	console
*/

/**
 * BP Vis. is a JavaScript utility that allows developers
 * to quickly 'visualize' one or more media queries.
 *
 * On initialization, BP Vis. is given a series of objects
 * containing media query information (media type, features,
 * etc.). BP Vis. builds an HTML element and stylesheet for
 * each query, and inserts both into the DOM.
 *
 * When a given query is satisfied, its associated HTML element
 * will become visible within the viewport.
 *
 * @summary   BP Vis. is a JavaScript utility that allows developers
 * 						to quickly 'visualize' one or more media queries.
 *
 * @link      N/A
 * @since     0.0.0
 * @requires  N/A
 *
 * @author    Jesse R Mykolyn <jrmykolyn@gmail.com>
*/

try {

	( function() {
		/* -------------------------------------------------- */
		/* Private Functions */
		/* -------------------------------------------------- */
		/**
		 * Initalizing function.
		 *
		 * @param {Object} `opts`
		*/
		function init( opts ) {
			opts = opts || null;

			// Break out of function if no `opts` provided.
			if ( !opts ) { throw 'Did not receive `opts` argument on initialization.'; }

			// Construct, insert, and return `wrapper`.
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
			var styles = '';

			styles += 'width: 90%;';
			styles += 'max-width: 300px;';
			styles += 'display: block;';
			styles += 'margin: 0;';
			styles += 'padding: 0;';
			styles += 'position: fixed;';
			styles += 'top: 0;';
			styles += 'left: 0;';
			styles += 'transform: translateX( -100% );';

			wrapper.setAttribute( 'class' , 'sfco-bp-vis-wrapper' );
			wrapper.setAttribute( 'style' , styles );

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

			elem.setAttribute( 'class', 'sfco-bp-vis-item ' + classSelector );
			textElem.setAttribute( 'class', 'sfco-bp-vis-text' );

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
			var output = 'sfco-bp-vis-item--',
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

			// Insert rule into `sheet`.
			sheet.insertRule( '.'  + classSelector + ' { background-color: #20B2AA; transform: translateX( 100% ) !important; opacity: 1 !important; }', 0 );

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

		/* -------------------------------------------------- */
		/* Public API */
		/* -------------------------------------------------- */
		if ( typeof window.sfcoBpVis === 'undefined' ) {
			window.sfcoBpVis = init;
		}
	} )();

} catch ( error ) {
	console.log( 'ERROR: Failed to execute `sfcoBpVis` due to the following:' );
	console.log( error );
}
