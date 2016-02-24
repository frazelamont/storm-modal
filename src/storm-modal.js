(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.StormModal = factory();
  }
}(this, function() {
	'use strict';
    
    var instances = [],
        assign = require('object-assign'),
        merge = require('merge'),
		classlist = require('dom-classlist'),
        defaults = {
            delay: 200,
            callback: null
        },
		focusManager = require('./libs/storm-focus-manager'),
        StormModal = {
            init: function() {
                this.DOMElement.addEventListener('click', this.handleClick.bind(this), false);
				//set up aria
            },
            handleClick: function(e) {
                console.log(e.target, 'I\'ve been clicked');
            },
			open: function() {
				//change class on documentElement
				//change aria
				//give focus to 
			},
			close: function() {
				//change class on documentElement
				//give focus to previosuly focused element
				//change aria
				//remove animation class on documentElemen
			}
        };
    
    function init(sel, opts) {
        var el = document.querySelector(sel);
        
        if(!el === 0) {
            throw new Error('Modal cannot be initialised, no augmentable element found');
        }
        return assign(Object.create(StormModal), {
			DOMElement: el,
			settings: merge({}, defaults, opts)
		});
    }
    
    function reload(els, opts) {
        destroy();
        init(els, opts);
    }
    
    function destroy() {
        instances = [];  
    }
    
	return {
		init: init,
        reload: reload,
        destroy: destroy
	};
	
 }));