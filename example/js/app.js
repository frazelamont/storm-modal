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
    TRIGGER_KEYCODES = [13, 32];

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
		var focusableElements = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'];

		return [].slice.call(this.node.querySelectorAll(focusableElements.join(',')));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb21wb25lbnQtcHJvdG90eXBlLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFNLDJCQUEyQixZQUFNLEFBQ3RDO0tBQUksUUFBUSxvQkFBQSxBQUFNLEtBQWxCLEFBQVksQUFBVyxBQUN2QjtTQUFBLEFBQVEsSUFBUixBQUFZLEFBRVo7QUFKRCxBQUFnQyxDQUFBOztBQU1oQyxJQUFHLHNCQUFILEFBQXlCLGVBQVEsQUFBTyxpQkFBUCxBQUF3QixvQkFBb0IsWUFBTSxBQUFFO3lCQUFBLEFBQXdCLFFBQVEsY0FBQTtTQUFBLEFBQU07QUFBdEMsQUFBOEM7QUFBbEcsQ0FBQTs7Ozs7Ozs7O0FDUmpDOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxPQUFPLFNBQVAsQUFBTyxLQUFBLEFBQUMsS0FBRCxBQUFNLE1BQVMsQUFDM0I7S0FBSSxNQUFNLEdBQUEsQUFBRyxNQUFILEFBQVMsS0FBSyxTQUFBLEFBQVMsaUJBQWpDLEFBQVUsQUFBYyxBQUEwQixBQUVsRDs7S0FBRyxJQUFBLEFBQUksV0FBUCxBQUFrQixHQUFHLE1BQU0sSUFBQSxBQUFJLE1BQVYsQUFBTSxBQUFVLEFBRXJDOztZQUFPLEFBQUksSUFBSSxjQUFNLEFBQ3BCO2dCQUFPLEFBQU8sT0FBTyxPQUFBLEFBQU8sNEJBQXJCO1NBQWlELEFBQ2pELEFBQ047YUFBVSxPQUFBLEFBQU8sT0FBUCxBQUFjLHdCQUZsQixBQUFpRCxBQUU3QyxBQUE0QjtBQUZpQixBQUN2RCxHQURNLEVBQVAsQUFBTyxBQUdKLEFBQ0g7QUFMRCxBQUFPLEFB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QUEzRWE7QUFBQSxBQUNkOzs7Ozs7Ozs7aUJDSmMsQUFDRSxBQUNiO2tCQUZXLEFBRUcsQUFDZDttQkFIVyxBQUdJLEFBQ2Y7YyxBQUpXLEFBSUQ7QUFKQyxBQUNYIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBNb2RhbCBmcm9tICcuL2xpYnMvY29tcG9uZW50JztcblxuY29uc3Qgb25ET01Db250ZW50TG9hZGVkVGFza3MgPSBbKCkgPT4ge1xuXHRsZXQgbW9kYWwgPSBNb2RhbC5pbml0KCcuanMtbW9kYWwnKTtcblx0Y29uc29sZS5sb2cobW9kYWwpO1xuXG59XTtcbiAgICBcbmlmKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4geyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKGZuID0+IGZuKCkpOyB9KTtcbiIsImltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2xpYi9kZWZhdWx0cyc7XG5pbXBvcnQgY29tcG9uZW50UHJvdG90eXBlIGZyb20gJy4vbGliL2NvbXBvbmVudC1wcm90b3R5cGUnO1xuXG5jb25zdCBpbml0ID0gKHNlbCwgb3B0cykgPT4ge1xuXHRsZXQgZWxzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbCkpO1xuXHRcblx0aWYoZWxzLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKCdNb2RhbCBjYW5ub3QgYmUgaW5pdGlhbGlzZWQsIG5vIHRyaWdnZXIgZWxlbWVudHMgZm91bmQnKTtcblx0XG5cdHJldHVybiBlbHMubWFwKGVsID0+IHtcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGNvbXBvbmVudFByb3RvdHlwZSksIHtcblx0XHRcdG5vZGU6IGVsLFxuXHRcdFx0c2V0dGluZ3M6IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRzKVxuXHRcdH0pLmluaXQoKTtcblx0fSk7XG59O1xuICAgIFxuZXhwb3J0IGRlZmF1bHQgeyBpbml0IH07IiwiY29uc3QgVFJJR0dFUl9FVkVOVFMgPSBbd2luZG93LlBvaW50ZXJFdmVudCA/ICdwb2ludGVyZG93bicgOiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snLCAna2V5ZG93bicgXSxcbiAgICAgIFRSSUdHRVJfS0VZQ09ERVMgPSBbMTMsIDMyXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRpbml0KCkge1xuXHRcdHRoaXMuaXNPcGVuID0gZmFsc2U7XG5cdFx0dGhpcy50b2dnbGVycyA9IHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtdG9nZ2xlcicpICYmIFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW1vZGFsLXRvZ2dsZXInKSkpO1xuICAgICAgICAgICAgXG5cdFx0aWYoIXRoaXMudG9nZ2xlcnMubGVuZ3RoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZGFsIGNhbm5vdCBiZSBpbml0aWFsaXNlZCwgbm8gbW9kYWwgdG9nZ2xlciBlbGVtZW50cyBmb3VuZCcpO1xuXHRcdH1cblxuXHRcdHRoaXMuaW5pdFRyaWdnZXJzKCk7XG5cdFx0dGhpcy5mb2N1c2FibGVDaGlsZHJlbiA9IHRoaXMuZ2V0Rm9jdXNhYmxlQ2hpbGRyZW4oKTtcblx0XHR0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXHRpbml0VHJpZ2dlcnMoKXtcblx0XHR0aGlzLnRvZ2dsZXJzLmZvckVhY2godG9nZ2xlciA9PiB7XG5cdFx0XHRUUklHR0VSX0VWRU5UUy5mb3JFYWNoKGV2ID0+IHtcblx0XHRcdFx0dG9nZ2xlci5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcblx0XHRcdFx0XHRpZighIWUua2V5Q29kZSAmJiAhflRSSUdHRVJfS0VZQ09ERVMuaW5kZXhPZihlLmtleUNvZGUpKSByZXR1cm47XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHRoaXMuY2hhbmdlKHRoaXMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRGb2N1c2FibGVDaGlsZHJlbigpIHtcblx0XHRjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IFsnYVtocmVmXScsICdhcmVhW2hyZWZdJywgJ2lucHV0Om5vdChbZGlzYWJsZWRdKScsICdzZWxlY3Q6bm90KFtkaXNhYmxlZF0pJywgJ3RleHRhcmVhOm5vdChbZGlzYWJsZWRdKScsICdidXR0b246bm90KFtkaXNhYmxlZF0pJywgJ2lmcmFtZScsICdvYmplY3QnLCAnZW1iZWQnLCAnW2NvbnRlbnRlZGl0YWJsZV0nLCAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJ107XG5cblx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbCh0aGlzLm5vZGUucXVlcnlTZWxlY3RvckFsbChmb2N1c2FibGVFbGVtZW50cy5qb2luKCcsJykpKTtcblx0fSxcblx0dHJhcFRhYihlKXtcblx0XHRsZXQgZm9jdXNlZEluZGV4ID0gdGhpcy5mb2N1c2FibGVDaGlsZHJlbi5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXHRcdGlmKGUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSAwKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuW3RoaXMuZm9jdXNhYmxlQ2hpbGRyZW4ubGVuZ3RoIC0gMV0uZm9jdXMoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYoIWUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSB0aGlzLmZvY3VzYWJsZUNoaWxkcmVuLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuWzBdLmZvY3VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRrZXlMaXN0ZW5lcihlKXtcblx0XHRpZiAodGhpcy5pc09wZW4gJiYgZS5rZXlDb2RlID09PSAyNykge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy50b2dnbGUoKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuaXNPcGVuICYmIGUua2V5Q29kZSA9PT0gOSkge1xuXHRcdFx0dGhpcy50cmFwVGFiKGUpO1xuXHRcdH1cblx0fSxcblx0b3BlbigpIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlMaXN0ZW5lci5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmxhc3RGb2N1c2VkID0gIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdFx0dGhpcy5mb2N1c2FibGVDaGlsZHJlbi5sZW5ndGggJiYgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge3RoaXMuZm9jdXNhYmxlQ2hpbGRyZW5bMF0uZm9jdXMoKTt9LCAwKTtcblx0XHR0aGlzLnRvZ2dsZSgpO1xuXHR9LFxuXHRjbG9zZSgpe1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmtleUxpc3RlbmVyLmJpbmQodGhpcykpO1xuXHRcdHRoaXMubGFzdEZvY3VzZWQuZm9jdXMoKTtcblx0XHR0aGlzLnRvZ2dsZSgpO1xuXHR9LFxuXHR0b2dnbGUoKXtcblx0XHR0aGlzLmlzT3BlbiA9ICF0aGlzLmlzT3Blbjtcblx0XHR0aGlzLm5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICF0aGlzLmlzT3Blbik7XG5cdFx0dGhpcy5ub2RlLmNsYXNzTGlzdC50b2dnbGUodGhpcy5zZXR0aW5ncy5vbkNsYXNzTmFtZSk7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzLm1haW5TZWxlY3RvcikgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzLm1haW5TZWxlY3Rvcikuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRoaXMuaXNPcGVuKTtcblx0fSxcblx0Y2hhbmdlKCkge1xuXHRcdGlmKCF0aGlzLmlzT3Blbil7XG5cdFx0XHR0aGlzLm9wZW4oKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdH1cblx0XHR0eXBlb2YgdGhpcy5zZXR0aW5ncy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiAgdGhpcy5zZXR0aW5ncy5jYWxsYmFjay5jYWxsKHRoaXMpO1xuXHR9XG59OyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBvbkNsYXNzTmFtZTogJ2FjdGl2ZScsXG4gICAgbWFpblNlbGVjdG9yOiAnbWFpbicsXG4gICAgbW9kYWxTZWxlY3RvcjogJ2pzLW1vZGFsJyxcbiAgICBjYWxsYmFjazogZmFsc2Vcbn07Il19
