import { getElt } from './utils.js';
import { route } from './route.js';

export const main = getElt('main');
export const header = getElt('header');
export const footer = getElt('footer');

// resizeMain();
route();
// window.addEventListener('resize', () => resizeMain(main));
window.addEventListener('popstate', route);