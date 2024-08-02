function photographerTemplate(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    
    function redirectToPhotographer(event) {
        event.preventDefault(); 
        window.location.href = `photographer.html?id=${id}`;
    }

    function getUserCardDOM() {
        // Card du photographe 
        const article = document.createElement('article');
        article.classList.add('photographer_section-article');
        article.setAttribute('tabindex', 0);
        article.setAttribute('role', 'article');
        article.addEventListener('click', () => redirectToPhotographer(event));
        article.focus()

        const idElement = document.createElement('span');
        idElement.textContent = id;
        idElement.style.display = "none";

        // Photo de profil du photographe
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Portrait de " + name);
        img.setAttribute("aria-label", "Portrait de " + name);

        // Nom du photographe
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("aria-label", name);

        // Localisation du photographe
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + ", " + country;
        h3.setAttribute("aria-label", "Localisation de " + name + ":" + city + ", " + country);

        // Citation du photographe
        const h4 = document.createElement( 'h4' );
        h4.textContent = tagline;
        h3.setAttribute("aria-label", "Citation de " + name + ":" + tagline);

        // Tarif du photographe
        const p = document.createElement( 'p' );
        p.textContent = price + "€/jour";
        p.setAttribute("aria-label", "Tarif journalier de " + name + ":" + price); 

        // Creation des DOM elements
        article.appendChild(img);
        article.appendChild(h2); 
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(p);
        
        return (article);

    }
    return { name, portrait, city, country, tagline, price, getUserCardDOM }
}