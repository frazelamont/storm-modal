#Storm Modal

[![Build Status](https://travis-ci.org/mjbp/storm-modal.svg?branch=master)](https://travis-ci.org/mjbp/storm-modal)
[![codecov.io](http://codecov.io/github/mjbp/storm-modal/coverage.svg?branch=master)](http://codecov.io/github/mjbp/storm-modal?branch=master)
[![npm version](https://badge.fury.io/js/storm-modal.svg)](https://badge.fury.io/js/storm-modal)

Accessible modal dialogue. Allowing multiple instances, and capturing and releasing focus accessibly.

##Example
[https://mjbp.github.io/storm-modal](https://mjbp.github.io/storm-modal)

##Usage
HTML
```
<button class="js-modal-toggler">Open modal</button>
<div class="js-modal modal" data-modal-toggler="js-modal-toggler">
	<div class="modal__close js-modal-close js-modal-toggler">
	</div>
	<div class="modal__inner">
		<button>Focusable element</button>
		<input type="text">
		<input type="text">
		<svg tabindex="0" class="modal__close-btn js-modal-toggler" fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
			<path d="M0 0h24v24H0z" fill="none"/>
		</svg>
	</div>
</div>
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

##Options
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

##Tests
```
npm run test
```

##Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends unpon Object.assign, element.classList, and Promises so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfils for Array functions and eventListeners.

##Dependencies
None

##License
MIT