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
var TRIGGER_EVENTS = ['ontouchstart' in window ? 'touchstart' : 'click', 'keydown'],
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
		if (this.isOpen && e.keyCode === 9) this.trapTab(e);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb21wb25lbnQtcHJvdG90eXBlLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFNLDJCQUEyQixZQUFNLEFBQ3RDO0tBQUksUUFBUSxvQkFBQSxBQUFNLEtBQWxCLEFBQVksQUFBVyxBQUN2QjtTQUFBLEFBQVEsSUFBUixBQUFZLEFBRVo7QUFKRCxBQUFnQyxDQUFBOztBQU1oQyxJQUFHLHNCQUFILEFBQXlCLGVBQVEsQUFBTyxpQkFBUCxBQUF3QixvQkFBb0IsWUFBTSxBQUFFO3lCQUFBLEFBQXdCLFFBQVEsY0FBQTtTQUFBLEFBQU07QUFBdEMsQUFBOEM7QUFBbEcsQ0FBQTs7Ozs7Ozs7O0FDUmpDOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxPQUFPLFNBQVAsQUFBTyxLQUFBLEFBQUMsS0FBRCxBQUFNLE1BQVMsQUFDM0I7S0FBSSxNQUFNLEdBQUEsQUFBRyxNQUFILEFBQVMsS0FBSyxTQUFBLEFBQVMsaUJBQWpDLEFBQVUsQUFBYyxBQUEwQixBQUVsRDs7S0FBRyxJQUFBLEFBQUksV0FBUCxBQUFrQixHQUFHLE1BQU0sSUFBQSxBQUFJLE1BQVYsQUFBTSxBQUFVLEFBRXJDOztZQUFPLEFBQUksSUFBSSxjQUFBO2dCQUFNLEFBQU8sT0FBTyxPQUFBLEFBQU8sNEJBQXJCO1NBQWlELEFBQzlELEFBQ047YUFBVSxPQUFBLEFBQU8sT0FBUCxBQUFjLHdCQUZMLEFBQWlELEFBRTFELEFBQTRCO0FBRjhCLEFBQ3BFLEdBRG1CLEVBQU4sQUFBTSxBQUdqQjtBQUhKLEFBQU8sQUFJUCxFQUpPO0FB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O2MsQUFKVyxBQUlEO0FBSkMsQUFDWCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgTW9kYWwgZnJvbSAnLi9saWJzL2NvbXBvbmVudCc7XG5cbmNvbnN0IG9uRE9NQ29udGVudExvYWRlZFRhc2tzID0gWygpID0+IHtcblx0bGV0IG1vZGFsID0gTW9kYWwuaW5pdCgnLmpzLW1vZGFsJyk7XG5cdGNvbnNvbGUubG9nKG1vZGFsKTtcblxufV07XG4gICAgXG5pZignYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93KSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHsgb25ET01Db250ZW50TG9hZGVkVGFza3MuZm9yRWFjaChmbiA9PiBmbigpKTsgfSk7XG4iLCJpbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9saWIvZGVmYXVsdHMnO1xuaW1wb3J0IGNvbXBvbmVudFByb3RvdHlwZSBmcm9tICcuL2xpYi9jb21wb25lbnQtcHJvdG90eXBlJztcblxuY29uc3QgaW5pdCA9IChzZWwsIG9wdHMpID0+IHtcblx0bGV0IGVscyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWwpKTtcblx0XG5cdGlmKGVscy5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcignTW9kYWwgY2Fubm90IGJlIGluaXRpYWxpc2VkLCBubyB0cmlnZ2VyIGVsZW1lbnRzIGZvdW5kJyk7XG5cdFxuXHRyZXR1cm4gZWxzLm1hcChlbCA9PiBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoY29tcG9uZW50UHJvdG90eXBlKSwge1xuXHRcdFx0bm9kZTogZWwsXG5cdFx0XHRzZXR0aW5nczogT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdHMpXG5cdFx0fSkuaW5pdCgpKTtcbn07XG4gICAgXG5leHBvcnQgZGVmYXVsdCB7IGluaXQgfTsiLCJjb25zdCBUUklHR0VSX0VWRU5UUyA9IFsnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snLCAna2V5ZG93bicgXSxcbiAgICAgIFRSSUdHRVJfS0VZQ09ERVMgPSBbMTMsIDMyXSxcblx0ICBGT0NVU0FCTEVfRUxFTUVOVFMgPSBbJ2FbaHJlZl0nLCAnYXJlYVtocmVmXScsICdpbnB1dDpub3QoW2Rpc2FibGVkXSknLCAnc2VsZWN0Om5vdChbZGlzYWJsZWRdKScsICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSknLCAnYnV0dG9uOm5vdChbZGlzYWJsZWRdKScsICdpZnJhbWUnLCAnb2JqZWN0JywgJ2VtYmVkJywgJ1tjb250ZW50ZWRpdGFibGVdJywgJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKSddO1xuXG5cdFx0XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0aW5pdCgpIHtcblx0XHR0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXHRcdHRoaXMudG9nZ2xlcnMgPSB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLXRvZ2dsZXInKSAmJiBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgdGhpcy5ub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC10b2dnbGVyJykpKTtcbiAgICAgICAgICAgIFxuXHRcdGlmKCF0aGlzLnRvZ2dsZXJzLmxlbmd0aCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNb2RhbCBjYW5ub3QgYmUgaW5pdGlhbGlzZWQsIG5vIG1vZGFsIHRvZ2dsZXIgZWxlbWVudHMgZm91bmQnKTtcblx0XHR9XG5cblx0XHR0aGlzLmluaXRUcmlnZ2VycygpO1xuXHRcdHRoaXMuZm9jdXNhYmxlQ2hpbGRyZW4gPSB0aGlzLmdldEZvY3VzYWJsZUNoaWxkcmVuKCk7XG5cdFx0dGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblx0aW5pdFRyaWdnZXJzKCl7XG5cdFx0dGhpcy50b2dnbGVycy5mb3JFYWNoKHRvZ2dsZXIgPT4ge1xuXHRcdFx0VFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG5cdFx0XHRcdHRvZ2dsZXIuYWRkRXZlbnRMaXN0ZW5lcihldiwgZSA9PiB7XG5cdFx0XHRcdFx0aWYoISFlLmtleUNvZGUgJiYgIX5UUklHR0VSX0tFWUNPREVTLmluZGV4T2YoZS5rZXlDb2RlKSkgcmV0dXJuO1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLmNoYW5nZSh0aGlzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSxcblx0Z2V0Rm9jdXNhYmxlQ2hpbGRyZW4oKSB7XG5cdFx0cmV0dXJuIFtdLnNsaWNlLmNhbGwodGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoRk9DVVNBQkxFX0VMRU1FTlRTLmpvaW4oJywnKSkpO1xuXHR9LFxuXHR0cmFwVGFiKGUpe1xuXHRcdGxldCBmb2N1c2VkSW5kZXggPSB0aGlzLmZvY3VzYWJsZUNoaWxkcmVuLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG5cdFx0aWYoZS5zaGlmdEtleSAmJiBmb2N1c2VkSW5kZXggPT09IDApIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuZm9jdXNhYmxlQ2hpbGRyZW5bdGhpcy5mb2N1c2FibGVDaGlsZHJlbi5sZW5ndGggLSAxXS5mb2N1cygpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZighZS5zaGlmdEtleSAmJiBmb2N1c2VkSW5kZXggPT09IHRoaXMuZm9jdXNhYmxlQ2hpbGRyZW4ubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHRoaXMuZm9jdXNhYmxlQ2hpbGRyZW5bMF0uZm9jdXMoKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGtleUxpc3RlbmVyKGUpe1xuXHRcdGlmICh0aGlzLmlzT3BlbiAmJiBlLmtleUNvZGUgPT09IDI3KSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnRvZ2dsZSgpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5pc09wZW4gJiYgZS5rZXlDb2RlID09PSA5KSB0aGlzLnRyYXBUYWIoZSk7XG5cdH0sXG5cdG9wZW4oKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMua2V5TGlzdGVuZXIuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5sYXN0Rm9jdXNlZCA9ICBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHRcdHRoaXMuZm9jdXNhYmxlQ2hpbGRyZW4ubGVuZ3RoICYmIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHt0aGlzLmZvY3VzYWJsZUNoaWxkcmVuWzBdLmZvY3VzKCk7fSwgMCk7XG5cdFx0dGhpcy50b2dnbGUoKTtcblx0fSxcblx0Y2xvc2UoKXtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlMaXN0ZW5lci5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmxhc3RGb2N1c2VkLmZvY3VzKCk7XG5cdFx0dGhpcy50b2dnbGUoKTtcblx0fSxcblx0dG9nZ2xlKCl7XG5cdFx0dGhpcy5pc09wZW4gPSAhdGhpcy5pc09wZW47XG5cdFx0dGhpcy5ub2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAhdGhpcy5pc09wZW4pO1xuXHRcdHRoaXMubm9kZS5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuc2V0dGluZ3Mub25DbGFzc05hbWUpO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZXR0aW5ncy5tYWluU2VsZWN0b3IpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZXR0aW5ncy5tYWluU2VsZWN0b3IpLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0aGlzLmlzT3Blbik7XG5cdH0sXG5cdGNoYW5nZSgpIHtcblx0XHRpZighdGhpcy5pc09wZW4pIHRoaXMub3BlbigpO1xuXHRcdGVsc2UgdGhpcy5jbG9zZSgpO1xuXHRcdHR5cGVvZiB0aGlzLnNldHRpbmdzLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nICYmICB0aGlzLnNldHRpbmdzLmNhbGxiYWNrLmNhbGwodGhpcyk7XG5cdH1cbn07IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIG9uQ2xhc3NOYW1lOiAnYWN0aXZlJyxcbiAgICBtYWluU2VsZWN0b3I6ICdtYWluJyxcbiAgICBtb2RhbFNlbGVjdG9yOiAnanMtbW9kYWwnLFxuICAgIGNhbGxiYWNrOiBmYWxzZVxufTsiXX0=
