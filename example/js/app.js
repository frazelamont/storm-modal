(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
var TRIGGER_EVENTS = [window.PointerEvent ? 'pointerdown' : 'ontouchstart' in window ? 'touchstart' : 'click', 'keydown'],
    TRIGGER_KEYCODES = [13, 32],
    FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'];

exports.default = {
	init: function init() {
		this.isOpen = false;
		this.togglers = this.node.getAttribute('data-modal-toggler') && [].slice.call(document.querySelectorAll('.' + this.node.getAttribute('data-modal-toggler')));

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
		if (this.isOpen && e.keyCode === 9) {
			this.trapTab(e);
		}
	},
	open: function open() {
		var _this2 = this;

		document.addEventListener('keydown', this.keyListener.bind(this));
		this.lastFocused = document.activeElement;
		this.focusableChildren.length && window.setTimeout(function () {
			_this2.focusableChildren[0].focus();
		}, 0);
		this.toggle();
	},
	close: function close() {
		document.removeEventListener('keydown', this.keyListener.bind(this));
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
		if (!this.isOpen) {
			this.open();
		} else {
			this.close();
		}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb21wb25lbnQtcHJvdG90eXBlLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFNLDJCQUEyQixZQUFNLEFBQ3RDO0tBQUksUUFBUSxvQkFBQSxBQUFNLEtBQWxCLEFBQVksQUFBVyxBQUN2QjtTQUFBLEFBQVEsSUFBUixBQUFZLEFBRVo7QUFKRCxBQUFnQyxDQUFBOztBQU1oQyxJQUFHLHNCQUFILEFBQXlCLGVBQVEsQUFBTyxpQkFBUCxBQUF3QixvQkFBb0IsWUFBTSxBQUFFO3lCQUFBLEFBQXdCLFFBQVEsY0FBQTtTQUFBLEFBQU07QUFBdEMsQUFBOEM7QUFBbEcsQ0FBQTs7Ozs7Ozs7O0FDUmpDOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxPQUFPLFNBQVAsQUFBTyxLQUFBLEFBQUMsS0FBRCxBQUFNLE1BQVMsQUFDM0I7S0FBSSxNQUFNLEdBQUEsQUFBRyxNQUFILEFBQVMsS0FBSyxTQUFBLEFBQVMsaUJBQWpDLEFBQVUsQUFBYyxBQUEwQixBQUVsRDs7S0FBRyxJQUFBLEFBQUksV0FBUCxBQUFrQixHQUFHLE1BQU0sSUFBQSxBQUFJLE1BQVYsQUFBTSxBQUFVLEFBRXJDOztZQUFPLEFBQUksSUFBSSxjQUFBO2dCQUFNLEFBQU8sT0FBTyxPQUFBLEFBQU8sNEJBQXJCO1NBQWlELEFBQzlELEFBQ047YUFBVSxPQUFBLEFBQU8sT0FBUCxBQUFjLHdCQUZMLEFBQWlELEFBRTFELEFBQTRCO0FBRjhCLEFBQ3BFLEdBRG1CLEVBQU4sQUFBTSxBQUdqQjtBQUhKLEFBQU8sQUFJUCxFQUpPO0FB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Ozs7Ozs7OztpQkNQYyxBQUNFLEFBQ2I7a0JBRlcsQUFFRyxBQUNkO21CQUhXLEFBR0ksQUFDZjtjLEFBSlcsQUFJRDtBQUpDLEFBQ1giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IE1vZGFsIGZyb20gJy4vbGlicy9jb21wb25lbnQnO1xuXG5jb25zdCBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcyA9IFsoKSA9PiB7XG5cdGxldCBtb2RhbCA9IE1vZGFsLmluaXQoJy5qcy1tb2RhbCcpO1xuXHRjb25zb2xlLmxvZyhtb2RhbCk7XG5cbn1dO1xuICAgIFxuaWYoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7IG9uRE9NQ29udGVudExvYWRlZFRhc2tzLmZvckVhY2goZm4gPT4gZm4oKSk7IH0pO1xuIiwiaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vbGliL2RlZmF1bHRzJztcbmltcG9ydCBjb21wb25lbnRQcm90b3R5cGUgZnJvbSAnLi9saWIvY29tcG9uZW50LXByb3RvdHlwZSc7XG5cbmNvbnN0IGluaXQgPSAoc2VsLCBvcHRzKSA9PiB7XG5cdGxldCBlbHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsKSk7XG5cdFxuXHRpZihlbHMubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ01vZGFsIGNhbm5vdCBiZSBpbml0aWFsaXNlZCwgbm8gdHJpZ2dlciBlbGVtZW50cyBmb3VuZCcpO1xuXHRcblx0cmV0dXJuIGVscy5tYXAoZWwgPT4gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGNvbXBvbmVudFByb3RvdHlwZSksIHtcblx0XHRcdG5vZGU6IGVsLFxuXHRcdFx0c2V0dGluZ3M6IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRzKVxuXHRcdH0pLmluaXQoKSk7XG59O1xuICAgIFxuZXhwb3J0IGRlZmF1bHQgeyBpbml0IH07IiwiY29uc3QgVFJJR0dFUl9FVkVOVFMgPSBbd2luZG93LlBvaW50ZXJFdmVudCA/ICdwb2ludGVyZG93bicgOiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snLCAna2V5ZG93bicgXSxcbiAgICAgIFRSSUdHRVJfS0VZQ09ERVMgPSBbMTMsIDMyXSxcblx0ICBGT0NVU0FCTEVfRUxFTUVOVFMgPSBbJ2FbaHJlZl0nLCAnYXJlYVtocmVmXScsICdpbnB1dDpub3QoW2Rpc2FibGVkXSknLCAnc2VsZWN0Om5vdChbZGlzYWJsZWRdKScsICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSknLCAnYnV0dG9uOm5vdChbZGlzYWJsZWRdKScsICdpZnJhbWUnLCAnb2JqZWN0JywgJ2VtYmVkJywgJ1tjb250ZW50ZWRpdGFibGVdJywgJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKSddO1xuXG5cdFx0XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0aW5pdCgpIHtcblx0XHR0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXHRcdHRoaXMudG9nZ2xlcnMgPSB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLXRvZ2dsZXInKSAmJiBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgdGhpcy5ub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC10b2dnbGVyJykpKTtcbiAgICAgICAgICAgIFxuXHRcdGlmKCF0aGlzLnRvZ2dsZXJzLmxlbmd0aCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNb2RhbCBjYW5ub3QgYmUgaW5pdGlhbGlzZWQsIG5vIG1vZGFsIHRvZ2dsZXIgZWxlbWVudHMgZm91bmQnKTtcblx0XHR9XG5cblx0XHR0aGlzLmluaXRUcmlnZ2VycygpO1xuXHRcdHRoaXMuZm9jdXNhYmxlQ2hpbGRyZW4gPSB0aGlzLmdldEZvY3VzYWJsZUNoaWxkcmVuKCk7XG5cdFx0dGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblx0aW5pdFRyaWdnZXJzKCl7XG5cdFx0dGhpcy50b2dnbGVycy5mb3JFYWNoKHRvZ2dsZXIgPT4ge1xuXHRcdFx0VFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG5cdFx0XHRcdHRvZ2dsZXIuYWRkRXZlbnRMaXN0ZW5lcihldiwgZSA9PiB7XG5cdFx0XHRcdFx0aWYoISFlLmtleUNvZGUgJiYgIX5UUklHR0VSX0tFWUNPREVTLmluZGV4T2YoZS5rZXlDb2RlKSkgcmV0dXJuO1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLmNoYW5nZSh0aGlzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblx0Z2V0Rm9jdXNhYmxlQ2hpbGRyZW4oKSB7XG5cdFx0cmV0dXJuIFtdLnNsaWNlLmNhbGwodGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoRk9DVVNBQkxFX0VMRU1FTlRTLmpvaW4oJywnKSkpO1xuXHR9LFxuXHR0cmFwVGFiKGUpe1xuXHRcdGxldCBmb2N1c2VkSW5kZXggPSB0aGlzLmZvY3VzYWJsZUNoaWxkcmVuLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG5cdFx0aWYoZS5zaGlmdEtleSAmJiBmb2N1c2VkSW5kZXggPT09IDApIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuZm9jdXNhYmxlQ2hpbGRyZW5bdGhpcy5mb2N1c2FibGVDaGlsZHJlbi5sZW5ndGggLSAxXS5mb2N1cygpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZighZS5zaGlmdEtleSAmJiBmb2N1c2VkSW5kZXggPT09IHRoaXMuZm9jdXNhYmxlQ2hpbGRyZW4ubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHRoaXMuZm9jdXNhYmxlQ2hpbGRyZW5bMF0uZm9jdXMoKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGtleUxpc3RlbmVyKGUpe1xuXHRcdGlmICh0aGlzLmlzT3BlbiAmJiBlLmtleUNvZGUgPT09IDI3KSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnRvZ2dsZSgpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5pc09wZW4gJiYgZS5rZXlDb2RlID09PSA5KSB7XG5cdFx0XHR0aGlzLnRyYXBUYWIoZSk7XG5cdFx0fVxuXHR9LFxuXHRvcGVuKCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmtleUxpc3RlbmVyLmJpbmQodGhpcykpO1xuXHRcdHRoaXMubGFzdEZvY3VzZWQgPSAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuLmxlbmd0aCAmJiB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7dGhpcy5mb2N1c2FibGVDaGlsZHJlblswXS5mb2N1cygpO30sIDApO1xuXHRcdHRoaXMudG9nZ2xlKCk7XG5cdH0sXG5cdGNsb3NlKCl7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMua2V5TGlzdGVuZXIuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5sYXN0Rm9jdXNlZC5mb2N1cygpO1xuXHRcdHRoaXMudG9nZ2xlKCk7XG5cdH0sXG5cdHRvZ2dsZSgpe1xuXHRcdHRoaXMuaXNPcGVuID0gIXRoaXMuaXNPcGVuO1xuXHRcdHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgIXRoaXMuaXNPcGVuKTtcblx0XHR0aGlzLm5vZGUuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLnNldHRpbmdzLm9uQ2xhc3NOYW1lKTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3MubWFpblNlbGVjdG9yKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3MubWFpblNlbGVjdG9yKS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdGhpcy5pc09wZW4pO1xuXHR9LFxuXHRjaGFuZ2UoKSB7XG5cdFx0aWYoIXRoaXMuaXNPcGVuKXtcblx0XHRcdHRoaXMub3BlbigpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXHRcdHR5cGVvZiB0aGlzLnNldHRpbmdzLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nICYmICB0aGlzLnNldHRpbmdzLmNhbGxiYWNrLmNhbGwodGhpcyk7XG5cdH1cbn07IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIG9uQ2xhc3NOYW1lOiAnYWN0aXZlJyxcbiAgICBtYWluU2VsZWN0b3I6ICdtYWluJyxcbiAgICBtb2RhbFNlbGVjdG9yOiAnanMtbW9kYWwnLFxuICAgIGNhbGxiYWNrOiBmYWxzZVxufTsiXX0=
