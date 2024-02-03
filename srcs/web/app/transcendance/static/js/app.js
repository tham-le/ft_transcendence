// import { getElt } from './utils.js';
// import { route } from './route.js';

// export const main = getElt('main');
// export const header = getElt('header');
// export const footer = getElt('footer');

// // resizeMain();
// route();
// // window.addEventListener('resize', () => resizeMain(main));
// window.addEventListener('popstate', route);

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#login-form').onsubmit = function (event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement
        
        // Récupérer les valeurs du formulaire
        const login = document.querySelector('#login').value;
        const password = document.querySelector('#password').value;

        // Envoyer les données au serveur
        fetch('/login/', {
            method: 'POST',
            body: JSON.stringify({
                login: login,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Assurez-vous d'envoyer le jeton CSRF
            }
        })
        .then(response => {
            if (response.ok) {
                // Si la réponse du serveur est réussie, affichez un message ou redirigez l'utilisateur
                console.log('Connexion réussie');
                // Rediriger l'utilisateur vers une autre page si nécessaire
            } else {
                // Sinon, affichez un message d'erreur
                console.log('Erreur de connexion');
            }
        })
        .catch(error => console.error('Erreur:', error));
    };
});

// Fonction pour récupérer le jeton CSRF
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Cherche le cookie avec le nom spécifié et récupère sa valeur
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
