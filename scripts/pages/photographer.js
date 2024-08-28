import MediaFactory from '/scripts/Factory/media.js';
import Lightbox from '/scripts/utils/lightbox.js';
import { filterBy } from '/scripts/utils/sorting.js';
import { displayModal } from '/scripts/utils/contactForm.js';

/** Event listener to display the contact modal. **/
document.querySelector('.contact_button').addEventListener('click', () => {
    const photographerName = document.querySelector('.photograph-header h1').textContent;
    displayModal(photographerName);
});

// DOM Elements
const body = document.querySelector('body');
const main = document.querySelector('main');
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

/** Extracts the first name from a full name. **/
function getFirstName(fullName) {
    return fullName.split(' ')[0];
}

/** Calculates the total number of likes from the media array. **/
function calculateTotalLikes(media) {
    return media.reduce((total, item) => total + item.likes, 0);
}

/** Updates the total likes display element with the current total likes. **/
function updateTotalLikesDisplay(media) {
    const totalLikesElement = document.querySelector('.totalLikes');
    const totalLikes = calculateTotalLikes(media);
    totalLikesElement.textContent = `${totalLikes}`;
}

/** Loads photographer data from the JSON file. **/
async function loadPhotographerData() {
    try {
        const response = await fetch('/data/photographers.json');
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        return null;
    }
}

/** Finds a photographer by ID from the data. **/
function findPhotographer(data, id) {
    return data["photographers"].find(p => p.id === parseInt(id));
}

/** Gets the media for a specific photographer. **/
function getPhotographerMedia(data, photographerId) {
    return data.media.filter(item => item["photographerId"] === parseInt(photographerId));
}

/** Displays the photographer's information on the page. **/
function displayPhotographerInfo(photographer) {
    const header = document.querySelector('.photograph-header');
    const headerText = document.createElement('div');
    headerText.classList.add('photograph-header-text');

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

    const contactButton = document.querySelector('.contact_button');
    contactButton.textContent = `Contactez-moi`;
    contactButton.setAttribute('aria-label', 'Contact me');
}

/** Displays the photographer's media on the page. **/
function displayPhotographerMedia(media, photographerFullName) {
    const existingMediaSection = document.querySelector('.photographer-media');
    if (existingMediaSection) {
        existingMediaSection.remove();
    }

    const mediaSection = document.createElement('section');
    mediaSection.classList.add('photographer-media');

    const photographerFirstName = getFirstName(photographerFullName);
    const lightbox = new Lightbox(media, photographerFirstName);

    updateTotalLikesDisplay(media);

    media.forEach((item, index) => {
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('media-item');
        mediaContainer.setAttribute('tabindex', '0');
        mediaContainer.setAttribute('aria-label', `Media item: ${item.title}`);

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
        heartIcon.dataset.liked = false;
        heartIcon.setAttribute('aria-label', 'Like button');
        heartIcon.setAttribute('tabindex', '0');

        heartIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            let currentLikes = parseInt(likesCount.textContent);
            if (heartIcon.dataset.liked === 'false') {
                heartIcon.dataset.liked = 'true';
                currentLikes += 1;
            } else {
                heartIcon.dataset.liked = 'false';
                currentLikes -= 1;
            }
            likesCount.textContent = currentLikes;
            item.likes = currentLikes;
            updateTotalLikesDisplay(media);
        });

        heartIcon.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                heartIcon.click();
            }
        });

        content.appendChild(likesContainer);
        likesContainer.appendChild(likesCount);
        likesContainer.appendChild(heartIcon);

        mediaContainer.appendChild(content);

        mediaElement.addEventListener('click', () => {
            lightbox.openLightBox(index);
        });

        mediaContainer.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                if (document.activeElement !== heartIcon) {
                    mediaElement.click();
                }
            }
        });

        mediaSection.appendChild(mediaContainer);
    });

    main.appendChild(mediaSection);
}

