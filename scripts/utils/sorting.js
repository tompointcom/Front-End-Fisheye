
// Function to sort media by popularity (number of likes)
function sortByPopularity(media) {
    return media.sort((a, b) => b.likes - a.likes);
}

// Function to sort media by date
function sortByDate(media) {
    return media.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Function to sort media by title (alphabetical order)
function sortByTitle(media) {
    return media.sort((a, b) => a.title.localeCompare(b.title));
}

// Export sorting functions
export { sortByPopularity, sortByDate, sortByTitle };