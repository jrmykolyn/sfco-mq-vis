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
var App = require('./components/app');

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
var MqVis = function () {
	/**
  * Initalizing function.
  *
  * @param {Object} `opts`
 */
	function MqVis(opts) {
		opts = opts && (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) === 'object' ? opts : {};

		var _this = this;

		/// TODO[@jrmykolyn] - Review assignment below, remove if possible.
		_this.sheets = [];

		/// TODO[@jrmykolyn] - Remove block below.
		// Add 'base' stylesheets to document.
		// buildAndInsertBaseStyles();

		/// TEMP - START
		var target = document.createElement('div');
		target.setAttribute('id', 'sfcoMqVisTarget');
		target.setAttribute('style', 'position: relative; z-index: 999999');
		document.body.appendChild(target);

		ReactDOM.render(_jsx(App, {
			data: opts
		}), document.getElementById('sfcoMqVisTarget'));
		/// TEMP - END

		// _this.update( opts );

		return _this;
	}

	return MqVis;
}();

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = MqVis;