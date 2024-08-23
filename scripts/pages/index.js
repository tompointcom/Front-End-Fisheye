async function getPhotographers() {
    const response = await fetch('../../data/photographers.json');
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

    // Ensure articles are focusable and event listeners are attached
    const articles = document.querySelectorAll('.photographer_section-article');
    articles.forEach(article => {
        article.setAttribute('tabindex', 0);
        //eslint-disable-next-line
        article.addEventListener('keydown', handleKeyDown);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    await displayData(photographers);
}

init().then(() => console.log("Photographers loaded"));