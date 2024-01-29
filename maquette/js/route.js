import { home } from './home.js';
import { connexion } from './connexion.js';
import { pong3D } from './pong.js';
import { form } from './test_form.js';


export function route()
{
    const pathname = window.location.pathname;

	console.log(pathname);
    if (pathname === '/')
        connexion();
    else if (pathname === '/connexion/')
        connexion();
    else if (pathname === '/home/')
        home();
    else if (pathname === '/pong/')
        pong3D();
    else if (pathname === '/form/')
        form();
    else
        home();
}
