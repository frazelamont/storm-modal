/**
 * @name storm-modal: Accessible modal dialogue
 * @version 1.0.1: Fri, 05 May 2017 11:21:52 GMT
 * @author stormid
 * @license MIT
 */
import defaults from './lib/defaults';
import componentPrototype from './lib/component-prototype';

const init = (sel, opts) => {
	let els = [].slice.call(document.querySelectorAll(sel));
	
	if(els.length === 0) throw new Error('Modal cannot be initialised, no trigger elements found');
	
	return els.map(el => {
		return Object.assign(Object.create(componentPrototype), {
			node: el,
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};
    
export default { init };