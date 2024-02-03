import { main, header, footer } from './app.js';
import { createFormItem } from './utils.js';

const formFields = [
    { label: 'Username', type: 'text', id: 'userNameInput' },
    { label: 'Email address', type: 'email', id: 'emailInput' },
    { label: 'Password', type: 'password', id: 'passwordInput' },
    { label: 'Confirm Password', type: 'password', id: 'confirmPasswordInput' },
    { label: 'Birthdate', type: 'date', id: 'birthdateInput' },
    { label: 'Sex', type: 'select', id: 'sexInput', options: [
        { value: '', text: '' },
        { value: 'homme', text: 'Homme' },
        { value: 'femme', text: 'Femme' }
    ] },
    { label: 'Image Profile', type: 'file', id: 'imageInput' },
];

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

	const profileHeader = document.createElement('div');
	profileHeader.classList.add('profile-header');

	const iconProfile = document.createElement('img');
	iconProfile.src = '/static/img/default_avatar.jpg';
	iconProfile.style.width = '30px';
	iconProfile.style.height = '30px';
	iconProfile.style.borderRadius = '50%';
	iconProfile.style.display = 'inline-block';
	iconProfile.style.margin = '5px';

	const loginHeader = document.createElement('p');
	loginHeader.textContent = 'Username';
	loginHeader.style.margin = '5px';
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
	formContainer.id = 'signin';

	const form = document.createElement('form');
	form.method = 'post';
	form.action = '/signin';

	const title = document.createElement('h1');
	title.textContent = 'Sign In';

	formFields.forEach(field => {
		const { label, input } = createFormItem(field.label, field.type, field.id, field.options);
		form.appendChild(label);
		form.appendChild(input);
	});
	
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
	
	form.appendChild(btnSignIn);
	form.appendChild(btn42);
	formContainer.appendChild(form);
	main.appendChild(formContainer);
	
	/* FOOTER */
	const para = document.createElement('p');
	para.textContent = 'ft_transcendance - 42';
	footer.appendChild(para);
}