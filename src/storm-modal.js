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
        defaults = {
            delay: 200,
            callback: null
        },
		focusManager = require('./libs/storm-focus-manager'),
        StormComponentPrototype = {
            init: function() {
                this.DOMElement.addEventListener('click', this.handleClick.bind(this), false);
            },
            handleClick: function(e) {
                console.log(e.target, 'I\'ve been clicked');
            }
        };
    
    function init(sel, opts) {
        var els = [].slice.call(document.querySelectorAll(sel));
        
        if(els.length === 0) {
            throw new Error('Modal cannot be initialised, no augmentable elements found');
        }
        
        els.forEach(function(el, i){
            instances[i] = assign(Object.create(StormComponentPrototype), {
                DOMElement: el,
                settings: merge({}, defaults, opts)
            });
            //add further objects as assign arguments for object composition
            instances[i].init();
        });
        return instances;
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