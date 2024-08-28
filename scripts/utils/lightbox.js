export default class Lightbox {
    constructor(mediaItems, photographerName) {
        // Get references to DOM elements
        const lightbox = document.getElementById('lightbox');
        const mediaContainer = document.getElementById('lightbox-media');
        const caption = document.querySelector('.lightbox-caption');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        let currentIndex = 0; // Initialize the current index

        // Bind event listeners to the lightbox controls
        function bindEvents() {
            closeBtn.addEventListener('click', close);
            prevBtn.addEventListener('click', showPrev);
            nextBtn.addEventListener('click', showNext);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') close();
                if (e.key === 'ArrowLeft') showPrev();
                if (e.key === 'ArrowRight') showNext();
            });
        }

        // Open the lightbox and display the media at the given index
        function openLightBox(index) {
            currentIndex = index;
            lightbox.style.display = 'block';
            showMedia();
        }

        // Close the lightbox
        function close() {
            lightbox.style.display = 'none';
        }

        // Display the media item at the current index
        function showMedia() {
            const item = mediaItems[currentIndex];
            mediaContainer.innerHTML = ''; // Clear the media container

            // Check if the item is an image
            if (item["image"]) {
                const img = document.createElement('img');
                img.src = `assets/photographers/${photographerName}/${item["image"]}`;
                img.alt = item.title;
                mediaContainer.appendChild(img);
            }
            // Check if the item is a video
            else if (item.video) {
                const video = document.createElement('video');
                video.src = `assets/photographers/${photographerName}/${item.video}`;
                video.controls = true;
                mediaContainer.appendChild(video);
            }

            // Set the caption text
            caption.textContent = item.title;
        }

        // Show the next media item
        function showNext() {
            currentIndex = (currentIndex + 1) % mediaItems.length;
            showMedia();
        }

        // Show the previous media item
        function showPrev() {
            currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
            showMedia();
        }

        // Bind the events when the lightbox is initialized
        bindEvents();

        // Expose the openLightBox method to be used outside the class
        this.openLightBox = openLightBox;
    }
}