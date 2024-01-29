import { main, header, footer } from './app.js';

export function login()
{
	/* HEADER */
	const nav = document.createElement('nav');
	nav.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light');

	const containerNav = document.createElement('div');
	containerNav.classList.add('container');

	const titleNav = document.createElement('a');
	titleNav.classList.add('navbar-brand');
	titleNav.href = '/';
	titleNav.textContent = 'Transcendance';

	const profileHeader = document.createElement('div');
	profileHeader.classList.add('profile-header');

	const iconProfile = document.createElement('img');
	iconProfile.src = '/static/img/default_avatar.jpg';
	iconProfile.style.width = '30px';
	iconProfile.style.height = '30px';
	iconProfile.style.borderRadius = '50%';
	iconProfile.style.display = 'inline-block';

	const loginHeader = document.createElement('p');
	loginHeader.textContent = 'Username';
	loginHeader.style.marginRight = '5px';
	loginHeader.style.display = 'inline-block';

	profileHeader.appendChild(loginHeader);
	profileHeader.appendChild(iconProfile);
	containerNav.appendChild(titleNav);
	containerNav.appendChild(profileHeader);
	nav.appendChild(containerNav);
	header.appendChild(nav);

	/* MAIN */
	const formContainer = document.createElement('div');
	formContainer.classList.add('Form');
	formContainer.id = 'login';

	const form = document.createElement('form');

	const title = document.createElement('h1');
	title.textContent = 'Log In';

	const logo = document.createElement('img');
	logo.src = '/static/img/42_Logo.png';
	logo.style.width = '100px';
	logo.style.display = 'block';
	logo.style.marginLeft = 'auto';
	logo.style.marginRight = 'auto';

	const emailLabel = document.createElement('label');
	emailLabel.classList.add('form-label');
	emailLabel.setAttribute('for', 'emailInput');
	emailLabel.textContent = 'Email address';

	const emailInput = document.createElement('input');
	emailInput.classList.add('form-control');
	emailInput.type = 'email';
	emailInput.id = 'emailInput';

	const passwordLabel = document.createElement('label');
	passwordLabel.classList.add('form-label');
	passwordLabel.setAttribute('for', 'passwordInput');
	passwordLabel.textContent = 'Password';

	const passwordInput = document.createElement('input');
	passwordInput.classList.add('form-control');
	passwordInput.type = 'password';
	passwordInput.id = 'passwordInput';

	const btnLogIn = document.createElement('button');
	btnLogIn.classList.add('btn', 'btn-success', 'btn-margin');
	btnLogIn.type = 'submit';
	btnLogIn.style.marginTop = '10px';
	btnLogIn.style.marginLeft = 'auto';
	btnLogIn.style.marginRight = '5px';
	btnLogIn.textContent = 'Log In';

	const btnSignIn = document.createElement('button');
	btnSignIn.classList.add('btn', 'btn-primary', 'btn-margin');
	btnSignIn.type = 'submit';
	btnSignIn.style.marginTop = '10px';
	btnSignIn.style.marginLeft = '5px';
	btnSignIn.style.marginRight = 'auto';
	btnSignIn.textContent = 'Sign In';

	btnSignIn.addEventListener('click', function(event) {
		event.preventDefault();
		window.location.href = '/signin/';
	});

	const btnContainer = document.createElement('div');
	btnContainer.style.marginLeft = 'auto';
	btnContainer.style.marginRight = 'auto';
	btnContainer.style.display = 'flex';
	btnContainer.style.justifyContent = 'center';
	btnContainer.appendChild(btnLogIn);
	btnContainer.appendChild(btnSignIn);

	const btn42 = document.createElement('button');
	btn42.classList.add('btn', 'btn-secondary', 'btn-margin');
	btn42.type = 'submit';
	btn42.style.marginTop = '10px';
	btn42.style.marginLeft = 'auto';
	btn42.style.marginRight = 'auto';
	btn42.style.display = 'block';
	btn42.textContent = 'Log In with 42';
	
	form.appendChild(title);
	form.appendChild(logo);
	form.appendChild(emailLabel);
	form.appendChild(emailInput);
	form.appendChild(passwordLabel);
	form.appendChild(passwordInput);
	form.appendChild(btnContainer);
	form.appendChild(btn42);
	formContainer.appendChild(form);
	main.appendChild(formContainer);
	
	/* FOOTER */
	const para = document.createElement('p');
	para.textContent = 'ft_transcendance - 42';
	footer.appendChild(para);
}