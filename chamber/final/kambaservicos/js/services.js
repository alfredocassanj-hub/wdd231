/* ==========================================
   KUBATA
   SERVICES PAGE
========================================== */

import {
    isFavorite,
    toggleFavorite
} from "./storage.js";

import {
    openServiceModal
} from "./modal.js";


/* ==========================================
   ELEMENTOS DA PÁGINA
========================================== */

const container =
    document.querySelector("#services-container");

const searchInput =
    document.querySelector("#service-search");

const categoryFilter =
    document.querySelector("#category-filter");

const locationFilter =
    document.querySelector("#location-filter");

const resultsCount =
    document.querySelector("#results-count");

const favoritesButton =
    document.querySelector("#favorites-only");

const menuButton =
    document.querySelector("#menu-button");

const siteNav =
    document.querySelector("#site-nav");

const currentYear =
    document.querySelector("#current-year");


/* ==========================================
   VARIÁVEIS
========================================== */

let allServices = [];

let showFavoritesOnly = false;


/* ==========================================
   MENU HAMBURGER
========================================== */

if (menuButton && siteNav) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            siteNav.classList.toggle("open");

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

        menuButton.textContent =
            isOpen ? "✕" : "☰";

    });

}


/* ==========================================
   ANO ATUAL
========================================== */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* ==========================================
   IMAGEM POR CATEGORIA
========================================== */

function getCategoryImage(category) {

    const images = {

        Plumbing:
            "images/Plumbing.jpg",

        Electrical:
            "images/Electrical.jpg",

        Cleaning:
            "images/Cleaning.jpg",

        Construction:
            "images/Construction.jpg",

        Transport:
            "images/Transport.jpg"

    };

    return (
        images[category] ||
        "images/Plumbing.jpg"
    );

}


/* ==========================================
   CARREGAR SERVIÇOS
========================================== */

async function loadServices() {

    try {

        const response =
            await fetch("data/services.json");

        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }

        allServices =
            await response.json();

        readURLParameters();

        renderServices(
            getFilteredServices()
        );

    } catch (error) {

        console.error(
            "Error loading services:",
            error
        );

        container.innerHTML = `
            <p class="loading-message">
                We could not load the services.
                Please try again later.
            </p>
        `;

        resultsCount.textContent =
            "Unable to load services.";

    }

}


/* ==========================================
   LER PARÂMETROS DA URL
========================================== */

function readURLParameters() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const category =
        params.get("category");

    const search =
        params.get("search");


    if (category) {

        categoryFilter.value =
            category;

    }


    if (search) {

        searchInput.value =
            search;

    }

}


/* ==========================================
   FILTRAR SERVIÇOS
========================================== */

function getFilteredServices() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();

    const category =
        categoryFilter.value;

    const location =
        locationFilter.value;


    const filtered =
        allServices.filter(
            (service) => {

                const matchesSearch =

                    service.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    service.service
                        .toLowerCase()
                        .includes(search)

                    ||

                    service.description
                        .toLowerCase()
                        .includes(search);


                const matchesCategory =

                    category === "all"

                    ||

                    service.category === category;


                const matchesLocation =

                    location === "all"

                    ||

                    service.location === location;


                const matchesFavorite =

                    !showFavoritesOnly

                    ||

                    isFavorite(service.id);


                return (

                    matchesSearch &&

                    matchesCategory &&

                    matchesLocation &&

                    matchesFavorite

                );

            }
        );


    return filtered;

}


/* ==========================================
   MOSTRAR SERVIÇOS
========================================== */

function renderServices(services) {

    container.innerHTML = "";


    resultsCount.textContent =
        `${services.length} service provider${services.length === 1 ? "" : "s"} found`;


    if (services.length === 0) {

        container.innerHTML = `
            <p class="loading-message">
                No services match your search.
            </p>
        `;

        return;

    }


    const cards =
        services.map(
            (service) =>
                createServiceCard(service)
        );


    container.innerHTML =
        cards.join("");


    attachCardEvents();

}


/* ==========================================
   CRIAR CARD DO SERVIÇO
========================================== */

function createServiceCard(service) {

    const favorite =
        isFavorite(service.id);


    const image =
        getCategoryImage(
            service.category
        );


    return `

        <article class="service-card">

            <img
                src="${image}"
                alt="${service.category} service - ${service.service}"
                loading="lazy"
                width="600"
                height="400"
            >

            <span class="service-category">
                ${service.category}
            </span>

            <h3>
                ${service.service}
            </h3>

            <p class="service-provider">
                Provider: ${service.name}
            </p>

            <p class="service-location">
                ${service.location}
            </p>

            <p class="service-description">
                ${service.description}
            </p>

            <p class="service-rating">
                ★ ${service.rating}
            </p>

            <p class="service-price">
                ${service.price}
            </p>

            <div class="card-actions">

                <button
                    type="button"
                    class="favorite-button ${favorite ? "active" : ""}"
                    data-favorite="${service.id}"
                    aria-label="${favorite ? "Remove from favorites" : "Add to favorites"}"
                    aria-pressed="${favorite}"
                >
                    ${favorite ? "★" : "☆"}
                </button>

                <button
                    type="button"
                    class="service-button details-button"
                    data-id="${service.id}"
                >
                    View Details
                </button>

            </div>

        </article>

    `;

}


/* ==========================================
   EVENTOS DOS CARDS
========================================== */

function attachCardEvents() {


    /* --------------------------------------
       BOTÕES DE DETALHES
    -------------------------------------- */

    const detailButtons =
        document.querySelectorAll(
            ".details-button"
        );


    detailButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );


                    const service =
                        allServices.find(
                            (item) =>
                                item.id === id
                        );


                    if (service) {

                        openServiceModal(
                            service
                        );

                    }

                }
            );

        }
    );


    /* --------------------------------------
       BOTÕES DE FAVORITOS
    -------------------------------------- */

    const favoriteButtons =
        document.querySelectorAll(
            ".favorite-button"
        );


    favoriteButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.favorite
                        );


                    toggleFavorite(id);


                    renderServices(
                        getFilteredServices()
                    );

                }
            );

        }
    );

}


/* ==========================================
   PESQUISA
========================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            renderServices(
                getFilteredServices()
            );

        }
    );

}


/* ==========================================
   FILTRO DE CATEGORIA
========================================== */

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        () => {

            renderServices(
                getFilteredServices()
            );

        }
    );

}


/* ==========================================
   FILTRO DE LOCALIZAÇÃO
========================================== */

if (locationFilter) {

    locationFilter.addEventListener(
        "change",
        () => {

            renderServices(
                getFilteredServices()
            );

        }
    );

}


/* ==========================================
   FILTRO DE FAVORITOS
========================================== */

if (favoritesButton) {

    favoritesButton.addEventListener(
        "click",
        () => {

            showFavoritesOnly =
                !showFavoritesOnly;


            favoritesButton.textContent =

                showFavoritesOnly

                    ? "Show All Services"

                    : "Show Favorites";


            renderServices(
                getFilteredServices()
            );

        }
    );

}


/* ==========================================
   INICIAR
========================================== */

loadServices();