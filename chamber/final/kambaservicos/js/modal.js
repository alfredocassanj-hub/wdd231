/* ==========================================
   KUBATA
   ACCESSIBLE SERVICE MODAL
========================================== */

const modal =
    document.querySelector("#service-modal");

const modalBody =
    document.querySelector("#modal-body");

const modalClose =
    document.querySelector("#modal-close");


export function openServiceModal(service) {

    if (!modal || !modalBody) {
        return;
    }

    modalBody.innerHTML = `

        <span class="service-category">
            ${service.category}
        </span>

        <h2 id="modal-title">
            ${service.service}
        </h2>

        <div class="modal-details">

            <p>
                <strong>Provider:</strong>
                ${service.name}
            </p>

            <p>
                <strong>Location:</strong>
                ${service.location}
            </p>

            <p>
                <strong>Description:</strong>
                ${service.description}
            </p>

            <p>
                <strong>Rating:</strong>
                ★ ${service.rating}
            </p>

            <p>
                <strong>Price:</strong>
                ${service.price}
            </p>

            <p>
                <strong>Phone:</strong>
                ${service.phone}
            </p>

            <a
                href="tel:${service.phone}"
                class="primary-button"
            >
                Call Provider
            </a>

        </div>
    `;

    modal.showModal();

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        () => modal.close()
    );

}


if (modal) {

    modal.addEventListener(
        "click",
        (event) => {

            if (event.target === modal) {
                modal.close();
            }

        }
    );

}