// DOM Elements
const modal = document.getElementById("contact_modal");
const form = document.getElementById("form");

// Utility Functions
function displayModal(photographerName) {
    const photographerNameElement = document.getElementById("photographer_name");
    photographerNameElement.textContent = photographerName;
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-labelledby', 'modal-title');
    document.addEventListener('keydown', handleEscapeKey);
}

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    form.style.display = "block";
}

function handleEscapeKey(event) {
    if (event.key === "Escape") {
        closeModal();
    }
}

function setError(element, message) {
    const formData = element.closest(".formData");
    if (formData) {
        formData.setAttribute("data-error", message);
        formData.setAttribute("data-error-visible", "true");
        element.classList.add("error");
    }
}

function clearError(element) {
    const formData = element.closest(".formData");
    if (formData) {
        formData.removeAttribute("data-error");
        formData.removeAttribute("data-error-visible");
        element.classList.remove("error");
    }
}

// Validation Functions
function verifyInput(input) {
    clearError(input);
    if (input.value === "") {
        setError(input, `Le champ ${input.id} est vide.`);
        return false;
    }
    if (input.value.length < 2) {
        setError(input, `Veuillez entrer 2 caractères ou plus pour le champ ${input.id}.`);
        return false;
    }
    return true;
}

function verifyEmail(email) {
    clearError(email);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        setError(email, "L'email n'est pas valide.");
        return false;
    }
    if (email.value === "") {
        setError(email, "Veuillez saisir un email.");
        return false;
    }
    return true;
}

function verifyMessage(message) {
    clearError(message);
    if (message.value === "") {
        setError(message, "Veuillez saisir un message.");
        return false;
    }
    if (message.value.length > 350) {
        setError(message, "Vous avez atteint la limite de caractères.");
        return false;
    }
    return true;
}

// Event Handlers
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    let formIsValid = true;

    const firstName = document.getElementById("first");
    const lastName = document.getElementById("last");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    if (!verifyInput(firstName)) formIsValid = false;
    if (!verifyInput(lastName)) formIsValid = false;
    if (!verifyEmail(email)) formIsValid = false;
    if (!verifyMessage(message)) formIsValid = false;

    if (formIsValid) {
        closeModal();
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    } else {
        console.error("Le formulaire n'a pas été trouvé dans le document.");
    }
});

// Export functions for use in other modules
export { displayModal, closeModal };

// Attach functions to the global scope
window.displayModal = displayModal;
window.closeModal = closeModal;