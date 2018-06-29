/**
 * @name storm-modal: Accessible modal dialogue
 * @version 1.1.6: Fri, 29 Jun 2018 12:59:36 GMT
 * @author stormid
 * @license MIT
 */
import defaults from './lib/defaults';
import componentPrototype from './lib/component-prototype';

const init = (sel, opts) => {
	let els = [].slice.call(document.querySelectorAll(sel));
	
	if(els.length === 0) throw new Error('Modal cannot be initialised, no trigger elements found');
	
	return els.map(el => Object.assign(Object.create(componentPrototype), {
			node: el,
			settings: Object.assign({}, defaults, opts)
		}).init());
};
    
export default { init };