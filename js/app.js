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
var TRIGGER_EVENTS = ['ontouchstart' in window ? 'touchstart' : 'click', 'keydown'],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb21wb25lbnQtcHJvdG90eXBlLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL2RlZmF1bHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFNLDJCQUEyQixZQUFNLEFBQ3RDO0tBQUksUUFBUSxvQkFBQSxBQUFNLEtBQWxCLEFBQVksQUFBVyxBQUN2QjtTQUFBLEFBQVEsSUFBUixBQUFZLEFBRVo7QUFKRCxBQUFnQyxDQUFBOztBQU1oQyxJQUFHLHNCQUFILEFBQXlCLGVBQVEsQUFBTyxpQkFBUCxBQUF3QixvQkFBb0IsWUFBTSxBQUFFO3lCQUFBLEFBQXdCLFFBQVEsY0FBQTtTQUFBLEFBQU07QUFBdEMsQUFBOEM7QUFBbEcsQ0FBQTs7Ozs7Ozs7O0FDUmpDOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxPQUFPLFNBQVAsQUFBTyxLQUFBLEFBQUMsS0FBRCxBQUFNLE1BQVMsQUFDM0I7S0FBSSxNQUFNLEdBQUEsQUFBRyxNQUFILEFBQVMsS0FBSyxTQUFBLEFBQVMsaUJBQWpDLEFBQVUsQUFBYyxBQUEwQixBQUVsRDs7S0FBRyxJQUFBLEFBQUksV0FBUCxBQUFrQixHQUFHLE1BQU0sSUFBQSxBQUFJLE1BQVYsQUFBTSxBQUFVLEFBRXJDOztZQUFPLEFBQUksSUFBSSxjQUFBO2dCQUFNLEFBQU8sT0FBTyxPQUFBLEFBQU8sNEJBQXJCO1NBQWlELEFBQzlELEFBQ047YUFBVSxPQUFBLEFBQU8sT0FBUCxBQUFjLHdCQUZMLEFBQWlELEFBRTFELEFBQTRCO0FBRjhCLEFBQ3BFLEdBRG1CLEVBQU4sQUFBTSxBQUdqQjtBQUhKLEFBQU8sQUFJUCxFQUpPO0FBTFI7O2tCQVdlLEVBQUUsTSxBQUFGOzs7Ozs7OztBQ2RmLElBQU0saUJBQWlCLENBQUMsa0JBQUEsQUFBa0IsU0FBbEIsQUFBMkIsZUFBNUIsQUFBMkMsU0FBbEUsQUFBdUIsQUFBb0Q7SUFDckUsbUJBQW1CLENBQUEsQUFBQyxJQUQxQixBQUN5QixBQUFLO0lBQzNCLHFCQUFxQixDQUFBLEFBQUMsV0FBRCxBQUFZLGNBQVosQUFBMEIseUJBQTFCLEFBQW1ELDBCQUFuRCxBQUE2RSw0QkFBN0UsQUFBeUcsMEJBQXpHLEFBQW1JLFVBQW5JLEFBQTZJLFVBQTdJLEFBQXVKLFNBQXZKLEFBQWdLLHFCQUZ4TCxBQUV3QixBQUFxTDs7O0FBSTlMLHVCQUNQLEFBQ047T0FBQSxBQUFLLFNBQUwsQUFBYyxBQUNkO09BQUEsQUFBSyxXQUFXLEtBQUEsQUFBSyxLQUFMLEFBQVUsYUFBVixBQUF1Qix5QkFBeUIsR0FBQSxBQUFHLE1BQUgsQUFBUyxLQUFLLFNBQUEsQUFBUyxpQkFBaUIsTUFBTSxLQUFBLEFBQUssS0FBTCxBQUFVLGFBQXhILEFBQWdFLEFBQWMsQUFBZ0MsQUFBdUIsQUFFckk7O09BQUEsQUFBSyxtQkFBbUIsS0FBQSxBQUFLLFlBQUwsQUFBaUIsS0FBekMsQUFBd0IsQUFBc0IsQUFFOUM7O01BQUcsQ0FBQyxLQUFBLEFBQUssU0FBVCxBQUFrQixRQUFRLEFBQ3pCO1NBQU0sSUFBQSxBQUFJLE1BQVYsQUFBTSxBQUFVLEFBQ2hCO0FBRUQ7O09BQUEsQUFBSyxBQUNMO09BQUEsQUFBSyxvQkFBb0IsS0FBekIsQUFBeUIsQUFBSyxBQUM5QjtPQUFBLEFBQUssS0FBTCxBQUFVLGFBQVYsQUFBdUIsZUFBdkIsQUFBc0MsQUFDdEM7U0FBQSxBQUFPLEFBQ1A7QUFmYSxBQWdCZDtBQWhCYyx1Q0FnQkE7Y0FDYjs7T0FBQSxBQUFLLFNBQUwsQUFBYyxRQUFRLG1CQUFXLEFBQ2hDO2tCQUFBLEFBQWUsUUFBUSxjQUFNLEFBQzVCO1lBQUEsQUFBUSxpQkFBUixBQUF5QixJQUFJLGFBQUssQUFDakM7U0FBRyxDQUFDLENBQUMsRUFBRixBQUFJLFdBQVcsQ0FBQyxDQUFDLGlCQUFBLEFBQWlCLFFBQVEsRUFBN0MsQUFBb0IsQUFBMkIsVUFBVSxBQUN6RDtPQUFBLEFBQUUsQUFDRjtXQUFBLEFBQUssT0FDTDtBQUpELEFBS0E7QUFORCxBQU9BO0FBUkQsQUFTQTtBQTFCYSxBQTJCZDtBQTNCYyx1REEyQlMsQUFDdEI7U0FBTyxHQUFBLEFBQUcsTUFBSCxBQUFTLEtBQUssS0FBQSxBQUFLLEtBQUwsQUFBVSxpQkFBaUIsbUJBQUEsQUFBbUIsS0FBbkUsQUFBTyxBQUFjLEFBQTJCLEFBQXdCLEFBQ3hFO0FBN0JhLEFBOEJkO0FBOUJjLDJCQUFBLEFBOEJOLEdBQUUsQUFDVDtNQUFJLGVBQWUsS0FBQSxBQUFLLGtCQUFMLEFBQXVCLFFBQVEsU0FBbEQsQUFBbUIsQUFBd0MsQUFDM0Q7TUFBRyxFQUFBLEFBQUUsWUFBWSxpQkFBakIsQUFBa0MsR0FBRyxBQUNwQztLQUFBLEFBQUUsQUFDRjtRQUFBLEFBQUssa0JBQWtCLEtBQUEsQUFBSyxrQkFBTCxBQUF1QixTQUE5QyxBQUF1RCxHQUF2RCxBQUEwRCxBQUMxRDtBQUhELFNBR08sQUFDTjtPQUFHLENBQUMsRUFBRCxBQUFHLFlBQVksaUJBQWlCLEtBQUEsQUFBSyxrQkFBTCxBQUF1QixTQUExRCxBQUFtRSxHQUFHLEFBQ3JFO01BQUEsQUFBRSxBQUNGO1NBQUEsQUFBSyxrQkFBTCxBQUF1QixHQUF2QixBQUEwQixBQUMxQjtBQUNEO0FBQ0Q7QUF6Q2EsQUEwQ2Q7QUExQ2MsbUNBQUEsQUEwQ0YsR0FBRSxBQUNiO01BQUksS0FBQSxBQUFLLFVBQVUsRUFBQSxBQUFFLFlBQXJCLEFBQWlDLElBQUksQUFDcEM7S0FBQSxBQUFFLEFBQ0Y7UUFBQSxBQUFLLEFBQ0w7QUFDRDtNQUFJLEtBQUEsQUFBSyxVQUFVLEVBQUEsQUFBRSxZQUFyQixBQUFpQyxHQUFHLEtBQUEsQUFBSyxRQUFMLEFBQWEsQUFDakQ7QUFoRGEsQUFpRGQ7QUFqRGMsdUJBaURQO2VBQ047O1dBQUEsQUFBUyxpQkFBVCxBQUEwQixXQUFXLEtBQXJDLEFBQTBDLEFBQzFDO09BQUEsQUFBSyxjQUFlLFNBQXBCLEFBQTZCLEFBQzdCO09BQUEsQUFBSyxrQkFBTCxBQUF1QixpQkFBVSxBQUFPLFdBQVcsWUFBTSxBQUFDO1VBQUEsQUFBSyxrQkFBTCxBQUF1QixHQUF2QixBQUEwQixBQUFTO0FBQTVELEdBQUEsRUFBakMsQUFBaUMsQUFBOEQsQUFDL0Y7T0FBQSxBQUFLLEFBQ0w7QUF0RGEsQUF1RGQ7QUF2RGMseUJBdURQLEFBQ047V0FBQSxBQUFTLG9CQUFULEFBQTZCLFdBQVcsS0FBeEMsQUFBNkMsQUFDN0M7T0FBQSxBQUFLLFlBQUwsQUFBaUIsQUFDakI7T0FBQSxBQUFLLEFBQ0w7QUEzRGEsQUE0RGQ7QUE1RGMsMkJBNEROLEFBQ1A7T0FBQSxBQUFLLFNBQVMsQ0FBQyxLQUFmLEFBQW9CLEFBQ3BCO09BQUEsQUFBSyxLQUFMLEFBQVUsYUFBVixBQUF1QixlQUFlLENBQUMsS0FBdkMsQUFBNEMsQUFDNUM7T0FBQSxBQUFLLEtBQUwsQUFBVSxVQUFWLEFBQW9CLE9BQU8sS0FBQSxBQUFLLFNBQWhDLEFBQXlDLEFBQ3pDO1dBQUEsQUFBUyxjQUFjLEtBQUEsQUFBSyxTQUE1QixBQUFxQyxpQkFBaUIsU0FBQSxBQUFTLGNBQWMsS0FBQSxBQUFLLFNBQTVCLEFBQXFDLGNBQXJDLEFBQW1ELGFBQW5ELEFBQWdFLGVBQWUsS0FBckksQUFBc0QsQUFBb0YsQUFDMUk7QUFqRWEsQUFrRWQ7QUFsRWMsMkJBa0VMLEFBQ1I7TUFBRyxDQUFDLEtBQUosQUFBUyxRQUFRLEtBQWpCLEFBQWlCLEFBQUssWUFDakIsS0FBQSxBQUFLLEFBQ1Y7U0FBTyxLQUFBLEFBQUssU0FBWixBQUFxQixhQUFyQixBQUFrQyxjQUFlLEtBQUEsQUFBSyxTQUFMLEFBQWMsU0FBZCxBQUF1QixLQUF4RSxBQUFpRCxBQUE0QixBQUM3RTtBLEFBdEVhO0FBQUEsQUFDZDs7Ozs7Ozs7O2lCQ1BjLEFBQ0UsQUFDYjtrQkFGVyxBQUVHLEFBQ2Q7bUJBSFcsQUFHSSxBQUNmO2MsQUFKVyxBQUlEO0FBSkMsQUFDWCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiaW1wb3J0IE1vZGFsIGZyb20gJy4vbGlicy9jb21wb25lbnQnO1xuXG5jb25zdCBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcyA9IFsoKSA9PiB7XG5cdGxldCBtb2RhbCA9IE1vZGFsLmluaXQoJy5qcy1tb2RhbCcpO1xuXHRjb25zb2xlLmxvZyhtb2RhbCk7XG5cbn1dO1xuICAgIFxuaWYoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7IG9uRE9NQ29udGVudExvYWRlZFRhc2tzLmZvckVhY2goZm4gPT4gZm4oKSk7IH0pO1xuIiwiaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vbGliL2RlZmF1bHRzJztcbmltcG9ydCBjb21wb25lbnRQcm90b3R5cGUgZnJvbSAnLi9saWIvY29tcG9uZW50LXByb3RvdHlwZSc7XG5cbmNvbnN0IGluaXQgPSAoc2VsLCBvcHRzKSA9PiB7XG5cdGxldCBlbHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsKSk7XG5cdFxuXHRpZihlbHMubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoJ01vZGFsIGNhbm5vdCBiZSBpbml0aWFsaXNlZCwgbm8gdHJpZ2dlciBlbGVtZW50cyBmb3VuZCcpO1xuXHRcblx0cmV0dXJuIGVscy5tYXAoZWwgPT4gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGNvbXBvbmVudFByb3RvdHlwZSksIHtcblx0XHRcdG5vZGU6IGVsLFxuXHRcdFx0c2V0dGluZ3M6IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRzKVxuXHRcdH0pLmluaXQoKSk7XG59O1xuICAgIFxuZXhwb3J0IGRlZmF1bHQgeyBpbml0IH07IiwiY29uc3QgVFJJR0dFUl9FVkVOVFMgPSBbJ29udG91Y2hzdGFydCcgaW4gd2luZG93ID8gJ3RvdWNoc3RhcnQnIDogJ2NsaWNrJywgJ2tleWRvd24nIF0sXG4gICAgICBUUklHR0VSX0tFWUNPREVTID0gWzEzLCAzMl0sXG5cdCAgRk9DVVNBQkxFX0VMRU1FTlRTID0gWydhW2hyZWZdJywgJ2FyZWFbaHJlZl0nLCAnaW5wdXQ6bm90KFtkaXNhYmxlZF0pJywgJ3NlbGVjdDpub3QoW2Rpc2FibGVkXSknLCAndGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pJywgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSknLCAnaWZyYW1lJywgJ29iamVjdCcsICdlbWJlZCcsICdbY29udGVudGVkaXRhYmxlXScsICdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknXTtcblxuXHRcdFxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGluaXQoKSB7XG5cdFx0dGhpcy5pc09wZW4gPSBmYWxzZTtcblx0XHR0aGlzLnRvZ2dsZXJzID0gdGhpcy5ub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1tb2RhbC10b2dnbGVyJykgJiYgW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbW9kYWwtdG9nZ2xlcicpKSk7XG5cblx0XHR0aGlzLmJvdW5kS2V5TGlzdGVuZXIgPSB0aGlzLmtleUxpc3RlbmVyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICBcblx0XHRpZighdGhpcy50b2dnbGVycy5sZW5ndGgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignTW9kYWwgY2Fubm90IGJlIGluaXRpYWxpc2VkLCBubyBtb2RhbCB0b2dnbGVyIGVsZW1lbnRzIGZvdW5kJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5pbml0VHJpZ2dlcnMoKTtcblx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuID0gdGhpcy5nZXRGb2N1c2FibGVDaGlsZHJlbigpO1xuXHRcdHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cdGluaXRUcmlnZ2Vycygpe1xuXHRcdHRoaXMudG9nZ2xlcnMuZm9yRWFjaCh0b2dnbGVyID0+IHtcblx0XHRcdFRSSUdHRVJfRVZFTlRTLmZvckVhY2goZXYgPT4ge1xuXHRcdFx0XHR0b2dnbGVyLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGUgPT4ge1xuXHRcdFx0XHRcdGlmKCEhZS5rZXlDb2RlICYmICF+VFJJR0dFUl9LRVlDT0RFUy5pbmRleE9mKGUua2V5Q29kZSkpIHJldHVybjtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5jaGFuZ2UodGhpcyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldEZvY3VzYWJsZUNoaWxkcmVuKCkge1xuXHRcdHJldHVybiBbXS5zbGljZS5jYWxsKHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UUy5qb2luKCcsJykpKTtcblx0fSxcblx0dHJhcFRhYihlKXtcblx0XHRsZXQgZm9jdXNlZEluZGV4ID0gdGhpcy5mb2N1c2FibGVDaGlsZHJlbi5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXHRcdGlmKGUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSAwKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuW3RoaXMuZm9jdXNhYmxlQ2hpbGRyZW4ubGVuZ3RoIC0gMV0uZm9jdXMoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYoIWUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSB0aGlzLmZvY3VzYWJsZUNoaWxkcmVuLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuWzBdLmZvY3VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRrZXlMaXN0ZW5lcihlKXtcblx0XHRpZiAodGhpcy5pc09wZW4gJiYgZS5rZXlDb2RlID09PSAyNykge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy50b2dnbGUoKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuaXNPcGVuICYmIGUua2V5Q29kZSA9PT0gOSkgdGhpcy50cmFwVGFiKGUpO1xuXHR9LFxuXHRvcGVuKCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmJvdW5kS2V5TGlzdGVuZXIpO1xuXHRcdHRoaXMubGFzdEZvY3VzZWQgPSAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0XHR0aGlzLmZvY3VzYWJsZUNoaWxkcmVuLmxlbmd0aCAmJiB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7dGhpcy5mb2N1c2FibGVDaGlsZHJlblswXS5mb2N1cygpO30sIDApO1xuXHRcdHRoaXMudG9nZ2xlKCk7XG5cdH0sXG5cdGNsb3NlKCl7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYm91bmRLZXlMaXN0ZW5lcik7XG5cdFx0dGhpcy5sYXN0Rm9jdXNlZC5mb2N1cygpO1xuXHRcdHRoaXMudG9nZ2xlKCk7XG5cdH0sXG5cdHRvZ2dsZSgpe1xuXHRcdHRoaXMuaXNPcGVuID0gIXRoaXMuaXNPcGVuO1xuXHRcdHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgIXRoaXMuaXNPcGVuKTtcblx0XHR0aGlzLm5vZGUuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLnNldHRpbmdzLm9uQ2xhc3NOYW1lKTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3MubWFpblNlbGVjdG9yKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3MubWFpblNlbGVjdG9yKS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdGhpcy5pc09wZW4pO1xuXHR9LFxuXHRjaGFuZ2UoKSB7XG5cdFx0aWYoIXRoaXMuaXNPcGVuKSB0aGlzLm9wZW4oKTtcblx0XHRlbHNlIHRoaXMuY2xvc2UoKTtcblx0XHR0eXBlb2YgdGhpcy5zZXR0aW5ncy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiAgdGhpcy5zZXR0aW5ncy5jYWxsYmFjay5jYWxsKHRoaXMpO1xuXHR9XG59OyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBvbkNsYXNzTmFtZTogJ2FjdGl2ZScsXG4gICAgbWFpblNlbGVjdG9yOiAnbWFpbicsXG4gICAgbW9kYWxTZWxlY3RvcjogJ2pzLW1vZGFsJyxcbiAgICBjYWxsYmFjazogZmFsc2Vcbn07Il19
