'use strict';

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
var React = require('react');

// --------------------------------------------------
// DECLARE CLASSES
// --------------------------------------------------

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		if (_this2.props.data) {
			_this2.state = { data: _this2.props.data };
		}

		_this2.state.isActive = false;

		// Register event listeners.
		window.addEventListener('SFCO_MQ_VIS_UPDATE', function (e) {
			/// TODO[@jrmykolyn] - Update validation/event handling to be more... robust.
			if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && e.detail && e.detail.data) {
				var data = JSON.parse(JSON.stringify({
					queries: [].concat(_toConsumableArray(_this2.state.data.queries), _toConsumableArray(e.detail.data.queries))
				}));

				_this2.setState({ data: data });
			}
		});
		return _this2;
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _this = this;

			var wrapperStyles = {
				width: '100%',
				maxWidth: '350px',
				height: '100%',
				display: 'block',
				backgroundColor: '#FFF',
				boxShadow: '3px 0px 30px -5px rgba( 0, 0, 0, 0.3 )',
				margin: '0',
				padding: '0',
				position: 'fixed',
				top: '0',
				left: '0',
				overflow: 'visible',
				transition: 'all 0.125s ease-in-out',
				transform: 'translateX( -100% )'
			};

			var wrapperInnerStyles = {
				width: '100%',
				height: '100%',
				display: 'block',
				margin: '0',
				padding: '20px',
				overflow: 'auto'
			};

			var queryElems = [];

			try {
				queryElems = this.state.data.queries.map(function (query, index) {
					return _jsx(Query, {
						index: index,
						queryData: query,
						removeQuery: _this.removeQuery.bind(_this3)
					});
				});
			} catch (err) {
				// DO NO THINGS.
			}

			if (this.state.isActive) {
				wrapperStyles = Object.assign(wrapperStyles, { transform: 'translateX( 0 )' });
			}

			return _jsx('div', {
				className: 'sfco-mq-vis-wrapper',
				style: wrapperStyles
			}, void 0, _jsx('div', {
				className: 'sfco-mq-vis-wrapper__inner',
				style: wrapperInnerStyles
			}, void 0, queryElems), _jsx(Toggle, {
				onClick: this.toggleActiveState.bind(this)
			}));
		}
	}, {
		key: 'toggleActiveState',
		value: function toggleActiveState() {
			this.setState({ isActive: !this.state.isActive });
		}
	}, {
		key: 'removeQuery',
		value: function removeQuery(index) {
			var newQueries = this.state.data.queries.filter(function (q, i) {
				return i !== index;
			});

			this.setState({ data: { queries: newQueries } });
		}
	}]);

	return App;
}(React.Component);

var Toggle = function (_React$Component2) {
	_inherits(Toggle, _React$Component2);

	function Toggle() {
		_classCallCheck(this, Toggle);

		return _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).apply(this, arguments));
	}

	_createClass(Toggle, [{
		key: 'render',
		value: function render() {
			var styles = {
				width: '50px',
				height: '50px',
				display: 'block',
				backgroundColor: '#2c3e50',
				position: 'absolute',
				top: '50%',
				right: '0px',
				transform: 'translate( 100%, -100% )',
				cursor: 'pointer'
			};

			return _jsx('a', {
				id: 'sfcoMqVisToggle',
				style: styles,
				onClick: this.props.onClick
			});
		}
	}]);

	return Toggle;
}(React.Component);

var QueryText = function (_React$Component3) {
	_inherits(QueryText, _React$Component3);

	function QueryText() {
		_classCallCheck(this, QueryText);

		return _possibleConstructorReturn(this, (QueryText.__proto__ || Object.getPrototypeOf(QueryText)).apply(this, arguments));
	}

	_createClass(QueryText, [{
		key: 'render',
		value: function render() {
			var styles = {
				width: 'auto',
				height: 'auto',
				display: 'inline-block',
				color: '#999',
				backgroundColor: 'rgba( 0, 0, 0, 0.05 )',
				borderRadius: '4px',
				padding: '6px 8px 5px',
				fontFamily: 'Helvetica, Arial, sans-serif',
				fontSize: '13px',
				fontWeight: '700',
				lineHeight: '1.6',
				letterSpacing: '0.5px',
				opacity: '1'
			};

			return _jsx('span', {
				className: 'sfco-mq-vis-item-text',
				style: styles
			}, void 0, this.props.text);
		}
	}]);

	return QueryText;
}(React.Component);

var QueryDismiss = function (_React$Component4) {
	_inherits(QueryDismiss, _React$Component4);

	function QueryDismiss() {
		_classCallCheck(this, QueryDismiss);

		return _possibleConstructorReturn(this, (QueryDismiss.__proto__ || Object.getPrototypeOf(QueryDismiss)).apply(this, arguments));
	}

	_createClass(QueryDismiss, [{
		key: 'render',
		value: function render() {
			var styles = {
				width: '20px',
				height: '20px',
				display: 'block',
				position: 'absolute',
				top: '50%',
				right: '0',
				transform: 'translateY( -50% )',
				opacity: '0.5',
				transition: 'all 0.25s',
				cursor: 'pointer'
			};

			var ctaStyles = {
				width: '80%',
				height: '1px',
				display: 'block',
				backgroundColor: '#000',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate( -50%, -50% ) rotate( 45deg )',
				transformOrigin: 'center'
			};

			var ctaStylesAlt = Object.assign(JSON.parse(JSON.stringify(ctaStyles)), { transform: 'translate( -50%, -50% ) rotate( 135deg )' });

			return _jsx('a', {
				className: 'sfco-mq-vis-item-dimiss',
				style: styles,
				onClick: this.props.remove
			}, void 0, _jsx('span', {
				style: ctaStyles
			}), _jsx('span', {
				style: ctaStylesAlt
			}));
		}
	}]);

	return QueryDismiss;
}(React.Component);

