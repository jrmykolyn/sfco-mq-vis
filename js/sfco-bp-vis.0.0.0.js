(function() {
	/* -------------------------------------------------- */
	/* DECLARE FUNCTIONS */
	/* -------------------------------------------------- */
	/**
	 * Initalizing function.
	 *
	 * @param {Object} `opts`
	*/
	function init(opts) {
		try {
			opts = opts || null;

			// Break out of function if no `opts` provided.
			if (!opts) { throw 'Did not receive `opts` argument on initialization.'; }

			// Construct, insert, and return `wrapper`.
			var wrapper = buildAndReturnWrapperElem(),
				sheets = [];

			if (opts.queries) {
				for (var i = 0, x = opts.queries.length; i < x; i ++) {
					var query = opts.queries[i],
						class_selector,
						elem;

					// Build selector.
					class_selector = buildClassSelector();

					// Construct styles and add to DOM.
					sheets.push(buildStyleElemAndAddToDOM(query, class_selector));

					// Build elem.
					elem = buildHTMLElem(query, class_selector);

					// Add elem. to `wrapper`.
					addElemToContainer(elem, wrapper);
				}
			}

			// Add `wrapper` to DOM.
			addElemToContainer(wrapper, document.getElementsByTagName('body')[0]);

			return { sheets: sheets };
		} catch (error) {
			console.log(error);
		}
	}


	/**
	 * Function adds a given `elem` to the target `container`.
	 *
	 * @param {HTMLElement} `elem`
	 * @param {HTMLElement} `container`
	*/
	function addElemToContainer(elem, container) {
		container.appendChild(elem);
	}


	/**
	 * Creates and returns a new 'wrapper' HTML element.
	 * All 'breakpoint elements' are inserted into 'wrapper'.
	 *
	 * @return {HTMLElement}
	*/
	function buildAndReturnWrapperElem() {
		var wrapper = document.createElement('div');

		wrapper.setAttribute('class', 'sfco-bp-vis-wrapper');

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
	function buildHTMLElem(queryData, classSelector) {
		queryData = queryData || {};
		classSelector = classSelector || '';

		var elem = document.createElement('div'),
			text_elem = document.createElement('span'),
			features = queryData.features || [],
			feature_data,
			text_node_arr = [],
			text_node;

		elem.setAttribute('class', 'sfco-bp-vis-item ' + classSelector);
		text_elem.setAttribute('class', 'sfco-bp-vis-text');

		for (var feature_key in features) {
			feature_data = features[feature_key];

			switch (feature_key) {
			case 'width':
			case 'height':

				text_node_arr.push(buildFeatureString(feature_key, feature_data));

				break;
			default:
				// DO NO THINGS;
			}
		}

		text_node = text_node_arr.join(' and ');

		text_elem.appendChild( document.createTextNode( text_node ) );
		elem.appendChild( text_elem );

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
			num_str = Math.random().toString().substring(2, 20);

		return output + num_str;
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
	function buildStyleElemAndAddToDOM(queryData, classSelector) {
		queryData = queryData || {};
		classSelector = classSelector || '';

		// Create the <style> tag
		var style_elem = document.createElement('style'),
			sheet;

		// Build media query string.
		var media_query = buildMediaQueryFromOpts(queryData);

		style_elem.setAttribute('media', media_query);

		// WebKit hack, borrowed from David Walsh:
		// Insert empty text node into `style_elem`.
		style_elem.appendChild( document.createTextNode( '' ) );

		// Add `style_elem` to DOM.
		document.head.appendChild( style_elem );

		// Update `sheet` var.
		// NOTE: Will error if assignment occurs *before* the <style> elem. is added to the DOM.
		sheet = style_elem.sheet;

		// Insert rule into `sheet`.
		sheet.insertRule('.'  + classSelector + ' { background-color: #20B2AA; margin-left: 100% !important; opacity: 1 !important; }', 0);

		return sheet;
	}


	/**
	 * Given a 'query data' object, function creates and
	 * returns a new media query string.
	 *
	 * @param {Object} `queryData`
	 * @return {String}
	*/
	function buildMediaQueryFromOpts(queryData) {
		queryData = queryData || {};

		// Initialize local vars.
		var output = '',
			media_type = queryData.type || 'all',
			features = queryData.features || null,
			features_arr = [],
			feature_data;

		if (features) {
			for (var feature_key in features) {
				feature_data = features[feature_key];

				switch (feature_key) {
				case 'width':
				case 'height':

					features_arr.push(buildFeatureString(feature_key, feature_data));

					break;
				default:
						// DO NO THINGS;
				}
			}
		}

		output += media_type;

		if (features_arr.length) {
			output += ' and ';
			output += features_arr.join(' and ');
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
	function buildFeatureString(featureKey, featureData) {
		featureKey = (typeof featureKey === 'string') ? featureKey : '';
		featureData = (typeof featureData === 'object') ? featureData : {};

		var output = '',
			arr = [],
			str = '';

		for (var key in featureData) {
			switch (key) {
			case 'min':
			case 'max':
				str = ('(' + key + '-' + featureKey + ': ' + featureData[key] + 'px)');
				arr.push(str);
				break;
			default:
				// DO NO THINGS;
			}
		}

		if (arr.length) {
			output = arr.join(' and ');
		}

		return output;
	}

	/* -------------------------------------------------- */
	/* BIND `init()` TO `window`
	/* -------------------------------------------------- */
	if (typeof window.sfcoBpVis === 'undefined') {
		window.sfcoBpVis = init;
	}
})();