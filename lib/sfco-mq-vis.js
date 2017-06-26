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
// PRIVATE FUNCTIONS
// --------------------------------------------------
/**
 * ...
 */
function getClass(type, options) {
	options = options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? options : {};

	try {
		var className = DEFAULTS.identifiers.namespace + DEFAULTS.identifiers.joinWith + DEFAULTS.identifiers[type];

		return options.nameOnly ? className : '.' + className;
	} catch (err) {
		console.log(err);

		return '';
	}
}

/**
 * ...
 */
/// TODO[@jrmykolyn] - Add documentation.
/// TODO[@jrmykolyn] - Consolidate <style> elem. costruction with duplicate logic in other function.
function buildAndInsertBaseStyles() {
	var styleElem = document.createElement('style');
	var sheet;

	// WebKit hack, borrowed from David Walsh:
	// Insert empty text node into `styleElem`.
	styleElem.appendChild(document.createTextNode(''));

	// Add `styleElem` to DOM.
	document.head.appendChild(styleElem);

	// Update `sheet` var.
	// NOTE: Will error if assignment occurs *before* the <style> elem. is added to the DOM.
	sheet = styleElem.sheet;

	// Build and insert rule(s).
	var decBlock = '';

	// ...
	decBlock = '';
	decBlock += 'opacity: 1;';

	sheet.insertRule(getClass('itemDismiss') + ':hover, ' + getClass('itemDismiss') + ':focus {' + decBlock + '}', 0);

	// ...
	decBlock = '';
	decBlock += 'content: "";';
	decBlock += 'width: 80%;';
	decBlock += 'height: 1px;';
	decBlock += 'display: block;';
	decBlock += 'background-color: #000;';
	decBlock += 'position: absolute;';
	decBlock += 'top: 50%;';
	decBlock += 'left: 50%;';
	decBlock += '-webkit-transform: translate( -50%, -50% ) rotate( 45deg );';
	decBlock += 'transform: translate( -50%, -50% ) rotate( 45deg );';
	decBlock += 'transform-origin: center;';

	sheet.insertRule(getClass('itemDismiss') + '::before {' + decBlock + '}', 0);

	// ...
	decBlock += '-webkit-transform: translate( -50%, -50% ) rotate( 135deg );';
	decBlock += 'transform: translate( -50%, -50% ) rotate( 135deg );';

	sheet.insertRule(getClass('itemDismiss') + '::after {' + decBlock + '}', 0);

	return styleElem;
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
		opts = opts && (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) === 'object' ? opts : {};

		var _this = this;

		_this.sheets = [];

		// Add 'base' stylesheets to document.
		buildAndInsertBaseStyles();

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