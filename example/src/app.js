var STORM = (function(w, d) {
	'use strict';
    
    var Modal = require('./libs/storm-modal'),
        init = function() {
            Modal.init('.js-trigger');
        };
	
	return {
		init: init
	};
	
})(window, document, undefined);

if('addEventListener' in window) window.addEventListener('DOMContentLoaded', STORM.init, false);