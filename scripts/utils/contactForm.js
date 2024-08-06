function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    const firstName = document.getElementById("first");
    const lastName = document.getElementById("last");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // error message function
    function setError(element, message) {
        console.log("setError appelé pour", element, "avec le message:", message);
        const formData = element.closest(".formData");
        if (formData) {
            formData.setAttribute("data-error", message);
            formData.setAttribute("data-error-visible", "true");
            element.classList.add("error");
        } else {
            console.error("Élément .formData parent non trouvé");
        }
    }


// clear error message function
    function clearError(element) {
        const formData = element.closest(".formData");
        if (formData) {
            formData.removeAttribute("data-error");
            formData.removeAttribute("data-error-visible");
            element.classList.remove("error");
        }
    }

// first and last name verification
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

// email verification
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

// message verification
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
    // display confirmation modal
    function showModalConfirmation () {
        const modal = document.getElementById("contact_modal");
        const modalConfirmation = document.getElementById("modal-confirmation");
        modal.style.display = "none";
        modalConfirmation.style.display = "flex";
    }



    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            let formIsValid = true;

            if (!verifyInput(firstName)) formIsValid = false;
            if (!verifyInput(lastName)) formIsValid = false;
            if (!verifyEmail(email)) formIsValid = false;
            if (!verifyMessage(message)) formIsValid = false;

            if (formIsValid) {
                showModalConfirmation();
            }
        });
    } else {
        console.error("Le formulaire n'a pas été trouvé dans le document.");
    }
});
