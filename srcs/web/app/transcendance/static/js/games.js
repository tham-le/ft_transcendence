import { header, main, footer } from './app.js';

export function games()
{
	/* Header */
	const nav = document.createElement('nav');
	nav.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light');

	const containerNav = document.createElement('div');
	containerNav.classList.add('container');

	const titleNav = document.createElement('a');
	titleNav.classList.add('navbar-brand');
	titleNav.href = '/games';
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

	/* Main */
	const container = document.createElement('div');
	container.classList.add('container', 'mt-5', 'mb-5');
	container.id = 'games';
	container.width = '100%';
	container.height = 'auto';
	container.style.textAlign = 'center';
	container.style.display = 'flex';
	
	const pong = document.createElement('div');
	pong.classList.add('game', 'card', 'mb-3', 'pong');

	pong.addEventListener('click', function(event) {
		event.preventDefault();
		window.location.href = '/pong/';
	});

	container.appendChild(pong);
	main.appendChild(container);
}