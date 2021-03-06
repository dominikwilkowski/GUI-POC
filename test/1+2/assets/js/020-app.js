/*! Author: Dominik Wilkowski | Version: --currentVersion-- */
/***************************************************************************************************************************************************************
 *
 * App framework and settings
 *
 **************************************************************************************************************************************************************/

'use strict';


var App = (function() {

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// settings
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	return {
		DEBUG: true, //debugging infos
		SVGPATH: 'assets/img/svg-sprite.svg', //svg path
		SVGREVISION: '10037', //svg revision


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Initiate app
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		init: function() {
			if( App.DEBUG ) console.log('%cDEBUGGING INFORMATION', 'font-size: 25px;');

			//remove fallback HTML
			$('html').removeClass('no-js').addClass('js');

		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// debugging prettiness
		//
		// text  string   Text to be printed to debugger
		// code  keyword  What kind of urgency: report,error,interaction
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		debugging: function( text, code ) {

			if( code === 'report' ) {
				if( App.DEBUG ) console.log('%c\u2611 ', 'color: green; font-size: 18px;', text);
			}

			else if( code === 'error' ) {
				if( App.DEBUG ) console.log('%c\u2612 ', 'color: red; font-size: 18px;', text);
			}

			else if( code === 'interaction' ) {
				if( App.DEBUG ) console.log('%c\u261C ', 'color: blue; font-size: 18px;', text);
			}

		}

	}

}());


//run app
App.init();