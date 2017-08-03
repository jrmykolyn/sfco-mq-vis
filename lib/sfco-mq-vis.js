'use strict';

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
var React = require('react');
var ReactDOM = require('react-dom');

// Project
var App = require('./components/App');

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
/// TODO[@jrmykolyn] - Consider converting to an `MqVis` class method.
function getDefaults() {
	return {
		queries: []
	};
}

/// TODO[@jrmykolyn] - Consider converting to an `MqVis` class method.
function sanitizeOpts(opts) {
	opts = opts && (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) === 'object' ? JSON.parse(JSON.stringify(opts)) : getDefaults();

	if (!Array.isArray(opts.queries)) {
		opts.queries = [];
	}

	opts.queries = opts.queries.filter(function (query) {
		return query && (typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object';
	}).map(function (query) {
		var features = Array.isArray(query.features) ? query.features : [];

		features = features.filter(function (feature) {
			return feature && (typeof feature === 'undefined' ? 'undefined' : _typeof(feature)) === 'object';
		}).filter(function (feature) {
			return feature.key && feature.value;
		});

		return Object.assign(query, { features: features });
	});

	return opts;
}

/// TODO[@jrmykolyn] - Consider converting to an `MqVis` class method.
/// TODO[@jrmykolyn] - Consider refactoring into a `do...while`.
function validateOpts(opts) {
	opts = opts && (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) === 'object' ? opts : getDefaults();

	// Ensure that `opts` object includes a valid `queries` array.
	if (!opts.queries || !Array.isArray(opts.queries)) {
		return null;
	}

	// Ensure that `queries` array contains at least 1x `query` object.
	if (!opts.queries.length || !opts.queries[0] || _typeof(opts.queries[0]) !== 'object') {
		return null;
	}

	// Ensure that each `query` object contains a valid `features` array.
	if (!Array.isArray(opts.queries[0].features) || !opts.queries[0].features.length) {
		return null;
	}

	// Ensure that each `feature` object contains the correct properties.
	if (_typeof(opts.queries[0].features[0].key) === undefined || _typeof(opts.queries[0].features[0].value) === undefined) {
		return null;
	}

	return opts;
}

// --------------------------------------------------
// DEFINE CLASS
// --------------------------------------------------
var MqVis = function () {
	/**
  * Initalizing function.
  *
  * @param {Object} `opts`
  */
	function MqVis(opts) {
		// On instantiation, massage `opts` into correct shape via `sanitizeOpts()`.
		opts = sanitizeOpts(opts);

		var defaults = getDefaults();
		var settings = Object.assign(defaults, opts);

		// Build HTML and add to DOM.
		var target = document.createElement('div');
		target.setAttribute('id', 'sfcoMqVisTarget');
		target.setAttribute('style', 'position: relative; z-index: 999999');
		document.body.appendChild(target);

		// Render React component in new DOM node.
		ReactDOM.render(_jsx(App, {
			data: opts
		}), document.getElementById('sfcoMqVisTarget'));

		// Update instance state/props.
		this.isInitialized = true;

		return this;
	}

	/**
  * Function provides an interface for updating the `MqVis` instance.
  *
  * @param {Object} `opts`
  */
	MqVis.prototype.update = function (opts) {
		// On update, `opts` must be valid.
		opts = validateOpts(opts);

		// Break out of method if:
		// - `opts` are not valid;
		// - OR instance has not been init'd.
		if (!opts || !this.isInitialized) {
			var e = new CustomEvent('SFCO_MQ_VIS_UPDATE_FAILED', { detail: { data: opts } });

			window.dispatchEvent(e);

			return;
		}

		// Otherwise, emit 'update' event.
		var e = new CustomEvent('SFCO_MQ_VIS_UPDATE', { detail: { data: opts } });

		window.dispatchEvent(e);
	};

	return MqVis;
}();

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = MqVis;