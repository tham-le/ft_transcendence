import { main, header, footer } from './app.js';

// Fonction utilitaire pour créer un élément avec des classes
function createElementWithClasses(elementType, classes) {
	const element = document.createElement(elementType);
	element.classList.add(...classes);
	return element;
}

// Fonction utilitaire pour créer un bouton avec des classes, du texte et un gestionnaire d'événements
function createButton(classes, text, clickHandler) {
	const button = createElementWithClasses('button', classes);
	button.type = 'submit';
	button.style.marginTop = '10px';
	button.textContent = text;
	if (clickHandler) {
		button.addEventListener('click', clickHandler);
	}
	return button;
}

// Fonction utilitaire pour créer un champ de formulaire avec un label
function createFormField(labelText, inputType, inputId) {
	const fieldContainer = createElementWithClasses('div', ['form-field']);
		
	const label = createElementWithClasses('label', ['form-label']);
	label.setAttribute('for', inputId);
	label.textContent = labelText;

	const input = createElementWithClasses('input', ['form-control']);
	input.type = inputType;
	input.id = inputId;

	fieldContainer.appendChild(label);
	fieldContainer.appendChild(input);

	return fieldContainer;
}

export function login() {
	// HEADER
	const nav = createElementWithClasses('nav', ['navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light']);
	const containerNav = createElementWithClasses('div', ['container']);
	const titleNav = createElementWithClasses('a', ['navbar-brand']);
	titleNav.href = '/';
	titleNav.textContent = 'Transcendance';

	const profileHeader = createElementWithClasses('div', ['profile-header']);
	const iconProfile = createElementWithClasses('img', []);
	iconProfile.src = '/static/img/default_avatar.jpg';
	iconProfile.style.width = '30px';
	iconProfile.style.height = '30px';
	iconProfile.style.borderRadius = '50%';
	iconProfile.style.display = 'inline-block';
	iconProfile.style.margin = '5px';

	const loginHeader = createElementWithClasses('p', []);
	loginHeader.textContent = 'login';
	loginHeader.style.margin = '5px';
	loginHeader.style.display = 'inline-block';

	profileHeader.appendChild(loginHeader);
	profileHeader.appendChild(iconProfile);
	containerNav.appendChild(titleNav);
	containerNav.appendChild(profileHeader);
	nav.appendChild(containerNav);
	header.appendChild(nav);

	// MAIN
	const formContainer = createElementWithClasses('div', ['Form']);
	formContainer.id = 'login';
	const form = document.createElement('form');
	form.id = 'login-form';
	form.method = 'post';
	form.action = '/login/';
	const title = createElementWithClasses('h1', []);
	title.textContent = 'Log In';
	const logo = createElementWithClasses('img', []);
	logo.src = '/static/img/42_Logo.png';
	logo.style.width = '100px';
	logo.style.display = 'block';
	logo.style.marginLeft = 'auto';
	logo.style.marginRight = 'auto';

	const loginField = createFormField('Login', 'login', 'textInput');
	const passwordField = createFormField('Password', 'password', 'passwordInput');

	const btnLogIn = createButton(['btn', 'btn-success', 'btn-margin'], 'Log In');
	btnLogIn.type = 'submit';
	const btnSignIn = createButton(['btn', 'btn-primary', 'btn-margin'], 'Sign In', (event) => {
		event.preventDefault();
		window.location.href = '/signin/';
	});

	const btnContainer = createElementWithClasses('div', []);
	btnContainer.style.marginLeft = 'auto';
	btnContainer.style.marginRight = 'auto';
	btnContainer.style.display = 'flex';
	btnContainer.style.justifyContent = 'center';
	btnContainer.appendChild(btnLogIn);
	btnContainer.appendChild(btnSignIn);

	const btn42 = createButton(['btn', 'btn-secondary', 'btn-margin'], 'Log In with 42');

	form.appendChild(title);
	form.appendChild(logo);
	form.appendChild(loginField);
	form.appendChild(passwordField);
	form.appendChild(btnContainer);
	form.appendChild(btn42);
	formContainer.appendChild(form);
	main.appendChild(formContainer);

	// POST METHOD
    function getCSRFToken() {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Recherche du cookie nommé 'csrftoken'
                if (cookie.substring(0, 10) === 'csrftoken=') {
                    cookieValue = decodeURIComponent(cookie.substring(10));
                    break;
                }
            }
        }
        return cookieValue;
    }
    // Fonction pour ajouter le champ CSRF au formulaire
    function addCSRFTokenToForm(formId) {
        var form = document.getElementById(formId);
        if (form) {
            var csrfToken = getCSRFToken(); // Récupérer le jeton CSRF depuis les cookies
            if (csrfToken) {
                var csrfInput = document.createElement('input');
                csrfInput.setAttribute('type', 'hidden');
                csrfInput.setAttribute('name', 'csrfmiddlewaretoken');
                csrfInput.setAttribute('value', csrfToken);
                form.appendChild(csrfInput);
            } else {
                console.error('CSRF token not found.');
            }
        } else {
            console.error('Form not found.');
        }
    }
	document.addEventListener('DOMContentLoaded', function(event) {
        function handleFormSubmit(event) {
            event.preventDefault(); // Empêche le comportement par défaut du formulaire
            
            // Récupération des valeurs des champs du formulaire
            var login = document.getElementById('login').value;
            var password = document.getElementById('password').value;
        
            // Vous pouvez ici effectuer des validations supplémentaires si nécessaire
        
            // Exemple simple : Affichage des valeurs dans la console
            console.log('Nom d\'utilisateur : ' + login);
            console.log('Mot de passe : ' + password);
        
            // Construire l'objet de données à envoyer au serveur
            var formData = new FormData();
            formData.append('login', login);
            formData.append('password', password);
        
            // Ajouter le jeton CSRF au formulaire (si ce n'est pas déjà fait)
            addCSRFTokenToForm('login-form');
        
            // Effectuer la requête Fetch
            fetch('/login/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': getCSRFToken() // Ajouter le jeton CSRF à l'en-tête
                }
            })
            .then(response => {
                // Gérer la réponse du serveur ici
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erreur lors de la requête');
                }
            })
            .then(data => {
                // Traiter les données de la réponse
                console.log('Réponse du serveur :', data);
                // Rediriger ou effectuer d'autres actions en fonction de la réponse
            })
            .catch(error => {
                console.error('Erreur lors de la requête Fetch :', error);
            });
        }
        
		
		// Ajout d'un écouteur d'événement pour le formulaire
		var loginForm = document.getElementById('login-form');
		loginForm.addEventListener('submit', handleFormSubmit);
	});

	// FOOTER
	const para = createElementWithClasses('p', []);
	para.textContent = 'ft_transcendance - 42';
	footer.appendChild(para);
}
