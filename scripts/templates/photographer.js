/** Creates the photographer template via generating DOM elements. **/
export function photographerTemplate(data) {
    const { name, id, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;


    /** Redirects to the photographer's page. **/
    function redirectToPhotographer(event) {
        event.preventDefault();
        window.location.href = `photographer.html?id=${id}`;
    }

    /** Generates the DOM elements for the photographer's card. **/
    function getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add('photographer_section-article');
        article.tabIndex = 0;
        article.role = 'article';
        article.addEventListener('click', redirectToPhotographer);

        const img = document.createElement('img');
        img.src = picture;
        img.alt = `Portrait de ${name}`;
        img.ariaLabel = `Portrait de ${name}`;

        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.ariaLabel = name;

        const h3 = document.createElement('h3');
        h3.textContent = `${city}, ${country}`;
        h3.ariaLabel = `Localisation de ${name}: ${city}, ${country}`;

        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        h4.ariaLabel = `Citation de ${name}: ${tagline}`;

        const p = document.createElement('p');
        p.textContent = `${price}€/jour`;
        p.ariaLabel = `Tarif journalier de ${name}: ${price}`;

        article.append(img, h2, h3, h4, p);
        return article;
    }

    return { name, portrait, city, country, tagline, price, getUserCardDOM };
}