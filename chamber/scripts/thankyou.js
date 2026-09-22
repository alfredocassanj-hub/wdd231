// ==============================
// THANK YOU PAGE
// ==============================

// Get the information from the URL
const params = new URLSearchParams(window.location.search);


// Get the submitted form values
const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const timestamp = params.get("timestamp");


// Display the submitted information
document.querySelector("#display-first-name").textContent =
    firstName || "Not provided";

document.querySelector("#display-last-name").textContent =
    lastName || "Not provided";

document.querySelector("#display-email").textContent =
    email || "Not provided";

document.querySelector("#display-phone").textContent =
    phone || "Not provided";

document.querySelector("#display-organization").textContent =
    organization || "Not provided";

document.querySelector("#display-timestamp").textContent =
    timestamp || "Not provided";