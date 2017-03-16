/**
 * @name storm-modal: Accessible modal dialogue
 * @version 0.6.0: Thu, 16 Mar 2017 16:15:58 GMT
 * @author stormid
 * @license MIT
 */
const CONSTANTS = {
		TRIGGER_EVENTS: ['click', 'keydown'],
		TRIGGER_KEYCODES: [13, 32]
	},
	defaults = {
		onClassName: 'active',
		mainSelector: 'main',
		modalSelector: 'js-modal',
		callback: false
	};

const StormModal = {
	init() {
		this.isOpen = false;
		this.togglers = this.node.getAttribute('data-modal-toggler') && [].slice.call(document.querySelectorAll('.' + this.node.getAttribute('data-modal-toggler')));
            
		if(!this.togglers.length) {
			throw new Error('Modal cannot be initialised, no modal toggler elements found');
		}

		this.initTriggers();
		this.focusableChildren = this.getFocusableChildren();
		this.node.setAttribute('aria-hidden', true);
		return this;
	},
	initTriggers(){
		this.togglers.forEach(toggler => {
			CONSTANTS.TRIGGER_EVENTS.forEach(ev => {
				toggler.addEventListener(ev, e => {
					if(!!e.keyCode && !~CONSTANTS.TRIGGER_KEYCODES.indexOf(e.keyCode)) return;
					e.preventDefault();
					this.change(this);
				});
			});
		});
	},
	getFocusableChildren() {
		const focusableElements = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'];

		return [].slice.call(this.node.querySelectorAll(focusableElements.join(',')));
	},
	trapTab(e){
		let focusedIndex = this.focusableChildren.indexOf(document.activeElement);
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
	keyListener(e){
		if (this.isOpen && e.keyCode === 27) {
			e.preventDefault();
			this.toggle();
		}
		if (this.isOpen && e.keyCode === 9) {
			this.trapTab(e);
		}
	},
	open() {
		document.addEventListener('keydown', this.keyListener.bind(this));
		this.lastFocused =  document.activeElement;
		this.focusableChildren.length && window.setTimeout(() => {this.focusableChildren[0].focus();}, 0);
		this.toggle();
	},
	close(){
		document.removeEventListener('keydown', this.keyListener.bind(this));
		this.lastFocused.focus();
		this.toggle();
	},
	toggle(){
		this.isOpen = !this.isOpen;
		this.node.setAttribute('aria-hidden', !this.isOpen);
		this.node.classList.toggle(this.settings.onClassName);
		document.querySelector(this.settings.mainSelector) && document.querySelector(this.settings.mainSelector).setAttribute('aria-hidden', this.isOpen);
	},
	change() {
		if(!this.isOpen){
			this.open();
		} else {
			this.close();
		}
		typeof this.settings.callback === 'function' &&  this.settings.callback.call(this);
	}
};

const init = (sel, opts) => {
	let els = [].slice.call(document.querySelectorAll(sel));
	
	if(els.length === 0) throw new Error('Modal cannot be initialised, no trigger elements found');
	
	return els.map(el => {
		return Object.assign(Object.create(StormModal), {
			node: el,
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};
    
export default { init };