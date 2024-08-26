function handleKeyDown(event) {
    const currentArticle = event.target;
    if (event.key === 'Enter') {
        currentArticle.click();
    } else if (event.key === 'ArrowRight') {
        const nextArticle = currentArticle.nextElementSibling;
        if (nextArticle) {
            nextArticle.focus();
        }
    } else if (event.key === 'ArrowLeft') {
        const previousArticle = currentArticle.previousElementSibling;
        if (previousArticle) {
            previousArticle.focus();
        }
    } else if (event.key === 'Escape') {
        closeModal();
    }
}

function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const articles = document.querySelectorAll('.photographer_section-article');
    articles.forEach(article => {
        article.setAttribute('tabindex', 0);
        article.addEventListener('keydown', handleKeyDown);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});