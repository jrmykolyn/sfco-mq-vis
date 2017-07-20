// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
const React = require( 'react' );

// --------------------------------------------------
// DECLARE CLASSES
// --------------------------------------------------
class App extends React.Component {
	constructor( props ) {
		super( props );

		if ( this.props.data ) {
			this.state = { data: this.props.data };
		}

		this.state.isActive = false;

		// Register event listeners.
		window.addEventListener( 'SFCO_MQ_VIS_UPDATE', ( e ) => {
			/// TODO[@jrmykolyn] - Update validation/event handling to be more... robust.
			if ( typeof e === 'object' && e.detail && e.detail.data ) {
				var data = JSON.parse( JSON.stringify( {
					queries: [ ...this.state.data.queries, ...e.detail.data.queries ]
				} ) );

				this.setState( { data: data } );
			}
		} );
	}

	render() {
		let _this = this;

		let wrapperStyles = {
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
		}; /// TEMP

		let wrapperInnerStyles = {
			width: '100%',
			height: '100%',
			display: 'block',
			margin: '0',
			padding: '20px',
			overflow: 'auto'
		};

		let queryElems = [];

		try {
			queryElems = this.state.data.queries.map( ( query, index ) => {
				return (
					<Query index={index} queryData={ query } removeQuery={_this.removeQuery.bind( this )} />
				);
			} );
		} catch ( err ) {
			// DO NO THINGS.
		}

		if ( this.state.isActive ) {
			wrapperStyles = Object.assign( wrapperStyles, { transform: 'translateX( 0 )' } );
		}

		return (
			<div className="sfco-mq-vis-wrapper" style={wrapperStyles}>
				<div className="sfco-mq-vis-wrapper__inner" style={wrapperInnerStyles}>
					{ queryElems }
				</div>
				<Toggle onClick={this.toggleActiveState.bind( this )}/>
			</div>
		);
	}

	toggleActiveState() {
		this.setState( { isActive: !this.state.isActive } );
	}

	removeQuery( index ) {
		var newQueries = this.state.data.queries.filter( ( q, i ) => i !== index );

		this.setState( { data: { queries: newQueries } } );
	}
}

class Toggle extends React.Component {
	render() {
		const styles = {
			width: '50px',
			height: '50px',
			display: 'block',
			backgroundColor: '#2c3e50',
			position: 'absolute',
			top: '20px',
			right: '0px',
			transform: 'translateX( 100% )',
			cursor: 'pointer'
		}; /// TEMP

		return (
			<a id="sfcoMqVisToggle" style={styles} onClick={this.props.onClick}></a>
		);
	}
}

class QueryText extends React.Component {
	render() {
		let styles = {
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

		return (
			<span className="sfco-mq-vis-item-text" style={styles}>
				{ this.props.text }
			</span>
		);
	}
}

class QueryDismiss extends React.Component {
	render () {
		let styles = {
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

		let ctaStyles = {
			width: '80%',
			height: '1px',
			display: 'block',
			backgroundColor: '#000',
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate( -50%, -50% ) rotate( 45deg )',
			transformOrigin: 'center'
		}

		let ctaStylesAlt = Object.assign( JSON.parse( JSON.stringify( ctaStyles ) ), { transform: 'translate( -50%, -50% ) rotate( 135deg )' } );

		return (
			<a className="sfco-mq-vis-item-dimiss" style={styles} onClick={this.props.remove}>
				<span style={ctaStyles}></span>
				<span style={ctaStylesAlt}></span>
			</a>
		);
	}
}

class Query extends React.Component {
	render() {
		let styles = {
			width: 'auto',
			height: 'auto',
			display: 'block',
			borderBottom: ' 1px solid #DDD',
			padding: '10px 40px 10px 0px',
			transition: 'all 0.2s ease-in-out',
			position: 'relative'
		}; /// TEMP

		let uniqueClassSelector = this.buildClassSelector();

		this.buildStyleElemAndAddToDOM( this.props.queryData, uniqueClassSelector );

		return (
			<div className={'sfco-mq-vis-item ' + uniqueClassSelector} style={styles}>
				<QueryText text={this.buildQueryString( this.props.queryData.features )} />
				<QueryDismiss remove={this.remove.bind( this )}/>
			</div>
		);
	}

	remove() {
		this.props.removeQuery( this.props.index );
	}

	/**
	 * Function returns a unique class 'sfco-mq-vis-item' class selector.
	 *
	 * @return {string}
	*/
	buildClassSelector() {
		return `sfco-mq-vis-item--${Math.random().toString().substring( 2, 20 )}`
	}

	/**
	 * ...
	 *
	 * @param {Array<Object>} `features`
	 * @return {string}
	*/
	/// TODO[@jrmykolyn] - Replace ref to `_this` with alternate solution.
	buildQueryString( features ) {
		features = ( Array.isArray( features) && features.length ) ? features : [];

		let _this = this;
		let textNodeArr = [];
		let textNode;

		features.forEach( function( feature ) {
			let { key, value } = feature;

			if ( key && typeof key === 'string' ) {
				textNodeArr.push( _this.buildFeatureString( key, value ) );
			}
		} );

		textNode = textNodeArr.join( ' and ' );

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
	buildFeatureString( key, value ) {
		key = ( typeof key === 'string' ) ? key : '';
		value = ( typeof value !== 'undefined' ) ? value : '';

		return ( key === value ) ? `(${key})` : `(${key}: ${value})`;
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
	buildStyleElemAndAddToDOM( query, classSelector ) {
		query = query || {};
		classSelector = classSelector || '';

		// Create the <style> tag
		let styleElem = document.createElement( 'style' );
		let sheet;

		// Build media query string.
		var mediaQuery = this.buildMediaQuery( query );

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
		let rule = '';
		let decBlock = '';

		decBlock += 'color: #2980b9 !important;';
		decBlock += 'background-color: rgba( 41, 128, 185, 0.2 ) !important;';

		rule = `.${classSelector} .sfco-mq-vis-item-text { ${decBlock} }`;

		// Insert rule into `sheet`.
		sheet.insertRule( rule , 0 );

		return sheet;
	}

	/**
	 * Given a 'query' object, function creates and returns a new media query string.
	 *
	 * @param {Object} `query`
	 * @return {string}
	*/
	buildMediaQuery( query ) {
		query = query || {};

		// Initialize local vars.
		let _this = this;
		let output = '';
		let type = query.type || 'all';
		let features = query.features || null;
		let conditions = [];

		features.forEach( function( feature ) {
			let { key, value } = feature;

			if ( key && typeof key === 'string' ) {
				conditions.push( _this.buildFeatureString( key, value ) );
			}
		} );

		output = `${type} and ${conditions.join( ' and ' )}`;

		return output;
	}

}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = App;
