module.exports = (function() {
	'use strict';
    
    var instances = [],
        defaults = {
			onClassName: 'active',
			modalSelector: 'js-modal',
			closeSelector: 'js-modal-close'
        },
		status = [
			'closed',
			'open'
		],
		styles = {
			open: {
				opacity:1,
				visibility: 'visible',
				position: 'fixed',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				zIndex: 5,
				maxHeight: 'none'
			},
			closed: {
				opacity: 0,
				visibility: 'hidden',
				position: 'absolute',
				maxHeight: 0,
				overflow: 'hidden'
			}
		},
        StormModal = {
            init: function() {
				this.open = false;
				this.node = document.getElementById(this.openBtn.getAttribute('datat-target')).substr(1);
                this.openBtn.addEventListener('click', this.toggle.bind(this), false);
                document.querySelector('.' + this.settings.closeSelector).addEventListener('click', this.toggle.bind(this), false);
				this.focusableChildren = this.getFocusableChildren();
				this.setStyles();
				this.node.setAttribute('aria-hidden', true);
            },
			setStyles: function() {
				for(var s in styles[status[Number(this.open)]]) {
					this.node.style[s] = styles[status[Number(this.open)]][s];
				}
			},
			toggle: function() {
				this.open = !this.open;
				STORM.UTILS.classlist(this.node).toggle(this.settings.onClassName);
				this.setStyles();
				this.node.setAttribute('aria-hidden', !this.open);
				document.querySelector('main') && document.querySelector('main').setAttribute('aria-hidden', this.open);
				
				//change class on documentElement
				//change aria
				//give focus to 
			}
        };
    
    function init(sel, opts) {
        var els = [].slice.call(document.querySelectorAll(sel));
        
        if(els.length === 0) {
            throw new Error('Modal cannot be initialised, no augmentable element found');
        }
		
		instances = els.map(function(el){
			return STORM.UTILS.assign(Object.create(StormModal), {
				openBtn: el,
				settings: merge({}, defaults, opts)
			}).init();
		});
        
		return instances;
    }
	
	return {
		init: init
	};
	
 }());