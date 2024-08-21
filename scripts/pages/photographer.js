import MediaFactory from '/scripts/Factory/media.js';
import Lightbox from '../utils/lightbox.js';

// DOM
const body = document.querySelector('body');

   // Récupérer l'ID du photographe à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');
    console.log("ID récupéré de l'URL:", photographerId);

// Fonction qui récupère le prénom du photographe
function getFirstName(fullName) {
    return fullName.split(' ')[0];
}
    
// Fonction pour charger les données des photographes
async function loadPhotographerData() {
    try {
        const response = await fetch('/data/photographers.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
    }
}

// Fonction pour trouver un photographe par son ID
function findPhotographer(data, id) {
    return data.photographers.find(p => p.id === parseInt(id));
}
    
// Fonction pour initialiser la page du photographe
async function initPhotographerPage() {
    if (!photographerId) {
        console.error("Aucun ID de photographe dans l'URL");
        return;
    }

    const data = await loadPhotographerData();
    console.log("Données chargées:", data);

    const photographer = findPhotographer(data, photographerId);

    if (photographer) {
        console.log("Photographe trouvé:", photographer);
        displayPhotographerInfo(photographer);

        // Afficher les médias du photographe
        const photographerMedia = getPhotographerMedia(data, photographerId);
        displayPhotographerMedia(photographerMedia, photographer.name);
    } else {
        console.error('Photographe non trouvé');
    }
}
    // Appel de la fonction d'initialisation quand la page est chargée
    window.addEventListener('DOMContentLoaded', initPhotographerPage);

    function displayPhotographerInfo(photographer) {
        const header = document.querySelector('.photograph-header');

        // Création des elements html
        const headerText = document.createElement('div');
        headerText.classList.add('photograph-header-text')


        const nameElement = document.createElement('h1');
        nameElement.textContent = photographer.name;
        
        const locationElement = document.createElement('h2');
        locationElement.textContent = `${photographer.city}, ${photographer.country}`;
        
        const taglineElement = document.createElement('h3');
        taglineElement.textContent = photographer.tagline;

        const portraitElement = document.createElement('img');
        portraitElement.src = `assets/photographers/${photographer.portrait}`;
        portraitElement.alt = photographer.name;

        const totalLikesAndPriceContainer = document.createElement('div');
        totalLikesAndPriceContainer.classList.add('totalLikesPrice');

        const totalLikes = document.createElement('span');
        totalLikes.classList.add('totalLikes');

        const pricePerDay = document.createElement('span');
        pricePerDay.classList.add('price');
        pricePerDay.textContent = `${photographer.price}€ / jour`;

        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fas', 'fa-heart');

        const totalLikesContainer = document.createElement('div');
        totalLikesContainer.classList.add('totalLikesContainer');


        totalLikesAndPriceContainer.appendChild(totalLikesContainer);
        totalLikesContainer.appendChild(totalLikes);
        totalLikesContainer.appendChild(heartIcon);
        totalLikesAndPriceContainer.appendChild(pricePerDay);
        body.appendChild(totalLikesAndPriceContainer);
        header.prepend(headerText);
        headerText.appendChild(nameElement);
        headerText.appendChild(locationElement);
        headerText.appendChild(taglineElement);
        header.appendChild(portraitElement);

        
        // Mise à jour du button de contact
        const contactButton = document.querySelector('.contact_button');
        contactButton.textContent = `Contactez-moi`;
    }

    function getPhotographerMedia(data, photographerId) {
        return data.media.filter(item => item.photographerId === parseInt(photographerId));
    }

function displayPhotographerMedia(media, photographerFullName) {
    const mediaSection = document.createElement('section');
    mediaSection.classList.add('photographer-media');

    const photographerFirstName = getFirstName(photographerFullName);

    const lightbox = new Lightbox(media, photographerFirstName);

    updateTotalLikesDisplay(media);

    media.forEach((item, index) => {
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('media-item');

        const mediaElement = MediaFactory.createMediaElement(item, photographerFirstName);
        mediaContainer.appendChild(mediaElement);

        const content = document.createElement('div');
        content.classList.add('content');
        mediaContainer.appendChild(content);

        const title = document.createElement('h2');
        title.textContent = item.title;
        content.appendChild(title);

        const likesContainer = document.createElement('div');
        likesContainer.classList.add('likes-container');

        const likesCount = document.createElement('span');
        likesCount.textContent = item.likes;
        likesCount.classList.add('likes-count');

        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fas', 'fa-heart');
        heartIcon.dataset.liked = false;  // Etat initial



        heartIcon.addEventListener('click', () => {
            let currentLikes = parseInt(likesCount.textContent);
            if (heartIcon.dataset.liked === 'false') {
                currentLikes += 1;
                heartIcon.classList.add('liked');
                heartIcon.dataset.liked = 'true';
            } else {
                currentLikes -= 1;
                heartIcon.classList.remove('liked');
                heartIcon.dataset.liked = 'false';
            }
            likesCount.textContent = currentLikes;
            item.likes = currentLikes;
            updateTotalLikesDisplay(media);

        });


        content.appendChild(likesContainer);
        likesContainer.appendChild(likesCount);
        likesContainer.appendChild(heartIcon);

        mediaSection.appendChild(mediaContainer);
    });

    const main = document.querySelector('main');
    main.appendChild(mediaSection);
}



// Fonction pour mettre à jour les likes dans le stockage local ou la base de données
function updateLikesInStorage(mediaId, newLikes) {
    const likesTotal = document.createElement('p');
    likesTotal.textContent = item.likes;

    console.log(`Mise à jour des likes pour le média ID: ${mediaId}, nouveaux likes: ${newLikes}`);
}

// Fonction pour calculer le total des likes
function calculateTotalLikes(media) {
    return media.reduce((total, item) => total + item.likes, 0);
}

// Fonction pour mettre à jour l'affichage du total des likes
function updateTotalLikesDisplay(media) {
    const totalLikesElement = document.querySelector('.totalLikes');
    const totalLikes = calculateTotalLikes(media);
    totalLikesElement.textContent = `${totalLikes}`;
}






