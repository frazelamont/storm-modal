# Storm Modal
[![npm version](https://badge.fury.io/js/storm-modal.svg)](https://badge.fury.io/js/storm-modal)

Accessible modal dialog.

## Example
[https://stormid.github.io/storm-modal](https://stormid.github.io/storm-modal)

## Usage
HTML
```
<button class="js-modal-toggler">Open modal</button>
<div class="js-modal modal" data-modal-toggler="js-modal-toggler">
	<div class="modal__close js-modal-close js-modal-toggler" aria-label="close">
    </div>
    <div class="modal__inner"  role="dialog" aria-modal="true" aria-labelledby="modal-label">
        <h1 id="modal-label">Dialog label</h1>
		<button>Focusable element</button>
		<input type="text">
		<input type="text">
		<svg role="button" aria-label="close" tabindex="0" class="modal__close-btn js-modal-toggler" fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
			<path d="M0 0h24v24H0z" fill="none"/>
		</svg>
	</div>
</div>
```

CSS
```
.modal {
    position: absolute;
    overflow: hidden;
    width:	0;
    height:0;
    background-color: rgba(0,0,0,.9);
    top:0;
    left:0;
    opacity:0;
    visibility:hidden;
}
.modal.active {
    opacity:1;
    visibility: visible;
    overflow: auto;
    position: fixed;
    width: auto;
    height: auto;
    bottom: 0;
    right: 0;
    z-index: 9;
}
```

JS
```
npm i -S storm-modal
```
either using es6 import
```
import Modal from 'storm-modal';

Modal.init('.js-modal');
```
aynchronous browser loading (use the .standalone version in the /dist folder)
```
import Load from 'storm-load';

Load('/content/js/async/storm-modal.standalone.js')
    .then(() => {
        StormModal.init('.js-modal');
    });
```

## Options
```
{
	onClassName:'active',
	mainSelector: 'main',
	modalSelector: 'js-modal',
	callback: false
}
```

e.g.
```
StormModal.init('.js-modal', {
    callback(){
        console.log(this);
    }
});
```

## Tests
```
npm run test
```

## Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends upon Object.assign so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfils for Array functions and eventListeners.

## Dependencies
None

## License
MIT
