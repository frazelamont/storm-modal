var STORM = (function(w, d) {
	'use strict';
    
    var Boilerplate = require('./libs/storm-component-boilerplate'),
        init = function() {
            Boilerplate.init('.js-boilerplate');
        };
	
	return {
		init: init
	};
	
})(window, document, undefined);

if('addEventListener' in window) window.addEventListener('DOMContentLoaded', STORM.init, false);