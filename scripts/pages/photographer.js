// import MediaFactory from '../factories/media.js';

   // Récupérer l'ID du photographe à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');
    console.log("ID récupéré de l'URL:", photographerId);
    
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
        

        header.prepend(headerText);
        headerText.appendChild(nameElement);
        headerText.appendChild(locationElement);
        headerText.appendChild(taglineElement);
        header.appendChild(portraitElement);
        
        // Mise à jour du bouton de contact
        const contactButton = document.querySelector('.contact_button');
        contactButton.textContent = `Contactez-moi`;
    }

    function getPhotographerMedia(data, photographerId) {
        return data.media.filter(item => item.photographerId === parseInt(photographerId));
    }

    
    function createMediaElement(mediaItem, photographerName) {
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('media-item');
    
        if (mediaItem.image) {
            const img = document.createElement('img');
            img.src = `assets/photographers/${photographerName}/${mediaItem.image}`;
            img.alt = mediaItem.title;
            mediaContainer.appendChild(img);
        } else if (mediaItem.video) {
            const video = document.createElement('video');
            video.src = `assets/photographers/${photographerName}/${mediaItem.video}`;
            video.controls = true;
            mediaContainer.appendChild(video);
        }
    
        const title = document.createElement('h2');
        title.textContent = mediaItem.title;
        mediaContainer.appendChild(title);
    
        const likes = document.createElement('span');
        likes.textContent = `${mediaItem.likes} ♥`;
        mediaContainer.appendChild(likes);
    
        return mediaContainer;
    }

    function displayPhotographerMedia(media, photographerName) {
        const mediaSection = document.createElement('section');
        mediaSection.classList.add('photographer-media');
    
        media.forEach(item => {
            const mediaElement = createMediaElement(item, photographerName);
            mediaSection.appendChild(mediaElement);
        });
    
        // Ajoutez cette section à votre page, par exemple après le header
        const main = document.querySelector('main');
        main.appendChild(mediaSection);
    }

