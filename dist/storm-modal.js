/**
 * @name storm-modal: Accessible modal dialogue
 * @version 0.5.2: Thu, 13 Oct 2016 11:10:47 GMT
 * @author stormid
 * @license MIT
 */(function(root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.StormModal = factory();
  }
}(this, function() {
	'use strict';
    
    var instances = [],
        CONSTANTS = {
            TRIGGER_EVENTS: ['click', 'keydown'],
            TRIGGER_KEYCODES: [13, 32]
        },
        defaults = {
			onClassName: 'active',
			mainSelector: 'main',
			modalSelector: 'js-modal',
            callback: null
        },
        StormModal = {
            init: function() {
				this.isOpen = false;
				this.togglers = this.node.getAttribute('data-modal-toggler') && [].slice.call(document.querySelectorAll('.' + this.node.getAttribute('data-modal-toggler')));
				
				if(!!!this.togglers) {
					throw new Error('Modal cannot be initialised, no modal toggler elements found');
				}
                this.togglers.forEach(function(toggler){
                    CONSTANTS.TRIGGER_EVENTS.forEach(function(ev){
                        toggler.addEventListener(ev, function(e){
                            if(!!e.keyCode && !~CONSTANTS.TRIGGER_KEYCODES.indexOf(e.keyCode)) { return; }
                            this.change(this)
                        }.bind(this), false);
                    }.bind(this));
				}.bind(this));
				this.focusableChildren = this.getFocusableChildren();
				this.node.setAttribute('aria-hidden', true);
				return this;
            },
			getFocusableChildren: function() {
				var focusableElements = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'];

				return [].slice.call(this.node.querySelectorAll(focusableElements.join(','))).filter(function (child) {
				  return !!(child.offsetWidth || child.offsetHeight || child.getClientRects().length);
				});
			},
			trapTab: function(e){
				var focusedIndex = this.focusableChildren.indexOf(document.activeElement);
				if(e.shiftKey && focusedIndex === 0) {
					e.preventDefault();
					this.focusableChildren[this.focusableChildren.length - 1].focus();
				} else {
					if(!e.shiftKey && focusedIndex === this.focusableChildren.length - 1) {
						e.preventDefault();
					  	this.focusableChildren[0].focus();
					}
				}
			},
			keyListener: function(e){
				if (this.isOpen && e.keyCode === 27) {
					e.preventDefault();
					this.toggle();
				}
				if (this.isOpen && e.keyCode === 9) {
					this.trapTab(e);
				}
			},
            open: function() {
                document.addEventListener('keydown', this.keyListener.bind(this));
                this.lastFocused =  document.activeElement;
                window.setTimeout(function(){this.focusableChildren[0].focus();}.bind(this), 0);
                this.toggle();
            },
            close: function(){
                document.removeEventListener('keydown', this.keyListener.bind(this));
                this.lastFocused.focus();
                this.toggle();
            },
            toggle: function(){
                this.isOpen = !this.isOpen;
                this.node.setAttribute('aria-hidden', !this.isOpen);
				this.node.classList.toggle(this.settings.onClassName);
                document.querySelector(this.settings.mainSelector) && document.querySelector(this.settings.mainSelector).setAttribute('aria-hidden', this.isOpen);
            },
            change: function() {
                if(!this.isOpen){
                    this.open();
                } else {
                    this.close();
                }
                typeof this.settings.callback === 'function' &&  this.settings.callback.call(this);
            }
        };
    
    function init(sel, opts) {
        var els = [].slice.call(document.querySelectorAll(sel));
        
        if(els.length === 0) {
            throw new Error('Modal cannot be initialised, no trigger elements found');
        }
		
		instances = els.map(function(el){
			return Object.assign(Object.create(StormModal), {
				node: el,
				settings: Object.assign({}, defaults, opts)
			}).init();
		});
        
		return instances;
    }
	
	return {
		init: init
	};
	
 }));