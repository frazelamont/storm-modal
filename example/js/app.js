(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var TRIGGER_EVENTS = window.PointerEvent ? ['pointerup', 'keydown'] : ['ontouchstart' in window ? 'touchstart' : 'click', 'keydown'],
    TRIGGER_KEYCODES = [13, 32],
    FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'];

exports.default = {
	init: function init() {
		this.isOpen = false;
		this.dialog = this.node.querySelector('[role=dialog]');
		if (!this.dialog) throw new Error('Modal cannot be initialised, a modal must contain a dialog (role="dialog")');

		this.togglers = this.node.getAttribute('data-modal-toggler') && [].slice.call(document.querySelectorAll('.' + this.node.getAttribute('data-modal-toggler')));
		if (!this.togglers.length) throw new Error('Modal cannot be initialised, no modal toggler elements found');

		this.boundKeyListener = this.keyListener.bind(this);

		this.initTriggers();
		this.focusableChildren = this.getFocusableChildren();
		this.dialog.setAttribute('aria-hidden', true);
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
		this.dialog.setAttribute('aria-hidden', !this.isOpen);
		this.node.classList.toggle(this.settings.onClassName);
		// document.querySelector(this.settings.mainSelector) && document.querySelector(this.settings.mainSelector).setAttribute('aria-hidden', this.isOpen);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb21wb25lbnQtcHJvdG90eXBlLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFBLGFBQUEsUUFBQSxrQkFBQSxDQUFBOzs7Ozs7OztBQUVBLElBQU0sMEJBQTBCLENBQUMsWUFBTTtBQUN0QyxLQUFJLFFBQVEsWUFBQSxPQUFBLENBQUEsSUFBQSxDQUFaLFdBQVksQ0FBWjtBQUNBLFNBQUEsR0FBQSxDQUFBLEtBQUE7QUFGRCxDQUFnQyxDQUFoQzs7QUFNQSxJQUFHLHNCQUFILE1BQUEsRUFBaUMsT0FBQSxnQkFBQSxDQUFBLGtCQUFBLEVBQTRDLFlBQU07QUFBRSx5QkFBQSxPQUFBLENBQWdDLFVBQUEsRUFBQSxFQUFBO0FBQUEsU0FBQSxJQUFBO0FBQWhDLEVBQUE7QUFBcEQsQ0FBQTs7Ozs7Ozs7O0FDUmpDLElBQUEsWUFBQSxRQUFBLGdCQUFBLENBQUE7Ozs7QUFDQSxJQUFBLHNCQUFBLFFBQUEsMkJBQUEsQ0FBQTs7Ozs7Ozs7QUFFQSxJQUFNLE9BQU8sU0FBUCxJQUFPLENBQUEsR0FBQSxFQUFBLElBQUEsRUFBZTtBQUMzQixLQUFJLE1BQU0sR0FBQSxLQUFBLENBQUEsSUFBQSxDQUFjLFNBQUEsZ0JBQUEsQ0FBeEIsR0FBd0IsQ0FBZCxDQUFWOztBQUVBLEtBQUcsSUFBQSxNQUFBLEtBQUgsQ0FBQSxFQUFxQixNQUFNLElBQUEsS0FBQSxDQUFOLHdEQUFNLENBQU47O0FBRXJCLFFBQU8sSUFBQSxHQUFBLENBQVEsVUFBQSxFQUFBLEVBQUE7QUFBQSxTQUFNLE9BQUEsTUFBQSxDQUFjLE9BQUEsTUFBQSxD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QUFBLENBQTJCLEtBQUEsUUFBQSxDQUEzQixXQUFBO0FBQ0E7QUFoRWEsRUFBQTtBQUFBLFNBQUEsU0FBQSxNQUFBLEdBa0VMO0FBQ1IsTUFBRyxDQUFDLEtBQUosTUFBQSxFQUFpQixLQUFqQixJQUFpQixHQUFqQixLQUNLLEtBQUEsS0FBQTtBQUNMLFNBQU8sS0FBQSxRQUFBLENBQVAsUUFBQSxLQUFBLFVBQUEsSUFBaUQsS0FBQSxRQUFBLENBQUEsUUFBQSxDQUFBLElBQUEsQ0FBakQsSUFBaUQsQ0FBakQ7QUFDQTtBQXRFYSxDOzs7Ozs7OztrQkNKQTtBQUNYLGlCQURXLFFBQUE7QUFFWCxrQkFGVyxNQUFBO0FBR1gsbUJBSFcsVUFBQTtBQUlYLGNBQVU7QUFKQyxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IE1vZGFsIGZyb20gJy4vbGlicy9jb21wb25lbnQnO1xuXG5jb25zdCBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcyA9IFsoKSA9PiB7XG5cdGxldCBtb2RhbCA9IE1vZGFsLmluaXQoJy5qcy1tb2RhbCcpO1xuXHRjb25zb2xlLmxvZyhtb2RhbCk7XG5cbn1dO1xuICAgIFxuaWYoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7IG9uRE9NQ29udGVudExvYWRlZFRhc2tzLmZvckVhY2goZm4gPT4gZm4oKSk7IH0pO1xuIiwiaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vbGliL2RlZmF1bHRzJztcbmltcG9ydCBjb21wb25lbnRQcm90b3R5cGUgZnJvbSAnLi9saWIvY29tcG9uZW50LXByb3RvdHlwZSc7XG5cbmNvbnN0IGluaXQgPSAoc2VsLCBvcHRzKSA9PiB7XG5cdGxldCBlbHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsKSk7XG5cdFxuXHRpZihlbHMubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ01vZGFsIGNhbm5vdCBiZSBpbml0aWFsaXNlZCwgbm8gdHJpZ2dlciBlbGVtZW50cyBmb3VuZCcpO1xuXHRcblx0cmV0dXJuIGVscy5tYXAoZWwgPT4gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGNvbXBvbmVudFByb3RvdHlwZSksIHtcblx0XHRcdG5vZGU6IGVsLFxuXHRcdFx0c2V0dGluZ3M6IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRzKVxuXHRcdH0pLmluaXQoKSk7XG59O1xuICAgIFxuZXhwb3J0IGRlZmF1bHQgeyBpbml0IH07IiwiY29uc3QgVFJJR0dFUl9FVkVOVFMgPSB3aW5kb3cuUG9pbnRlckV2ZW50ID8gWydwb2ludGVydXAnLCAna2V5ZG93biddIDogWydvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljaycsICdrZXlkb3duJyBdLFxuICAgICAgVFJJR0dFUl9LRVlDT0RFUyA9IFsxMywgMzJdLFxuXHQgIEZPQ1VTQUJMRV9FTEVNRU5UUyA9IFsnYVtocmVmXScsICdhcmVhW2hyZWZdJywgJ2lucHV0Om5vdChbZGlzYWJsZWRdKScsICdzZWxlY3Q6bm90KFtkaXNhYmxlZF0pJywgJ3RleHRhcmVhOm5vdChbZGlzYWJsZWRdKScsICdidXR0b246bm90KFtkaXNhYmxlZF0pJywgJ2lmcmFtZScsICdvYmplY3QnLCAnZW1iZWQnLCAnW2NvbnRlbnRlZGl0YWJsZV0nLCAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJ107XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0aW5pdCgpIHtcblx0XHR0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXHRcdHRoaXMuZGlhbG9nID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPWRpYWxvZ10nKTtcblx0XHRpZighdGhpcy5kaWFsb2cpIHRocm93IG5ldyBFcnJvcignTW9kYWwgY2Fubm90IGJlIGluaXRpYWxpc2VkLCBhIG1vZGFsIG11c3QgY29udGFpbiBhIGRpYWxvZyAocm9sZT1cImRpYWxvZ1wiKScpO1xuXG5cdFx0dGhpcy50b2dnbGVycyA9IHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtdG9nZ2xlcicpICYmIFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLXRvZ2dsZXInKSkpO1xuXHRcdGlmKCF0aGlzLnRvZ2dsZXJzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKCdNb2RhbCBjYW5ub3QgYmUgaW5pdGlhbGlzZWQsIG5vIG1vZGFsIHRvZ2dsZXIgZWxlbWVudHMgZm91bmQnKTtcblxuXHRcdHRoaXMuYm91bmRLZXlMaXN0ZW5lciA9IHRoaXMua2V5TGlzdGVuZXIuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuaW5pdFRyaWdnZXJzKCk7XG5cdFx0dGhpcy5mb2N1c2FibGVDaGlsZHJlbiA9IHRoaXMuZ2V0Rm9jdXNhYmxlQ2hpbGRyZW4oKTtcblx0XHR0aGlzLmRpYWxvZy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cdGluaXRUcmlnZ2Vycygpe1xuXHRcdHRoaXMudG9nZ2xlcnMuZm9yRWFjaCh0b2dnbGVyID0+IHtcblx0XHRcdFRSSUdHRVJfRVZFTlRTLmZvckVhY2goZXYgPT4ge1xuXHRcdFx0XHR0b2dnbGVyLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGUgPT4ge1xuXHRcdFx0XHRcdGlmKCEhZS5rZXlDb2RlICYmICF+VFJJR0dFUl9LRVlDT0RFUy5pbmRleE9mKGUua2V5Q29kZSkpIHJldHVybjtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5jaGFuZ2UodGhpcyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldEZvY3VzYWJsZUNoaWxkcmVuKCkge1xuXHRcdHJldHVybiBbXS5zbGljZS5jYWxsKHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UUy5qb2luKCcsJykpKTtcblx0fSxcblx0dHJhcFRhYihlKXtcblx0XHRsZXQgZm9jdXNlZEluZGV4ID0gdGhpcy5mb2N1c2FibGVDaGlsZHJlbi5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXHRcdGlmKGUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSAwKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuW3RoaXMuZm9jdXNhYmxlQ2hpbGRyZW4ubGVuZ3RoIC0gMV0uZm9jdXMoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYoIWUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSB0aGlzLmZvY3VzYWJsZUNoaWxkcmVuLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuWzBdLmZvY3VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRrZXlMaXN0ZW5lcihlKXtcblx0XHRpZiAodGhpcy5pc09wZW4gJiYgZS5rZXlDb2RlID09PSAyNykge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy50b2dnbGUoKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuaXNPcGVuICYmIGUua2V5Q29kZSA9PT0gOSkgdGhpcy50cmFwVGFiKGUpO1xuXHR9LFxuXHRvcGVuKCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmJvdW5kS2V5TGlzdGVuZXIpO1xuXHRcdHRoaXMubGFzdEZvY3VzZWQgPSAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuLmxlbmd0aCAmJiB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7dGhpcy5mb2N1c2FibGVDaGlsZHJlblswXS5mb2N1cygpO30sIDApO1xuXHRcdHRoaXMudG9nZ2xlKCk7XG5cdH0sXG5cdGNsb3NlKCl7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRLZXlMaXN0ZW5lcik7XG5cdFx0dGhpcy5sYXN0Rm9jdXNlZC5mb2N1cygpO1xuXHRcdHRoaXMudG9nZ2xlKCk7XG5cdH0sXG5cdHRvZ2dsZSgpe1xuXHRcdHRoaXMuaXNPcGVuID0gIXRoaXMuaXNPcGVuO1xuXHRcdHRoaXMuZGlhbG9nLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAhdGhpcy5pc09wZW4pO1xuXHRcdHRoaXMubm9kZS5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuc2V0dGluZ3Mub25DbGFzc05hbWUpO1xuXHRcdC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZXR0aW5ncy5tYWluU2VsZWN0b3IpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZXR0aW5ncy5tYWluU2VsZWN0b3IpLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0aGlzLmlzT3Blbik7XG5cdH0sXG5cdGNoYW5nZSgpIHtcblx0XHRpZighdGhpcy5pc09wZW4pIHRoaXMub3BlbigpO1xuXHRcdGVsc2UgdGhpcy5jbG9zZSgpO1xuXHRcdHR5cGVvZiB0aGlzLnNldHRpbmdzLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nICYmICB0aGlzLnNldHRpbmdzLmNhbGxiYWNrLmNhbGwodGhpcyk7XG5cdH1cbn07IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIG9uQ2xhc3NOYW1lOiAnYWN0aXZlJyxcbiAgICBtYWluU2VsZWN0b3I6ICdtYWluJyxcbiAgICBtb2RhbFNlbGVjdG9yOiAnanMtbW9kYWwnLFxuICAgIGNhbGxiYWNrOiBmYWxzZVxufTsiXX0=
