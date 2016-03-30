#Storm Modal

Accessible modal dialogue. Allowing multiple instances, and capturing and releasing focus accessibly.


##Usage
```
npm install storm-modal
```

```html
<button class="js-modal-toggler">Open</button>
<div class="js-modal modal" data-modal-toggler="js-modal-toggler">
	<div class="js-modal-close js-modal-toggler"></div>
	<div class="modal__inner">
	</div>
</div>

```

```javascript
var modal = require('storm-modal')
modal.init('js-modal');
```

###Options
onClassName, String, default: 'active',
modalSelector, String, default: 'js-modal',
styles: Array of objects, index 0 the off state, index 1 the on state

Defaults:

```javascript
{
	onClassName: 'active',
	modalSelector: 'js-modal',
	styles: [
		{
			opacity: 0,
			visibility: 'hidden',
			position: 'absolute',
			overflow: 'hidden',
			width:	0,
			height:0
		},
		{
			opacity:1,
			visibility: 'visible',
			overflow: 'auto',
			position: 'fixed',
			width: 'auto',
			height: 'auto',
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			zIndex: 9
		}]
}
```