var Query = function (_React$Component5) {
	_inherits(Query, _React$Component5);

	function Query() {
		_classCallCheck(this, Query);

		return _possibleConstructorReturn(this, (Query.__proto__ || Object.getPrototypeOf(Query)).apply(this, arguments));
	}

	_createClass(Query, [{
		key: 'render',
		value: function render() {
			var styles = {
				width: 'auto',
				height: 'auto',
				display: 'block',
				borderBottom: ' 1px solid #DDD',
				padding: '10px 40px 10px 0px',
				transition: 'all 0.2s ease-in-out',
				position: 'relative'
			};

			var uniqueClassSelector = this.buildClassSelector();

			this.buildStyleElemAndAddToDOM(this.props.queryData, uniqueClassSelector);

			return _jsx('div', {
				className: 'sfco-mq-vis-item ' + uniqueClassSelector,
				style: styles
			}, void 0, _jsx(QueryText, {
				text: this.buildQueryString(this.props.queryData.features)
			}), _jsx(QueryDismiss, {
				remove: this.remove.bind(this)
			}));
		}
	}, {
		key: 'remove',
		value: function remove() {
			this.props.removeQuery(this.props.index);
		}

		/**
   * Function returns a unique class 'sfco-mq-vis-item' class selector.
   *
   * @return {string}
  */

	}, {
		key: 'buildClassSelector',
		value: function buildClassSelector() {
			return 'sfco-mq-vis-item--' + Math.random().toString().substring(2, 20);
		}

		/**
   * ...
   *
   * @param {Array<Object>} `features`
   * @return {string}
  */
		/// TODO[@jrmykolyn] - Replace ref to `_this` with alternate solution.

	}, {
		key: 'buildQueryString',
		value: function buildQueryString(features) {
			features = Array.isArray(features) && features.length ? features : [];

			var _this = this;
			var textNodeArr = [];
			var textNode = void 0;

			features.forEach(function (feature) {
				var key = feature.key,
				    value = feature.value;


				if (key && typeof key === 'string') {
					textNodeArr.push(_this.buildFeatureString(key, value));
				}
			});

			textNode = textNodeArr.join(' and ');

			return textNode;
		}

		/**
   * Function creates a new 'feature string' for a given media query feature (eg. 'width', 'height', etc.).
   *
   * If the `key` and `value` are equal, the resulting 'feature' string will contain the `key` only.
   * This allows for the insertion of media features which do not require/support values, such as 'color', 'monochrome', etc.
   *
   * @param {string} `key`
   * @param {string} `value`
   * @return {string}
  */

	}, {
		key: 'buildFeatureString',
		value: function buildFeatureString(key, value) {
			key = typeof key === 'string' ? key : '';
			value = typeof value !== 'undefined' ? value : '';

			return key === value ? '(' + key + ')' : '(' + key + ': ' + value + ')';
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

	}, {
		key: 'buildStyleElemAndAddToDOM',
		value: function buildStyleElemAndAddToDOM(query, classSelector) {
			query = query || {};
			classSelector = classSelector || '';

			// Create the <style> tag
			var styleElem = document.createElement('style');
			var sheet = void 0;

			// Build media query string.
			var mediaQuery = this.buildMediaQuery(query);

			styleElem.setAttribute('media', mediaQuery);

			// WebKit hack, borrowed from David Walsh:
			// Insert empty text node into `styleElem`.
			styleElem.appendChild(document.createTextNode(''));

			// Add `styleElem` to DOM.
			document.head.appendChild(styleElem);

			// Update `sheet` var.
			// NOTE: Will error if assignment occurs *before* the <style> elem. is added to the DOM.
			sheet = styleElem.sheet;

			// Build styles
			var rule = '';
			var decBlock = '';

			decBlock += 'color: #2980b9 !important;';
			decBlock += 'background-color: rgba( 41, 128, 185, 0.2 ) !important;';

			rule = '.' + classSelector + ' .sfco-mq-vis-item-text { ' + decBlock + ' }';

			// Insert rule into `sheet`.
			sheet.insertRule(rule, 0);

			return sheet;
		}

		/**
   * Given a 'query' object, function creates and returns a new media query string.
   *
   * @param {Object} `query`
   * @return {string}
  */

	}, {
		key: 'buildMediaQuery',
		value: function buildMediaQuery(query) {
			query = query || {};

			// Initialize local vars.
			var _this = this;
			var output = '';
			var type = query.type || 'all';
			var features = query.features || null;
			var conditions = [];

			features.forEach(function (feature) {
				var key = feature.key,
				    value = feature.value;


				if (key && typeof key === 'string') {
					conditions.push(_this.buildFeatureString(key, value));
				}
			});

			output = type + ' and ' + conditions.join(' and ');

			return output;
		}
	}]);

	return Query;
}(React.Component);

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------


module.exports = App;