/** Creates a sorting dropdown for the media items. **/
function createSortingDropdown(media, photographerName) {
    const dropdownButton = document.createElement('button');
    dropdownButton.classList.add('dropdown-btn');
    dropdownButton.setAttribute('aria-haspopup', 'listbox');
    dropdownButton.setAttribute('aria-expanded', 'false');
    dropdownButton.setAttribute('aria-label', 'Sort options');
    dropdownButton.innerHTML = `
        <span class="activeFilter">Choisir</span>
        <svg class="dropdown-icon" width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.12 0.453125L8 6.55979L1.88 0.453125L0 2.33312L8 10.3331L16 2.33312L14.12 0.453125Z" fill="white"/>
        </svg>
    `;

    const listbox = document.createElement('ul');
    listbox.classList.add('dropdown');
    listbox.setAttribute('role', 'listbox');
    listbox.setAttribute('tabindex', '-1');
    listbox.hidden = true;

    const options = [
        { value: 'popularity', text: 'Popularité' },
        { value: 'date', text: 'Date' },
        { value: 'title', text: 'Titre' }
    ];

    options.forEach(option => {
        const listItem = document.createElement('li');
        listItem.setAttribute('role', 'option');
        listItem.setAttribute('data-value', option.value);
        listItem.setAttribute('tabindex', '0');
        listItem.setAttribute('aria-label', `Sort by ${option.text}`);

        const anchor = document.createElement('a');
        anchor.setAttribute('href', 'javascript:void(0)');
        anchor.textContent = option.text;
        anchor.addEventListener('click', () => {
            const sortedMedia = filterBy(option.value, media);
            displayPhotographerMedia(sortedMedia, photographerName);
        });

        listItem.appendChild(anchor);
        listbox.appendChild(listItem);
    });

    dropdownButton.addEventListener('click', () => {
        const expanded = dropdownButton.getAttribute('aria-expanded') === 'true';
        dropdownButton.setAttribute('aria-expanded', !expanded);
        listbox.hidden = expanded;
        dropdownButton.querySelector('.dropdown-icon').classList.toggle('open', !expanded);
        if (!expanded) {
            listbox.focus();
        }
    });

    listbox.addEventListener('click', (event) => {
        if (event.target.matches('[role="option"] a')) {
            const selectedOption = event.target.parentElement.getAttribute('data-value');
            const sortedMedia = filterBy(selectedOption, media);
            displayPhotographerMedia(sortedMedia, photographerName);
            dropdownButton.querySelector('.activeFilter').textContent = event.target.textContent;
            dropdownButton.setAttribute('aria-expanded', 'false');
            listbox.hidden = true;
            dropdownButton.querySelector('.dropdown-icon').classList.remove('open');
        }
    });

    listbox.addEventListener('keydown', (event) => {
        const items = Array.from(listbox.querySelectorAll('[role="option"]'));
        let currentIndex = items.indexOf(document.activeElement);

        switch (event.key) {
            case 'ArrowDown':
                currentIndex = (currentIndex + 1) % items.length;
                items[currentIndex].focus();
                break;
            case 'ArrowUp':
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                items[currentIndex].focus();
                break;
            case 'Enter':
                event.target.click();
                break;
            case 'Escape':
                listbox.hidden = true;
                dropdownButton.setAttribute('aria-expanded', 'false');
                dropdownButton.querySelector('.dropdown-icon').classList.remove('open');
                dropdownButton.focus();
                break;
        }
    });

    document.querySelector('.sorting-container').appendChild(dropdownButton);
    document.querySelector('.sorting-container').appendChild(listbox);
}

/** Initializes the photographer page by loading data and displaying the photographer's information and media. **/
async function initPhotographerPage() {
    if (!photographerId) {
        console.error("Aucun ID de photographe dans l'URL");
        return;
    }

    const data = await loadPhotographerData();
    const photographer = findPhotographer(data, photographerId);

    if (photographer) {
        displayPhotographerInfo(photographer);
        const photographerMedia = getPhotographerMedia(data, photographerId);
        createSortingDropdown(photographerMedia, photographer.name);
        displayPhotographerMedia(photographerMedia, photographer.name);
    } else {
        console.error('Photographe non trouvé');
    }
}

// Event listener to initialize the photographer page when the DOM content is loaded.
window.addEventListener('DOMContentLoaded', initPhotographerPage);