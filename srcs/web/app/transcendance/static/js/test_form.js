import { main } from './app.js';
import { createElt } from './utils.js';

export function form() {
	const formContainer = document.createElement('form');
	formContainer.classList.add('container', 'mt-4');
	formContainer.setAttribute('action', '/inscription');
	formContainer.setAttribute('method', 'POST');

	const labelNom = document.createElement('label');
	labelNom.setAttribute('for', 'nom');
	labelNom.textContent = 'Nom :';

	const inputNom = document.createElement('input');
	inputNom.classList.add('form-control');
	inputNom.setAttribute('type', 'text');
	inputNom.setAttribute('id', 'nom');
	inputNom.setAttribute('name', 'nom');
	inputNom.setAttribute('required', 'true');

	const labelPrenom = document.createElement('label');
	labelPrenom.setAttribute('for', 'prenom');
	labelPrenom.textContent = 'Prénom :';

	const inputPrenom = document.createElement('input');
	inputPrenom.classList.add('form-control');
	inputPrenom.setAttribute('type', 'text');
	inputPrenom.setAttribute('id', 'prenom');
	inputPrenom.setAttribute('name', 'prenom');
	inputPrenom.setAttribute('required', 'true');

	const labelEmail = document.createElement('label');
	labelEmail.setAttribute('for', 'email');
	labelEmail.textContent = 'Email :';

	const inputEmail = document.createElement('input');
	inputEmail.classList.add('form-control');
	inputEmail.setAttribute('type', 'email');
	inputEmail.setAttribute('id', 'email');
	inputEmail.setAttribute('name', 'email');
	inputEmail.setAttribute('required', 'true');

	const labelMotdepasse = document.createElement('label');
	labelMotdepasse.setAttribute('for', 'motdepasse');
	labelMotdepasse.textContent = 'Mot de passe :';

	const inputMotdepasse = document.createElement('input');
	inputMotdepasse.classList.add('form-control');
	inputMotdepasse.setAttribute('type', 'password');
	inputMotdepasse.setAttribute('id', 'motdepasse');
	inputMotdepasse.setAttribute('name', 'motdepasse');
	inputMotdepasse.setAttribute('required', 'true');

	const submitButton = document.createElement('input');
	submitButton.setAttribute('type', 'submit');
	submitButton.setAttribute('value', "S'inscrire");

	formContainer.appendChild(labelNom);
	formContainer.appendChild(inputNom);
	formContainer.appendChild(document.createElement('br'));
	formContainer.appendChild(document.createElement('br'));

	formContainer.appendChild(labelPrenom);
	formContainer.appendChild(inputPrenom);
	formContainer.appendChild(document.createElement('br'));
	formContainer.appendChild(document.createElement('br'));

	formContainer.appendChild(labelEmail);
	formContainer.appendChild(inputEmail);
	formContainer.appendChild(document.createElement('br'));
	formContainer.appendChild(document.createElement('br'));

	formContainer.appendChild(labelMotdepasse);
	formContainer.appendChild(inputMotdepasse);
	formContainer.appendChild(document.createElement('br'));
	formContainer.appendChild(document.createElement('br'));

	formContainer.appendChild(submitButton);

	main.appendChild(formContainer);
}