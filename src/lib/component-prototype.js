const TRIGGER_EVENTS = window.PointerEvent ? ['pointerdown', 'keydown'] : ['ontouchstart' in window ? 'touchstart' : 'click', 'keydown' ],
      TRIGGER_KEYCODES = [13, 32],
	  FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'];

export default {
	init() {
		this.isOpen = false;
		this.dialog = this.node.querySelector('[role=dialog]');
		if(!this.dialog) throw new Error('Modal cannot be initialised, a modal must contain a dialog (role="dialog")');

		this.togglers = this.node.getAttribute('data-modal-toggler') && [].slice.call(document.querySelectorAll('.' + this.node.getAttribute('data-modal-toggler')));
		if(!this.togglers.length) throw new Error('Modal cannot be initialised, no modal toggler elements found');

		this.boundKeyListener = this.keyListener.bind(this);

		this.initTriggers();
		this.focusableChildren = this.getFocusableChildren();
		this.dialog.setAttribute('aria-hidden', true);
		return this;
	},
	initTriggers(){
		this.togglers.forEach(toggler => {
			TRIGGER_EVENTS.forEach(ev => {
				toggler.addEventListener(ev, e => {
					if(!!e.keyCode && !~TRIGGER_KEYCODES.indexOf(e.keyCode) || (e.which && e.which === 3)) return;
					e.preventDefault();
					this.change(this);
				});
			});
		});
	},
	getFocusableChildren() {
		return [].slice.call(this.node.querySelectorAll(FOCUSABLE_ELEMENTS.join(',')));
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
		if (this.isOpen && e.keyCode === 9) this.trapTab(e);
	},
	open() {
		document.addEventListener('keydown', this.boundKeyListener);
		this.lastFocused =  document.activeElement;
		this.focusableChildren.length && window.setTimeout(() => {this.focusableChildren[0].focus();}, 0);
		this.toggle();
	},
	close(){
		document.removeEventListener('keydown', this.boundKeyListener);
		this.lastFocused.focus();
		this.toggle();
	},
	toggle(){
		this.isOpen = !this.isOpen;
		this.dialog.setAttribute('aria-hidden', !this.isOpen);
		this.node.classList.toggle(this.settings.onClassName);
		// document.querySelector(this.settings.mainSelector) && document.querySelector(this.settings.mainSelector).setAttribute('aria-hidden', this.isOpen);
	},
	change() {
		if(!this.isOpen) this.open();
		else this.close();
		typeof this.settings.callback === 'function' &&  this.settings.callback.call(this);
	}
};