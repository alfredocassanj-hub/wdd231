const container = document.querySelector("#directory-container");
const gridButton = document.querySelector("#grid-btn");
const listButton = document.querySelector("#list-btn");

const membershipLabels = {
  1: "Membro",
  2: "Prata",
  3: "Ouro",
};

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    displayMembers(data.companies);
  } catch (error) {
    container.innerHTML = `<p class="loading-msg">Não foi possível carregar os membros. Tente novamente mais tarde.</p>`;
    console.error("Erro ao carregar members.json:", error);
  }
}

function displayMembers(companies) {
  container.innerHTML = "";

  companies.forEach((company) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${company.image}" alt="Logótipo de ${company.name}" loading="lazy" width="72" height="72" />
      <div class="member-card-body">
        <span class="badge member-${company.membership}">${membershipLabels[company.membership]}</span>
        <h2>${company.name}</h2>
        <p>${company.address}</p>
        <p>${company.phone}</p>
        <p>${company.category}</p>
        <a class="website" href="${company.website}" target="_blank" rel="noopener">Visitar site</a>
      </div>
    `;

    container.appendChild(card);
  });
}

gridButton.addEventListener("click", () => {
  container.classList.remove("list-view");
  container.classList.add("grid-view");
  gridButton.classList.add("active");
  gridButton.setAttribute("aria-pressed", "true");
  listButton.classList.remove("active");
  listButton.setAttribute("aria-pressed", "false");
});

listButton.addEventListener("click", () => {
  container.classList.remove("grid-view");
  container.classList.add("list-view");
  listButton.classList.add("active");
  listButton.setAttribute("aria-pressed", "true");
  gridButton.classList.remove("active");
  gridButton.setAttribute("aria-pressed", "false");
});

getMembers();
