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
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const articles = document.querySelectorAll('.photographer_section-article');
    articles.forEach(article => {
        article.setAttribute('tabindex', 0);
        article.addEventListener('keydown', handleKeyDown);
    });
});