/** Function to sort media by popularity (number of likes) **/
export function sortByPopularity(media) {
    return media.sort((a, b) => b.likes - a.likes);
}

/** Function to sort media by date **/
export function sortByDate(media) {
    return media.sort((a, b) => new Date(b["date"]) - new Date(a["date"]));
}

/** Function to sort media by title (alphabetical order) **/
export function sortByTitle(media) {
    return media.sort((a, b) => a.title.localeCompare(b.title));
}

/** Filter function **/
export function filterBy(criteria, media) {
    switch (criteria) {
        case 'popularity':
            return sortByPopularity(media);
        case 'date':
            return sortByDate(media);
        case 'title':
            return sortByTitle(media);
        default:
            return media;
    }
}
