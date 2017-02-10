import Modal from './libs/storm-modal';

const onDOMContentLoadedTasks = [() => {
	let modal = Modal.init('.js-modal');
	console.log(modal);

}];
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach(fn => fn()); });
