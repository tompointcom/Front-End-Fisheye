export default class MediaFactory {
    static createMediaElement(mediaItem, photographerName) {
        let mediaElement;
        const photographerFirstName = photographerName.split(' ')[0];
        if (mediaItem.image) {
            mediaElement = document.createElement('img');
            mediaElement.setAttribute('src', `assets/photographers/${photographerFirstName}/${mediaItem.image}`);
            mediaElement.setAttribute('lang', 'en');
            mediaElement.setAttribute('alt', mediaItem.title);
            mediaElement.setAttribute('aria-label', mediaItem.title);
        } else if (mediaItem.video) {
            mediaElement = document.createElement('video');
            mediaElement.setAttribute('src', `assets/photographers/${photographerFirstName}/${mediaItem.video}`);
            mediaElement.setAttribute('controls', true);
            mediaElement.setAttribute('lang', 'en');
            mediaElement.setAttribute('alt', mediaItem.title);
            mediaElement.setAttribute('aria-label', mediaItem.title);
        }

        mediaElement.setAttribute('tabindex', 0);
        mediaElement.classList.add('media__item--media');
        return mediaElement;
    }
};