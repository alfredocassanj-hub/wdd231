// ==============================
// JOIN PAGE
// ==============================

// Set the current date and time
const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}


// ==============================
// MEMBERSHIP MODALS
// ==============================

const modalLinks = document.querySelectorAll(".membership-card a");

const closeButtons = document.querySelectorAll(".close-modal");


// Open the correct modal
modalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const modalId = link.getAttribute("href");
        const modal = document.querySelector(modalId);

        if (modal) {
            modal.showModal();
        }
    });
});


// Close the modal
closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});