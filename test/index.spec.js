import should from 'should';
import 'jsdom-global/register';
import Modal from '../dist/storm-modal.standalone.js';

const html = `<button class="js-modal-toggler">Open modal</button>
				<div id="modal-1" class="js-modal modal" data-modal-toggler="js-modal-toggler">
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
				<button class="js-modal-toggler-2">Open modal</button>
				<div id="modal-2" class="js-modal-2 modal" data-modal-toggler="js-modal-toggler-2">
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
				<div id="modal-3" class="js-modal-3 modal" data-modal-toggler="js-modal-toggler-3"></div>`;

document.body.innerHTML = html;


let ModalItem = Modal.init('.js-modal'),
	ModalItemSetting = Modal.init('.js-modal-2', {
		onClassName: 'test',
		callback: () => {}
	});


describe('Initialisation', () => {
	it('should return an object with the correct properties', () => {
		should(ModalItem)
			.Array()
			.and.have.lengthOf(1);
	});

	it('should throw an error if no elements are found', () => {
		Modal.init.bind(Modal, '.js-err').should.throw();
	});

	it('should throw an error if no togglers are found', () => {
		Modal.init.bind(Modal, '.js-modal-3').should.throw();
	});

	it('each array item should be an object with the correct properties', () => {
		ModalItem[0].should.be.an.instanceOf(Object).and.not.empty();
		ModalItem[0].should.have.property('node');
		ModalItem[0].should.have.property('settings').Object();
		ModalItem[0].should.have.property('init').Function();
	});

	it('should initialisation with different settings if different options are passed', () => {
		should(ModalItemSetting[0].settings.onClassName).not.equal(ModalItem[0].settings.onClassName);
	});

	it('should attach the handleClick eventListener to DOMElement click event to toggle documentElement className', () => {
		ModalItem[0].togglers[0].click();
		setTimeout(() => {
			Array.from(ModalItem[0].node.classList).should.containEql('active');
			ModalItem[0].togglers[0].click();
			setTimeout(() => {
				Array.from(ModalItem[0].node.classList).should.not.containEql('active');
			}, 1000);
		});
	});

	it('should pass an invokable callback as an option', () => {
		ModalItemSetting[0].settings.should.have.property('callback').Function();
	});

	it('should change sibling buttons aria expanded attribute', () => {
		ModalItem[0].togglers[0].click();
		setTimeout(() => {
			ModalItem[0].node.getAttribute('aria-hidden').should.equal(false);
		});
	});

	
});

//To do
//Make some assertions to test
describe('Keyboard interaction', () => {
	
	it('should attach keydown eventListener to each toggler', () => {

		//not a trigger
		ModalItem[0].togglers[0].dispatchEvent(
			new window.KeyboardEvent('keydown', { 
				code : 33,
				keyCode: 33
			})
		);

		//trigger
		ModalItem[0].togglers[0].dispatchEvent(
			new window.KeyboardEvent('keydown', { 
				code : 32,
				keyCode: 32
			})
		);
		
	});

	it('should trap tab when the modal is open', () => {

		ModalItem[0].togglers[0].dispatchEvent(
			new window.KeyboardEvent('keydown', { 
				code : 32,
				keyCode: 32
			})
		);

		let tabDownEvt = new window.KeyboardEvent('keydown', {
			key : 'Tab',
			keyCode: 9
		});
		
		document.dispatchEvent(tabDownEvt);
		
		document.dispatchEvent(tabDownEvt);
		document.dispatchEvent(tabDownEvt);
		document.dispatchEvent(tabDownEvt);
		document.dispatchEvent(tabDownEvt);
		document.dispatchEvent(tabDownEvt);
		document.dispatchEvent(tabDownEvt);
		document.dispatchEvent(tabDownEvt);
		document.dispatchEvent(tabDownEvt);
		document.dispatchEvent(tabDownEvt);

		document.dispatchEvent(
			new window.KeyboardEvent('keydown', { 
				key : 'Tab',
				keyCode: 9,
				shiftKey: true
			})
		);

		document.dispatchEvent(
			new window.KeyboardEvent('keydown', { 
				code : 27,
				keyCode: 27
			})
		);
	});
});