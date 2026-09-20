// spotlights.js
// Shows 3 random gold or silver members on the chamber home page

const membersUrl = "data/members.json";
const cardsContainer = document.querySelector("#spotlight-cards");

// membership: 3 = Gold, 2 = Silver (1 = regular member, never spotlighted)
const levelNames = { 2: "Silver", 3: "Gold" };
const SPOTLIGHT_COUNT = 3;

// Fisher-Yates shuffle (returns a new array)
function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createCard(company) {
  const level = levelNames[company.membership];
  const phoneLink = company.phone.replace(/\s/g, "");
  const siteName = new URL(company.website).hostname;

  const card = document.createElement("article");
  card.className = `spotlight-card ${level.toLowerCase()}`;

  card.innerHTML = `
    <h3>${company.name}</h3>
    <p class="tagline">${company.category}</p>
    <img
      src="images/${company.image}"
      alt="${company.name} logo"
      width="96"
      height="96"
      loading="lazy"
    >
    <p class="level">${level} Member</p>
    <address>${company.address}</address>
    <p><a href="tel:${phoneLink}">${company.phone}</a></p>
    <p>
      <a href="${company.website}" target="_blank" rel="noopener noreferrer">
        ${siteName}
      </a>
    </p>
  `;

  return card;
}

async function displaySpotlights() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) {
      throw new Error(`members.json request failed with status ${response.status}`);
    }

    const data = await response.json();

    const eligible = data.companies.filter(
      (company) => levelNames[company.membership]
    );

    const picks = shuffle(eligible).slice(0, SPOTLIGHT_COUNT);

    cardsContainer.replaceChildren(...picks.map(createCard));
  } catch (error) {
    console.error("Spotlights error:", error);
    cardsContainer.textContent = "Featured members are unavailable right now.";
  }
}

displaySpotlights();
