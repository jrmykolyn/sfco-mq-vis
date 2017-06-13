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
