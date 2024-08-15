export default class Lightbox {
    constructor(mediaItems, photographerName) {
        this.mediaItems = mediaItems;
        this.photographerName = photographerName;
        this.currentIndex = 0;
        this.lightbox = document.getElementById('lightbox');
        this.mediaContainer = document.getElementById('lightbox-media');
        this.caption = document.querySelector('.lightbox-caption');
        this.closeBtn = document.querySelector('.lightbox-close');
        this.prevBtn = document.querySelector('.lightbox-prev');
        this.nextBtn = document.querySelector('.lightbox-next');

        this.bindEvents();
    }

    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.prevBtn.addEventListener('click', () => this.showPrev());
        this.nextBtn.addEventListener('click', () => this.showNext());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.showPrev();
            if (e.key === 'ArrowRight') this.showNext();
        });
    }

    openLightBox(index) {
        this.currentIndex = index;
        this.lightbox.style.display = 'block';
        this.showMedia();
    }

    close() {
        this.lightbox.style.display = 'none';
    }

    showMedia() {
        const item = this.mediaItems[this.currentIndex];
        this.mediaContainer.innerHTML = '';

        if (item.image) {
            const img = document.createElement('img');
            img.src = `assets/photographers/${this.photographerName}/${item.image}`;
            img.alt = item.title;
            this.mediaContainer.appendChild(img);
        } else if (item.video) {
            const video = document.createElement('video');
            video.src = `assets/photographers/${this.photographerName}/${item.video}`;
            video.controls = true;
            this.mediaContainer.appendChild(video);
        }

        this.caption.textContent = item.title;
    }

    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.mediaItems.length;
        this.showMedia();
    }

    showPrev() {
        this.currentIndex = (this.currentIndex - 1 + this.mediaItems.length) % this.mediaItems.length;
        this.showMedia();
    }
}