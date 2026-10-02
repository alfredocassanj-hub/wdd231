/* ==========================================
   KUBATA
   MAIN JAVASCRIPT
========================================== */

const menuButton = document.querySelector("#menu-button");
const siteNav = document.querySelector("#site-nav");
const currentYear = document.querySelector("#current-year");
const featuredServices = document.querySelector("#featured-services");

/* ==========================================
   HAMBURGER MENU
========================================== */

if (menuButton && siteNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen.toString()
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}

/* ==========================================
   CURRENT YEAR
========================================== */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* ==========================================
   LOAD FEATURED SERVICES
========================================== */

async function loadServices() {

    if (!featuredServices) {
        return;
    }

    try {

        const response = await fetch("data/services.json");

        if (!response.ok) {
            throw new Error("Unable to load services data.");
        }

        const services = await response.json();

        displayFeaturedServices(services.slice(0, 6));

    } catch (error) {

        console.error("Error loading services:", error);

        featuredServices.innerHTML = `
            <p class="loading-message">
                Sorry, the services could not be loaded.
            </p>
        `;
    }
}

/* ==========================================
   DISPLAY FEATURED SERVICES
========================================== */

function displayFeaturedServices(services) {

    featuredServices.innerHTML = "";

    services.forEach((provider) => {

        const card = document.createElement("article");

        card.classList.add("service-card");

        card.innerHTML = `
            <span class="service-category">
                ${provider.category}
            </span>

            <h3>
                ${provider.service}
            </h3>

            <p class="service-provider">
                Provider: ${provider.name}
            </p>

            <p class="service-location">
                ${provider.location}
            </p>

            <p class="service-description">
                ${provider.description}
            </p>

            <p class="service-rating">
                ★ ${provider.rating}
            </p>

            <p class="service-price">
                ${provider.price}
            </p>

            <div class="card-actions">

                <a
                    href="contact.html?service=${encodeURIComponent(provider.service)}"
                    class="service-button"
                >
                    Contact
                </a>

            </div>
        `;

        featuredServices.appendChild(card);
    });
}

loadServices();