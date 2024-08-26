export default class MediaFactory {
    static createMediaElement(mediaItem, photographerName) {
        const photographerFirstName = photographerName.split(' ')[0];
        let mediaElement;

        switch (true) {
            case !!mediaItem.image:
                mediaElement = document.createElement('img');
                mediaElement.setAttribute('src', `assets/photographers/${photographerFirstName}/${mediaItem.image}`);
                mediaElement.setAttribute('alt', mediaItem.title);
                break;
            case !!mediaItem.video:
                mediaElement = document.createElement('video');
                mediaElement.setAttribute('src', `assets/photographers/${photographerFirstName}/${mediaItem.video}`);
                mediaElement.setAttribute('controls', true);
                mediaElement.setAttribute('alt', mediaItem.title);
                break;
            default:
                throw new Error('Unsupported media type');
        }

        mediaElement.setAttribute('lang', 'fr');
        mediaElement.setAttribute('aria-label', mediaItem.title);
        mediaElement.setAttribute('tabindex', 0);
        mediaElement.classList.add('media__item--media');

        return mediaElement;
    }
}