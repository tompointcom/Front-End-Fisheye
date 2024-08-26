document.addEventListener('DOMContentLoaded', async () => {
    async function getPhotographers() {
        const response = await fetch('data/photographers.json');
        return await response.json();
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            //eslint-disable-next-line
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });

        const articles = document.querySelectorAll('.photographer_section-article');
        articles.forEach(article => {
            article.setAttribute('tabindex', 0);
            //eslint-disable-next-line
            article.addEventListener('keydown', handleKeyDown);
        });
    }

    const { photographers } = await getPhotographers();
    await displayData(photographers);
    console.log("Photographers loaded");
});