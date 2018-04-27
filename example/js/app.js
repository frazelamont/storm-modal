(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _component = require('./libs/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var onDOMContentLoadedTasks = [function () {
	var modal = _component2.default.init('.js-modal');
	console.log(modal);
}];

if ('addEventListener' in window) window.addEventListener('DOMContentLoaded', function () {
	onDOMContentLoadedTasks.forEach(function (fn) {
		return fn();
	});
});

},{"./libs/component":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defaults = require('./lib/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _componentPrototype = require('./lib/component-prototype');

var _componentPrototype2 = _interopRequireDefault(_componentPrototype);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var init = function init(sel, opts) {
	var els = [].slice.call(document.querySelectorAll(sel));

	if (els.length === 0) throw new Error('Modal cannot be initialised, no trigger elements found');

	return els.map(function (el) {
		return Object.assign(Object.create(_componentPrototype2.default), {
			node: el,
			settings: Object.assign({}, _defaults2.default, opts)
		}).init();
	});
};

exports.default = { init: init };

},{"./lib/component-prototype":3,"./lib/defaults":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var TRIGGER_EVENTS = window.PointerEvent ? ['pointerup'] : ['ontouchstart' in window ? 'touchstart' : 'click', 'keydown'],
    TRIGGER_KEYCODES = [13, 32],
    FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'];

exports.default = {
	init: function init() {
		this.isOpen = false;
		this.togglers = this.node.getAttribute('data-modal-toggler') && [].slice.call(document.querySelectorAll('.' + this.node.getAttribute('data-modal-toggler')));

		this.boundKeyListener = this.keyListener.bind(this);

		if (!this.togglers.length) {
			throw new Error('Modal cannot be initialised, no modal toggler elements found');
		}

		this.initTriggers();
		this.focusableChildren = this.getFocusableChildren();
		this.node.setAttribute('aria-hidden', true);
		return this;
	},
	initTriggers: function initTriggers() {
		var _this = this;

		this.togglers.forEach(function (toggler) {
			TRIGGER_EVENTS.forEach(function (ev) {
				toggler.addEventListener(ev, function (e) {
					if (!!e.keyCode && !~TRIGGER_KEYCODES.indexOf(e.keyCode)) return;
					e.preventDefault();
					_this.change(_this);
				});
			});
		});
	},
	getFocusableChildren: function getFocusableChildren() {
		return [].slice.call(this.node.querySelectorAll(FOCUSABLE_ELEMENTS.join(',')));
	},
	trapTab: function trapTab(e) {
		var focusedIndex = this.focusableChildren.indexOf(document.activeElement);
		if (e.shiftKey && focusedIndex === 0) {
			e.preventDefault();
			this.focusableChildren[this.focusableChildren.length - 1].focus();
		} else {
			if (!e.shiftKey && focusedIndex === this.focusableChildren.length - 1) {
				e.preventDefault();
				this.focusableChildren[0].focus();
			}
		}
	},
	keyListener: function keyListener(e) {
		if (this.isOpen && e.keyCode === 27) {
			e.preventDefault();
			this.toggle();
		}
		if (this.isOpen && e.keyCode === 9) this.trapTab(e);
	},
	open: function open() {
		var _this2 = this;

		document.addEventListener('keydown', this.boundKeyListener);
		this.lastFocused = document.activeElement;
		this.focusableChildren.length && window.setTimeout(function () {
			_this2.focusableChildren[0].focus();
		}, 0);
		this.toggle();
	},
	close: function close() {
		document.removeEventListener('keydown', this.boundKeyListener);
		this.lastFocused.focus();
		this.toggle();
	},
	toggle: function toggle() {
		this.isOpen = !this.isOpen;
		this.node.setAttribute('aria-hidden', !this.isOpen);
		this.node.classList.toggle(this.settings.onClassName);
		document.querySelector(this.settings.mainSelector) && document.querySelector(this.settings.mainSelector).setAttribute('aria-hidden', this.isOpen);
	},
	change: function change() {
		if (!this.isOpen) this.open();else this.close();
		typeof this.settings.callback === 'function' && this.settings.callback.call(this);
	}
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    onClassName: 'active',
    mainSelector: 'main',
    modalSelector: 'js-modal',
    callback: false
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb21wb25lbnQtcHJvdG90eXBlLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFNLDJCQUEyQixZQUFNLEFBQ3RDO0tBQUksUUFBUSxvQkFBQSxBQUFNLEtBQWxCLEFBQVksQUFBVyxBQUN2QjtTQUFBLEFBQVEsSUFBUixBQUFZLEFBRVo7QUFKRCxBQUFnQyxDQUFBOztBQU1oQyxJQUFHLHNCQUFILEFBQXlCLGVBQVEsQUFBTyxpQkFBUCxBQUF3QixvQkFBb0IsWUFBTSxBQUFFO3lCQUFBLEFBQXdCLFFBQVEsY0FBQTtTQUFBLEFBQU07QUFBdEMsQUFBOEM7QUFBbEcsQ0FBQTs7Ozs7Ozs7O0FDUmpDOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxPQUFPLFNBQVAsQUFBTyxLQUFBLEFBQUMsS0FBRCxBQUFNLE1BQVMsQUFDM0I7S0FBSSxNQUFNLEdBQUEsQUFBRyxNQUFILEFBQVMsS0FBSyxTQUFBLEFBQVMsaUJBQWpDLEFBQVUsQUFBYyxBQUEwQixBQUVsRDs7S0FBRyxJQUFBLEFBQUksV0FBUCxBQUFrQixHQUFHLE1BQU0sSUFBQSxBQUFJLE1BQVYsQUFBTSxBQUFVLEFBRXJDOztZQUFPLEFBQUksSUFBSSxjQUFBO2dCQUFNLEFBQU8sT0FBTyxPQUFBLEFBQU8sNEJBQXJCO1NBQWlELEFBQzlELEFBQ047YUFBVSxPQUFBLEFBQU8sT0FBUCxBQUFjLHdCQUZMLEFBQWlELEFBRTFELEFBQTRCO0FBRjhCLEFBQ3BFLEdBRG1CLEVBQU4sQUFBTSxBQUdqQjtBQUhKLEFBQU8sQUFJUCxFQUpPO0FB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OztpQkNMYyxBQUNFLEFBQ2I7a0JBRlcsQUFFRyxBQUNkO21CQUhXLEFBR0ksQUFDZjtjLEFBSlcsQUFJRDtBQUpDLEFBQ1giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsImltcG9ydCBNb2RhbCBmcm9tICcuL2xpYnMvY29tcG9uZW50JztcblxuY29uc3Qgb25ET01Db250ZW50TG9hZGVkVGFza3MgPSBbKCkgPT4ge1xuXHRsZXQgbW9kYWwgPSBNb2RhbC5pbml0KCcuanMtbW9kYWwnKTtcblx0Y29uc29sZS5sb2cobW9kYWwpO1xuXG59XTtcbiAgICBcbmlmKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4geyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKGZuID0+IGZuKCkpOyB9KTtcbiIsImltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2xpYi9kZWZhdWx0cyc7XG5pbXBvcnQgY29tcG9uZW50UHJvdG90eXBlIGZyb20gJy4vbGliL2NvbXBvbmVudC1wcm90b3R5cGUnO1xuXG5jb25zdCBpbml0ID0gKHNlbCwgb3B0cykgPT4ge1xuXHRsZXQgZWxzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbCkpO1xuXHRcblx0aWYoZWxzLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKCdNb2RhbCBjYW5ub3QgYmUgaW5pdGlhbGlzZWQsIG5vIHRyaWdnZXIgZWxlbWVudHMgZm91bmQnKTtcblx0XG5cdHJldHVybiBlbHMubWFwKGVsID0+IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShjb21wb25lbnRQcm90b3R5cGUpLCB7XG5cdFx0XHRub2RlOiBlbCxcblx0XHRcdHNldHRpbmdzOiBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0cylcblx0XHR9KS5pbml0KCkpO1xufTtcbiAgICBcbmV4cG9ydCBkZWZhdWx0IHsgaW5pdCB9OyIsImNvbnN0IFRSSUdHRVJfRVZFTlRTID0gd2luZG93LlBvaW50ZXJFdmVudCA/IFsncG9pbnRlcnVwJ10gOiBbJ29udG91Y2hzdGFydCcgaW4gd2luZG93ID8gJ3RvdWNoc3RhcnQnIDogJ2NsaWNrJywgJ2tleWRvd24nIF0sXG4gICAgICBUUklHR0VSX0tFWUNPREVTID0gWzEzLCAzMl0sXG5cdCAgRk9DVVNBQkxFX0VMRU1FTlRTID0gWydhW2hyZWZdJywgJ2FyZWFbaHJlZl0nLCAnaW5wdXQ6bm90KFtkaXNhYmxlZF0pJywgJ3NlbGVjdDpub3QoW2Rpc2FibGVkXSknLCAndGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pJywgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSknLCAnaWZyYW1lJywgJ29iamVjdCcsICdlbWJlZCcsICdbY29udGVudGVkaXRhYmxlXScsICdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRpbml0KCkge1xuXHRcdHRoaXMuaXNPcGVuID0gZmFsc2U7XG5cdFx0dGhpcy50b2dnbGVycyA9IHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtdG9nZ2xlcicpICYmIFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLXRvZ2dsZXInKSkpO1xuXG5cdFx0dGhpcy5ib3VuZEtleUxpc3RlbmVyID0gdGhpcy5rZXlMaXN0ZW5lci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgXG5cdFx0aWYoIXRoaXMudG9nZ2xlcnMubGVuZ3RoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZGFsIGNhbm5vdCBiZSBpbml0aWFsaXNlZCwgbm8gbW9kYWwgdG9nZ2xlciBlbGVtZW50cyBmb3VuZCcpO1xuXHRcdH1cblxuXHRcdHRoaXMuaW5pdFRyaWdnZXJzKCk7XG5cdFx0dGhpcy5mb2N1c2FibGVDaGlsZHJlbiA9IHRoaXMuZ2V0Rm9jdXNhYmxlQ2hpbGRyZW4oKTtcblx0XHR0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXHRpbml0VHJpZ2dlcnMoKXtcblx0XHR0aGlzLnRvZ2dsZXJzLmZvckVhY2godG9nZ2xlciA9PiB7XG5cdFx0XHRUUklHR0VSX0VWRU5UUy5mb3JFYWNoKGV2ID0+IHtcblx0XHRcdFx0dG9nZ2xlci5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcblx0XHRcdFx0XHRpZighIWUua2V5Q29kZSAmJiAhflRSSUdHRVJfS0VZQ09ERVMuaW5kZXhPZihlLmtleUNvZGUpKSByZXR1cm47XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHRoaXMuY2hhbmdlKHRoaXMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRGb2N1c2FibGVDaGlsZHJlbigpIHtcblx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbCh0aGlzLm5vZGUucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFMuam9pbignLCcpKSk7XG5cdH0sXG5cdHRyYXBUYWIoZSl7XG5cdFx0bGV0IGZvY3VzZWRJbmRleCA9IHRoaXMuZm9jdXNhYmxlQ2hpbGRyZW4uaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblx0XHRpZihlLnNoaWZ0S2V5ICYmIGZvY3VzZWRJbmRleCA9PT0gMCkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5mb2N1c2FibGVDaGlsZHJlblt0aGlzLmZvY3VzYWJsZUNoaWxkcmVuLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmKCFlLnNoaWZ0S2V5ICYmIGZvY3VzZWRJbmRleCA9PT0gdGhpcy5mb2N1c2FibGVDaGlsZHJlbi5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0dGhpcy5mb2N1c2FibGVDaGlsZHJlblswXS5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0a2V5TGlzdGVuZXIoZSl7XG5cdFx0aWYgKHRoaXMuaXNPcGVuICYmIGUua2V5Q29kZSA9PT0gMjcpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMudG9nZ2xlKCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmlzT3BlbiAmJiBlLmtleUNvZGUgPT09IDkpIHRoaXMudHJhcFRhYihlKTtcblx0fSxcblx0b3BlbigpIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5ib3VuZEtleUxpc3RlbmVyKTtcblx0XHR0aGlzLmxhc3RGb2N1c2VkID0gIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdFx0dGhpcy5mb2N1c2FibGVDaGlsZHJlbi5sZW5ndGggJiYgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge3RoaXMuZm9jdXNhYmxlQ2hpbGRyZW5bMF0uZm9jdXMoKTt9LCAwKTtcblx0XHR0aGlzLnRvZ2dsZSgpO1xuXHR9LFxuXHRjbG9zZSgpe1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmJvdW5kS2V5TGlzdGVuZXIpO1xuXHRcdHRoaXMubGFzdEZvY3VzZWQuZm9jdXMoKTtcblx0XHR0aGlzLnRvZ2dsZSgpO1xuXHR9LFxuXHR0b2dnbGUoKXtcblx0XHR0aGlzLmlzT3BlbiA9ICF0aGlzLmlzT3Blbjtcblx0XHR0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICF0aGlzLmlzT3Blbik7XG5cdFx0dGhpcy5ub2RlLmNsYXNzTGlzdC50b2dnbGUodGhpcy5zZXR0aW5ncy5vbkNsYXNzTmFtZSk7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzLm1haW5TZWxlY3RvcikgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzLm1haW5TZWxlY3Rvcikuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRoaXMuaXNPcGVuKTtcblx0fSxcblx0Y2hhbmdlKCkge1xuXHRcdGlmKCF0aGlzLmlzT3BlbikgdGhpcy5vcGVuKCk7XG5cdFx0ZWxzZSB0aGlzLmNsb3NlKCk7XG5cdFx0dHlwZW9mIHRoaXMuc2V0dGluZ3MuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgJiYgIHRoaXMuc2V0dGluZ3MuY2FsbGJhY2suY2FsbCh0aGlzKTtcblx0fVxufTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgb25DbGFzc05hbWU6ICdhY3RpdmUnLFxuICAgIG1haW5TZWxlY3RvcjogJ21haW4nLFxuICAgIG1vZGFsU2VsZWN0b3I6ICdqcy1tb2RhbCcsXG4gICAgY2FsbGJhY2s6IGZhbHNlXG59OyJdfQ==
