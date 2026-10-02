function displayFeaturedServices(services) {

    featuredServices.innerHTML = "";

    const categoryImages = {
        Plumbing: "images/plumbing.jpg",
        Electrical: "images/electrical.jpg",
        Cleaning: "images/cleaning.jpg",
        Construction: "images/construction.jpg",
        Transport: "images/transport.jpg"
    };

    services.forEach((provider) => {

        const card = document.createElement("article");

        card.classList.add("service-card");

        const image = categoryImages[provider.category] || "images/plumbing.jpg";

        card.innerHTML = `
            <img
                src="${image}"
                alt="${provider.category} service - ${provider.service}"
                loading="lazy"
                width="600"
                height="400"
            >

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