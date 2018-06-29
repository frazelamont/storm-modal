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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb21wb25lbnQtcHJvdG90eXBlLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFBLGFBQUEsUUFBQSxrQkFBQSxDQUFBOzs7Ozs7OztBQUVBLElBQU0sMEJBQTBCLENBQUMsWUFBTTtBQUN0QyxLQUFJLFFBQVEsWUFBQSxPQUFBLENBQUEsSUFBQSxDQUFaLFdBQVksQ0FBWjtBQUNBLFNBQUEsR0FBQSxDQUFBLEtBQUE7QUFGRCxDQUFnQyxDQUFoQzs7QUFNQSxJQUFHLHNCQUFILE1BQUEsRUFBaUMsT0FBQSxnQkFBQSxDQUFBLGtCQUFBLEVBQTRDLFlBQU07QUFBRSx5QkFBQSxPQUFBLENBQWdDLFVBQUEsRUFBQSxFQUFBO0FBQUEsU0FBQSxJQUFBO0FBQWhDLEVBQUE7QUFBcEQsQ0FBQTs7Ozs7Ozs7O0FDUmpDLElBQUEsWUFBQSxRQUFBLGdCQUFBLENBQUE7Ozs7QUFDQSxJQUFBLHNCQUFBLFFBQUEsMkJBQUEsQ0FBQTs7Ozs7Ozs7QUFFQSxJQUFNLE9BQU8sU0FBUCxJQUFPLENBQUEsR0FBQSxFQUFBLElBQUEsRUFBZTtBQUMzQixLQUFJLE1BQU0sR0FBQSxLQUFBLENBQUEsSUFBQSxDQUFjLFNBQUEsZ0JBQUEsQ0FBeEIsR0FBd0IsQ0FBZCxDQUFWOztBQUVBLEtBQUcsSUFBQSxNQUFBLEtBQUgsQ0FBQSxFQUFxQixNQUFNLElBQUEsS0FBQSxDQUFOLHdEQUFNLENBQU47O0FBRXJCLFFBQU8sSUFBQSxHQUFBLENBQVEsVUFBQSxFQUFBLEVBQUE7QUFBQSxTQUFNLE9BQUEsTUFBQSxDQUFjLE9BQUEsTUFBQSxDQUFjLHFCQUE1QixPQUFjLENBQWQsRUFBaUQ7QUFDcEUsU0FEb0UsRUFBQTtBQUVwRSxhQUFVLE9BQUEsTUFBQSxDQUFBLEVBQUEsRUFBa0IsV0FBbEIsT0FBQSxFQUFBLElBQUE7QUFGMEQsR0FBakQsRUFBTixJQUFNLEVBQU47QUFBZixFQUFPLENBQVA7QUFMRCxDQUFBOztrQkFXZSxFQUFFLE1BQUYsSUFBQSxFOzs7Ozs7OztBQ2RmLElBQU0saUJBQWlCLE9BQUEsWUFBQSxHQUFzQixDQUF0QixXQUFzQixDQUF0QixHQUFzQyxDQUFDLGtCQUFBLE1BQUEsR0FBQSxZQUFBLEdBQUQsT0FBQSxFQUE3RCxTQUE2RCxDQUE3RDtBQUFBLElBQ00sbUJBQW1CLENBQUEsRUFBQSxFQUR6QixFQUN5QixDQUR6QjtBQUFBLElBRUcscUJBQXFCLENBQUEsU0FBQSxFQUFBLFlBQUEsRUFBQSx1QkFBQSxFQUFBLHdCQUFBLEVBQUEsMEJBQUEsRUFBQSx3QkFBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLG1CQUFBLEVBRnhCLGlDQUV3QixDQUZ4Qjs7a0JBSWU7QUFBQSxPQUFBLFNBQUEsSUFBQSxHQUNQO0FBQ04sT0FBQSxNQUFBLEdBQUEsS0FBQTtBQUNBLE9BQUEsUUFBQSxHQUFnQixLQUFBLElBQUEsQ0FBQSxZQUFBLENBQUEsb0JBQUEsS0FBZ0QsR0FBQSxLQUFBLENBQUEsSUFBQSxDQUFjLFNBQUEsZ0JBQUEsQ0FBMEIsTUFBTSxLQUFBLElBQUEsQ0FBQSxZQUFBLENBQTlHLG9CQUE4RyxDQUFoQyxDQUFkLENBQWhFOztBQUVBLE9BQUEsZ0JBQUEsR0FBd0IsS0FBQSxXQUFBLENBQUEsSUFBQSxDQUF4QixJQUF3QixDQUF4Qjs7QUFFQSxNQUFHLENBQUMsS0FBQSxRQUFBLENBQUosTUFBQSxFQUEwQjtBQUN6QixTQUFNLElBQUEsS0FBQSxDQUFOLDhEQUFNLENBQU47QUFDQTs7QUFFRCxPQUFBLFlBQUE7QUFDQSxPQUFBLGlCQUFBLEdBQXlCLEtBQXpCLG9CQUF5QixFQUF6QjtBQUNBLE9BQUEsSUFBQSxDQUFBLFlBQUEsQ0FBQSxhQUFBLEVBQUEsSUFBQTtBQUNBLFNBQUEsSUFBQTtBQWRhLEVBQUE7QUFBQSxlQUFBLFNBQUEsWUFBQSxHQWdCQTtBQUFBLE1BQUEsUUFBQSxJQUFBOztBQUNiLE9BQUEsUUFBQSxDQUFBLE9BQUEsQ0FBc0IsVUFBQSxPQUFBLEVBQVc7QUFDaEMsa0JBQUEsT0FBQSxDQUF1QixVQUFBLEVBQUEsRUFBTTtBQUM1QixZQUFBLGdCQUFBLENBQUEsRUFBQSxFQUE2QixVQUFBLENBQUEsRUFBSztBQUNqQyxTQUFHLENBQUMsQ0FBQyxFQUFGLE9BQUEsSUFBZSxDQUFDLENBQUMsaUJBQUEsT0FBQSxDQUF5QixFQUE3QyxPQUFvQixDQUFwQixFQUF5RDtBQUN6RCxPQUFBLGNBQUE7QUFDQSxXQUFBLE1BQUEsQ0FBQSxLQUFBO0FBSEQsS0FBQTtBQURELElBQUE7QUFERCxHQUFBO0FBakJhLEVBQUE7QUFBQSx1QkFBQSxTQUFBLG9CQUFBLEdBMkJTO0FBQ3RCLFNBQU8sR0FBQSxLQUFBLENBQUEsSUFBQSxDQUFjLEtBQUEsSUFBQSxDQUFBLGdCQUFBLENBQTJCLG1CQUFBLElBQUEsQ0FBaEQsR0FBZ0QsQ0FBM0IsQ0FBZCxDQUFQO0FBNUJhLEVBQUE7QUFBQSxVQUFBLFNBQUEsT0FBQSxDQUFBLENBQUEsRUE4Qko7QUFDVCxNQUFJLGVBQWUsS0FBQSxpQkFBQSxDQUFBLE9BQUEsQ0FBK0IsU0FBbEQsYUFBbUIsQ0FBbkI7QUFDQSxNQUFHLEVBQUEsUUFBQSxJQUFjLGlCQUFqQixDQUFBLEVBQXFDO0FBQ3BDLEtBQUEsY0FBQTtBQUNBLFFBQUEsaUJBQUEsQ0FBdUIsS0FBQSxpQkFBQSxDQUFBLE1BQUEsR0FBdkIsQ0FBQSxFQUFBLEtBQUE7QUFGRCxHQUFBLE1BR087QUFDTixPQUFHLENBQUMsRUFBRCxRQUFBLElBQWUsaUJBQWlCLEtBQUEsaUJBQUEsQ0FBQSxNQUFBLEdBQW5DLENBQUEsRUFBc0U7QUFDckUsTUFBQSxjQUFBO0FBQ0EsU0FBQSxpQkFBQSxDQUFBLENBQUEsRUFBQSxLQUFBO0FBQ0E7QUFDRDtBQXhDWSxFQUFBO0FBQUEsY0FBQSxTQUFBLFdBQUEsQ0FBQSxDQUFBLEVBMENBO0FBQ2IsTUFBSSxLQUFBLE1BQUEsSUFBZSxFQUFBLE9BQUEsS0FBbkIsRUFBQSxFQUFxQztBQUNwQyxLQUFBLGNBQUE7QUFDQSxRQUFBLE1BQUE7QUFDQTtBQUNELE1BQUksS0FBQSxNQUFBLElBQWUsRUFBQSxPQUFBLEtBQW5CLENBQUEsRUFBb0MsS0FBQSxPQUFBLENBQUEsQ0FBQTtBQS9DdkIsRUFBQTtBQUFBLE9BQUEsU0FBQSxJQUFBLEdBaURQO0FBQUEsTUFBQSxTQUFBLElBQUE7O0FBQ04sV0FBQSxnQkFBQSxDQUFBLFNBQUEsRUFBcUMsS0FBckMsZ0JBQUE7QUFDQSxPQUFBLFdBQUEsR0FBb0IsU0FBcEIsYUFBQTtBQUNBLE9BQUEsaUJBQUEsQ0FBQSxNQUFBLElBQWlDLE9BQUEsVUFBQSxDQUFrQixZQUFNO0FBQUMsVUFBQSxpQkFBQSxDQUFBLENBQUEsRUFBQSxLQUFBO0FBQXpCLEdBQUEsRUFBakMsQ0FBaUMsQ0FBakM7QUFDQSxPQUFBLE1BQUE7QUFyRGEsRUFBQTtBQUFBLFFBQUEsU0FBQSxLQUFBLEdBdURQO0FBQ04sV0FBQSxtQkFBQSxDQUFBLFNBQUEsRUFBd0MsS0FBeEMsZ0JBQUE7QUFDQSxPQUFBLFdBQUEsQ0FBQSxLQUFBO0FBQ0EsT0FBQSxNQUFBO0FBMURhLEVBQUE7QUFBQSxTQUFBLFNBQUEsTUFBQSxHQTRETjtBQUNQLE9BQUEsTUFBQSxHQUFjLENBQUMsS0FBZixNQUFBO0FBQ0EsT0FBQSxJQUFBLENBQUEsWUFBQSxDQUFBLGFBQUEsRUFBc0MsQ0FBQyxLQUF2QyxNQUFBO0FBQ0EsT0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBLE1BQUEsQ0FBMkIsS0FBQSxRQUFBLENBQTNCLFdBQUE7QUFDQSxXQUFBLGFBQUEsQ0FBdUIsS0FBQSxRQUFBLENBQXZCLFlBQUEsS0FBc0QsU0FBQSxhQUFBLENBQXVCLEtBQUEsUUFBQSxDQUF2QixZQUFBLEVBQUEsWUFBQSxDQUFBLGFBQUEsRUFBK0UsS0FBckksTUFBc0QsQ0FBdEQ7QUFoRWEsRUFBQTtBQUFBLFNBQUEsU0FBQSxNQUFBLEdBa0VMO0FBQ1IsTUFBRyxDQUFDLEtBQUosTUFBQSxFQUFpQixLQUFqQixJQUFpQixHQUFqQixLQUNLLEtBQUEsS0FBQTtBQUNMLFNBQU8sS0FBQSxRQUFBLENBQVAsUUFBQSxLQUFBLFVBQUEsSUFBaUQsS0FBQSxRQUFBLENBQUEsUUFBQSxDQUFBLElBQUEsQ0FBakQsSUFBaUQsQ0FBakQ7QUFDQTtBQXRFYSxDOzs7Ozs7OztrQkNKQTtBQUNYLGlCQURXLFFBQUE7QUFFWCxrQkFGVyxNQUFBO0FBR1gsbUJBSFcsVUFBQTtBQUlYLGNBQVU7QUFKQyxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IE1vZGFsIGZyb20gJy4vbGlicy9jb21wb25lbnQnO1xuXG5jb25zdCBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcyA9IFsoKSA9PiB7XG5cdGxldCBtb2RhbCA9IE1vZGFsLmluaXQoJy5qcy1tb2RhbCcpO1xuXHRjb25zb2xlLmxvZyhtb2RhbCk7XG5cbn1dO1xuICAgIFxuaWYoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7IG9uRE9NQ29udGVudExvYWRlZFRhc2tzLmZvckVhY2goZm4gPT4gZm4oKSk7IH0pO1xuIiwiaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vbGliL2RlZmF1bHRzJztcbmltcG9ydCBjb21wb25lbnRQcm90b3R5cGUgZnJvbSAnLi9saWIvY29tcG9uZW50LXByb3RvdHlwZSc7XG5cbmNvbnN0IGluaXQgPSAoc2VsLCBvcHRzKSA9PiB7XG5cdGxldCBlbHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsKSk7XG5cdFxuXHRpZihlbHMubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ01vZGFsIGNhbm5vdCBiZSBpbml0aWFsaXNlZCwgbm8gdHJpZ2dlciBlbGVtZW50cyBmb3VuZCcpO1xuXHRcblx0cmV0dXJuIGVscy5tYXAoZWwgPT4gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGNvbXBvbmVudFByb3RvdHlwZSksIHtcblx0XHRcdG5vZGU6IGVsLFxuXHRcdFx0c2V0dGluZ3M6IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRzKVxuXHRcdH0pLmluaXQoKSk7XG59O1xuICAgIFxuZXhwb3J0IGRlZmF1bHQgeyBpbml0IH07IiwiY29uc3QgVFJJR0dFUl9FVkVOVFMgPSB3aW5kb3cuUG9pbnRlckV2ZW50ID8gWydwb2ludGVydXAnXSA6IFsnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snLCAna2V5ZG93bicgXSxcbiAgICAgIFRSSUdHRVJfS0VZQ09ERVMgPSBbMTMsIDMyXSxcblx0ICBGT0NVU0FCTEVfRUxFTUVOVFMgPSBbJ2FbaHJlZl0nLCAnYXJlYVtocmVmXScsICdpbnB1dDpub3QoW2Rpc2FibGVkXSknLCAnc2VsZWN0Om5vdChbZGlzYWJsZWRdKScsICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSknLCAnYnV0dG9uOm5vdChbZGlzYWJsZWRdKScsICdpZnJhbWUnLCAnb2JqZWN0JywgJ2VtYmVkJywgJ1tjb250ZW50ZWRpdGFibGVdJywgJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKSddO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGluaXQoKSB7XG5cdFx0dGhpcy5pc09wZW4gPSBmYWxzZTtcblx0XHR0aGlzLnRvZ2dsZXJzID0gdGhpcy5ub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC10b2dnbGVyJykgJiYgW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtdG9nZ2xlcicpKSk7XG5cblx0XHR0aGlzLmJvdW5kS2V5TGlzdGVuZXIgPSB0aGlzLmtleUxpc3RlbmVyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICBcblx0XHRpZighdGhpcy50b2dnbGVycy5sZW5ndGgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignTW9kYWwgY2Fubm90IGJlIGluaXRpYWxpc2VkLCBubyBtb2RhbCB0b2dnbGVyIGVsZW1lbnRzIGZvdW5kJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5pbml0VHJpZ2dlcnMoKTtcblx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuID0gdGhpcy5nZXRGb2N1c2FibGVDaGlsZHJlbigpO1xuXHRcdHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cdGluaXRUcmlnZ2Vycygpe1xuXHRcdHRoaXMudG9nZ2xlcnMuZm9yRWFjaCh0b2dnbGVyID0+IHtcblx0XHRcdFRSSUdHRVJfRVZFTlRTLmZvckVhY2goZXYgPT4ge1xuXHRcdFx0XHR0b2dnbGVyLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGUgPT4ge1xuXHRcdFx0XHRcdGlmKCEhZS5rZXlDb2RlICYmICF+VFJJR0dFUl9LRVlDT0RFUy5pbmRleE9mKGUua2V5Q29kZSkpIHJldHVybjtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5jaGFuZ2UodGhpcyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldEZvY3VzYWJsZUNoaWxkcmVuKCkge1xuXHRcdHJldHVybiBbXS5zbGljZS5jYWxsKHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UUy5qb2luKCcsJykpKTtcblx0fSxcblx0dHJhcFRhYihlKXtcblx0XHRsZXQgZm9jdXNlZEluZGV4ID0gdGhpcy5mb2N1c2FibGVDaGlsZHJlbi5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXHRcdGlmKGUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSAwKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuW3RoaXMuZm9jdXNhYmxlQ2hpbGRyZW4ubGVuZ3RoIC0gMV0uZm9jdXMoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYoIWUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSB0aGlzLmZvY3VzYWJsZUNoaWxkcmVuLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuWzBdLmZvY3VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRrZXlMaXN0ZW5lcihlKXtcblx0XHRpZiAodGhpcy5pc09wZW4gJiYgZS5rZXlDb2RlID09PSAyNykge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy50b2dnbGUoKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuaXNPcGVuICYmIGUua2V5Q29kZSA9PT0gOSkgdGhpcy50cmFwVGFiKGUpO1xuXHR9LFxuXHRvcGVuKCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmJvdW5kS2V5TGlzdGVuZXIpO1xuXHRcdHRoaXMubGFzdEZvY3VzZWQgPSAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuLmxlbmd0aCAmJiB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7dGhpcy5mb2N1c2FibGVDaGlsZHJlblswXS5mb2N1cygpO30sIDApO1xuXHRcdHRoaXMudG9nZ2xlKCk7XG5cdH0sXG5cdGNsb3NlKCl7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRLZXlMaXN0ZW5lcik7XG5cdFx0dGhpcy5sYXN0Rm9jdXNlZC5mb2N1cygpO1xuXHRcdHRoaXMudG9nZ2xlKCk7XG5cdH0sXG5cdHRvZ2dsZSgpe1xuXHRcdHRoaXMuaXNPcGVuID0gIXRoaXMuaXNPcGVuO1xuXHRcdHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgIXRoaXMuaXNPcGVuKTtcblx0XHR0aGlzLm5vZGUuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLnNldHRpbmdzLm9uQ2xhc3NOYW1lKTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3MubWFpblNlbGVjdG9yKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3MubWFpblNlbGVjdG9yKS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdGhpcy5pc09wZW4pO1xuXHR9LFxuXHRjaGFuZ2UoKSB7XG5cdFx0aWYoIXRoaXMuaXNPcGVuKSB0aGlzLm9wZW4oKTtcblx0XHRlbHNlIHRoaXMuY2xvc2UoKTtcblx0XHR0eXBlb2YgdGhpcy5zZXR0aW5ncy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiAgdGhpcy5zZXR0aW5ncy5jYWxsYmFjay5jYWxsKHRoaXMpO1xuXHR9XG59OyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBvbkNsYXNzTmFtZTogJ2FjdGl2ZScsXG4gICAgbWFpblNlbGVjdG9yOiAnbWFpbicsXG4gICAgbW9kYWxTZWxlY3RvcjogJ2pzLW1vZGFsJyxcbiAgICBjYWxsYmFjazogZmFsc2Vcbn07Il19
