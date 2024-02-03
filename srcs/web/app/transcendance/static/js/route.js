import { home } from './home.js';
import { login } from './login.js';
import { signin } from './signin.js';
import { games } from './games.js';
import { pong3D } from './pong.js';
import { form } from './test_form.js';


export function route()
{
    const pathname = window.location.pathname;

	console.log(pathname);
    if (pathname === '/')
        login();
    else if (pathname === '/login/')
        login();
    else if (pathname === '/signin/')
        signin();
    else if (pathname === '/games/')
        games();
    else if (pathname === '/pong/')
        pong3D();
    else if (pathname === '/form/')
        form();
    else
        home();
}
