# Media Query Visualizer

## Table of Contents
- [About](#about)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
	- [Overview](#overview)
	- [Instantiation](#instantiation)
	- [Adding Media Queries](#adding-media-queries)
	- [Supported Media Features](#supported-media-features)
	- [Quirks and Gotchas](#quirks-and-gotchas)
- [Documentation](#documentation)

## About
Media Query Visualizer (`sfco-mq-vis`) is a JavaScript package that provides an interface for programmatically creating media queries, inserting them into the DOM, and seeing whether or not they're currently active.

On initialization, Media Query Visualizer is given a series of objects containing media query information (media type, features, etc.). Media Query Visualizer builds an HTML element and stylesheet for each query, and inserts both into the DOM. When a given query is satisfied, its associated HTML element is displayed as 'active'.

## Installation
```
npm install ---save sfco-mq-vis
```

## Setup
After installing `sfco-mq-vis` via `npm`, import the `MqVis` function into your project as follows:

```
var MqVis = require( 'sfco-mq-vis' );
```

## Usage
### Overview
The `MqVis` constructor function takes a single 'options' argument, which must be an object. Currently, the only required key is `queries`, which must contain an array of media query objects.

```
// This is the options object.
var options = {
	queries: [ ... ] // This array will contain media query objects.
}
```

Each media query object has the following shape:

```
// This is a media query object.
{
	type: '...',
	features: [ ... ]
},
```

`type` refers to the [media type](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#Media_types). This key is optional. If included, the value must be a string chosen from the following options: all; screen; print; speech.

`features` is an array of [media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#Media_features) objects. Each media feature has the following shape:

```
{ key: '...', value: '... ' }
```

`key` refers to the name of media feature. The value provided must be: a valid media feature; written in 'kebab' case (eg. 'aspect-ratio'). NOTE: At the time of writing, not all media features are supported.

`value` refers to the desired value for the specified `key`. The value provided must be a string. Some media features require that the value include a unit, while others do not.

```
var minWidthMediaFeature = { key: 'min-width', value: '768px' };
var aspectRatioMediaFeature = { key: 'aspect-ratio', value: '2/3' };
```

### Instantiation
Lets put all that together and instantiate the Media Query Visualizer. If successful, `MqVis` will: inject our media queries into the document; provide a 'drawer' interface that allows us to preview whether or not the queries have been applied. The 'drawer' interface can be opened or closed by clicking the toggle on the left-hand side of the viewport.

```
// Declare options.
var options = {
	queries: [
		{
			type: 'all',
			features: [
				{ key: 'min-width': value: '600px' },
				{ key: 'max-width': value: '100rem' }
			]
		},
		{
			features: [
				{ key: 'min-aspect-ratio', value: '2/3' },
				{ key: 'orientation', value: 'landscape' }
			]
		},
		{
			type: 'screen',
			features: [
				{ key: 'min-resolution', value: '72dpi' },
				{ key: 'max-resolution', value: '2dppx' }
			]
		}
	]
};

var mqVisRef = new MqVis( options );
```

### Adding Media Queries
Additional media queries can be added after instantiation by using the `update()` instance method. Just like the `MqVis` constructor, the `update()` method accepts an options object with a `queries` key.

```
// Create new object of media query data.
var newMediaQueries = {
	queries: [
		{ key: 'max-aspect-ratio', value: '2/1' }
	]
};

// Update
mqVisRef.update( newMediaQueries );
```

### Supported Media Features
Currently, the following media features are supported:
- width
- min-width
- max-width
- height
- min-height
- max-height
- aspect-ratio
- min-aspect-ratio
- max-aspect-ratio
- resolution
- min-resolution
- max-resolution
- orientation
- color*
- monochrome*

For instructions on how to use the above media features, check out the [Mozilla Developer Network documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#Media_features).

\*See the [Quirks and Gotchas](#quirks-and-gotchas) section for additional details.

### Quirks and Gotchas
The following media features *do not* accept values:
- color
- monochrome

In order to properly inject a media query with either of these features, set the `key` and `value` equal to the name of the feature. For example:

```
var options = {
	queries: [
		{
			type: 'all',
			features: [
				{ key: 'color': value: 'color' },
			]
		},
	]
};
```
If a media feature object *does not* contain a `value` key it will be ignored. However, if the values for `key` and `value` are the same (like in the example above), the query will be created, but only the `key` will be displayed.

## Documentation
Currently, Media Query Visualizer does not include any external documentation.

For an overview of the project's evolution, please consult the CHANGELOG.
