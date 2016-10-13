#Storm Modal

Accessible modal dialogue. Allowing multiple instances, and capturing and releasing focus accessibly.


##Usage
```
npm install storm-modal
```

```html
<button class="js-modal-toggler">Open</button>
<div class="js-modal modal" data-modal-toggler="js-modal-toggler">
	<div class="js-modal-toggler"></div>
	<div class="modal__inner">
	</div>
</div>

```

```javascript
var modal = require('storm-modal')
modal.init('.js-modal');
```

###Options
onClassName, String, default: 'active',
mainSelector, String, default: 'main',
modalSelector, String, default: 'js-modal'

Defaults:

```javascript
{
	onClassName: 'active',
	modalSelector: 'js-modal'
}
```