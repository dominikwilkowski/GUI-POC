/***************************************************************************************************************************************************************
 *
 * Module svg
 *
 * Description of module
 *
 **************************************************************************************************************************************************************/


(function(App) {

	var module = {};

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// private function: check for svg support
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	function SvgSupport() {
		App.debugging( 'Module svg: Running SvgSupport', 'report' );

		var result = true;

		if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect ) {
			result = false;
		}

		return result;
	}

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.init = function() {
		App.debugging( 'Module svg: Initiating', 'report' );

		var file = App.SVGPATH;
		var revision = App.SVGREVISION;
		var _hasSVG = SvgSupport();

		if( !_hasSVG ) {
			App.debugging( 'Module svg: No SVG support', 'report' );

			return true;
		}

		var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null;
		var request;
		var data;

		var InsertElement = function() {
			App.debugging( 'Module svg: running InsertElement()', 'report' );

			document.body.insertAdjacentHTML( 'afterbegin', data );
		};

		var Insert = function() {
			App.debugging( 'Module svg: running Insert()', 'report' );

			if( document.body ) {
				InsertElement();
			}
			else {
				document.addEventListener( 'DOMContentLoaded', InsertElement );
			}
		};

		if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision ) {
			App.debugging( 'Module svg: localStorage supported with same revision', 'report' );

			data = localStorage.getItem( 'inlineSVGdata' );

			if( data ) {
				Insert();
				return true;
			}
		}

		try {
			App.debugging( 'Module svg: Ajaxing svg in', 'report' );

			request = new XMLHttpRequest();
			request.open( 'GET', file, true );

			request.onload = function() {
				if( request.status >= 200 && request.status < 400 ) {
					App.debugging( 'Module svg: Ajax request successful', 'report' );

					data = request.responseText;
					Insert();

					if( isLocalStorage ) {
						App.debugging( 'Module svg: Adding svg into localStorage', 'report' );

						localStorage.setItem( 'inlineSVGdata', data );
						localStorage.setItem( 'inlineSVGrev', revision );
					}
				}
			}
			request.send();
		}
		catch( e ){
			App.debugging( 'Module svg: Ajax request failed with: ' + e, 'error' );
		}
	};


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// module init method
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	module.Fallback = function() {
		App.debugging( 'Module svg: Running Fallback()', 'report' );

		var uses = document.getElementsByTagName( 'use' );
		var use;
		var _hasSVG = SvgSupport();

		if( !_hasSVG ) {
			App.debugging( 'Module svg: SVG support', 'report' );

			while( ( use = uses[ 0 ] ) ) {
				var svg = use.parentNode;
				var img = new Image();

				img.src = use.getAttribute( 'data-img' );
				svg.parentNode.replaceChild( img, svg );
			}
		}
	};


	App.moduleSvg = module;


	// run module
	App.moduleSvg.init();
	App.moduleSvg.Fallback();

}(App));