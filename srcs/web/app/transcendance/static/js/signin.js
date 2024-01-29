import { main, header, footer } from './app.js';

export function signin()
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

	const btnNav = document.createElement('button');
	btnNav.classList.add('navbar-toggler');
	btnNav.type = 'button';
	btnNav.setAttribute('data-bs-toggle', 'collapse');
	btnNav.setAttribute('data-bs-target', '#navbarNav');
	btnNav.setAttribute('aria-controls', 'navbarNav');
	btnNav.setAttribute('aria-expanded', 'false');
	btnNav.setAttribute('aria-label', 'Toggle navigation');

	const spanElement = document.createElement('span');
	spanElement.classList.add('navbar-toggler-icon');

	btnNav.appendChild(spanElement);
	containerNav.appendChild(titleNav);
	containerNav.appendChild(btnNav);
	nav.appendChild(containerNav);
	header.appendChild(nav);


	/* MAIN */
	const formContainer = document.createElement('div');
	formContainer.classList.add('Form');
	formContainer.id = 'signin';

	const form = document.createElement('form');

	const title = document.createElement('h1');
	title.textContent = 'Sign In';

	const userNameLabel = document.createElement('label');
	userNameLabel.classList.add('form-label');
	userNameLabel.setAttribute('for', 'userNameInput');
	userNameLabel.textContent = 'Username';

	const userNameInput = document.createElement('input');
	userNameInput.classList.add('form-control');
	userNameInput.type = 'name';
	userNameInput.id = 'userNameInput';

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

	const confirmPasswordLabel = document.createElement('label');
	confirmPasswordLabel.classList.add('form-label');
	confirmPasswordLabel.setAttribute('for', 'confirmPasswordInput');
	confirmPasswordLabel.textContent = 'Password';

	const confirmPasswordInput = document.createElement('input');
	confirmPasswordInput.classList.add('form-control');
	confirmPasswordInput.type = 'password';
	confirmPasswordInput.id = 'confirmPasswordInput';

	const birthdateLabel = document.createElement('label');
	birthdateLabel.classList.add('form-label');
	birthdateLabel.setAttribute('for', 'birthdateInput');
	birthdateLabel.textContent = 'Birthdate';

	const birthdateInput = document.createElement('input');
	birthdateInput.classList.add('form-control');
	birthdateInput.type = 'date';
	birthdateInput.id = 'birthdateInput';

	// const sexLabel = document.createElement('label');
	// sexLabel.classList.add('form-label');
	// sexLabel.setAttribute('for', 'sexInput');
	// sexLabel.textContent = "Sex";

	// const sexInput = document.createElement('select');
	// sexInput.classList.add('form-select');
	// sexInput.id = 'sexInput';

	const imageLabel = document.createElement('label');
	imageLabel.classList.add('form-label');
	imageLabel.setAttribute('for', 'imageInput');
	imageLabel.textContent = 'Image Profile';

	const imageInput = document.createElement('input');
	imageInput.classList.add('form-control');
	imageInput.type = 'file';
	imageInput.id = 'imageInput';

	const btnSignIn = document.createElement('button');
	btnSignIn.classList.add('btn', 'btn-primary', 'btn-margin');
	btnSignIn.type = 'submit';
	btnSignIn.style.marginTop = '10px';
	btnSignIn.style.marginLeft = 'auto';
	btnSignIn.style.marginRight = 'auto';
	btnSignIn.style.display = 'block';
	btnSignIn.textContent = 'Sign In';

	const btn42 = document.createElement('button');
	btn42.classList.add('btn', 'btn-secondary', 'btn-margin');
	btn42.type = 'submit';
	btn42.style.marginTop = '10px';
	btn42.style.marginLeft = 'auto';
	btn42.style.marginRight = 'auto';
	btn42.style.display = 'block';
	btn42.textContent = 'Sign In with 42';
	
	form.appendChild(title);
	form.appendChild(userNameLabel);
	form.appendChild(userNameInput);
	form.appendChild(emailLabel);
	form.appendChild(emailInput);
	form.appendChild(passwordLabel);
	form.appendChild(passwordInput);
	form.appendChild(confirmPasswordLabel);
	form.appendChild(confirmPasswordInput);
	form.appendChild(birthdateLabel);
	form.appendChild(birthdateInput);
	form.appendChild(imageLabel);
	form.appendChild(imageInput);
	form.appendChild(btnSignIn);
	form.appendChild(btn42);
	formContainer.appendChild(form);
	main.appendChild(formContainer);
	
	/* FOOTER */
	const para = document.createElement('p');
	para.textContent = 'ft_transcendance - 42';
	footer.appendChild(para);
}