import { places } from "../data/discover.mjs";

const container = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");
const dialog = document.querySelector("#place-dialog");

/* ---------- Cards ---------- */
function buildCard(place, index) {
  const card = document.createElement("section");
  card.classList.add("card");
  card.style.gridArea = `card${index + 1}`;

  const title = document.createElement("h2");
  title.textContent = place.name;

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = place.image;
  img.alt = place.name;
  img.width = 300;
  img.height = 200;
  img.loading = "lazy";
  figure.appendChild(img);

  const address = document.createElement("address");
  address.textContent = place.address;

  const description = document.createElement("p");
  description.textContent = place.description;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Learn more";
  button.addEventListener("click", () => openDialog(place));

  card.append(title, figure, address, description, button);
  return card;
}

places.forEach((place, index) => {
  container.appendChild(buildCard(place, index));
});

/* ---------- Dialog (Learn more) ---------- */
function openDialog(place) {
  dialog.innerHTML = `
    <h2>${place.name}</h2>
    <p>${place.address}</p>
    <p>${place.description}</p>
    <button type="button" id="close-dialog">Close</button>
  `;
  dialog.showModal();
  dialog.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
}

/* ---------- Last visit message ---------- */
function showVisitMessage() {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const now = Date.now();
  let lastVisit = null;

  try {
    lastVisit = Number(localStorage.getItem("lastVisit")) || null;
  } catch (error) {
    lastVisit = null;
  }

  let text;
  if (!lastVisit) {
    text = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - lastVisit) / MS_PER_DAY);
    if (days < 1) {
      text = "Back so soon! Awesome!";
    } else {
      text = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
  }

  visitMessage.innerHTML = `
    <p>${text}</p>
    <button type="button" aria-label="Close message">✕</button>
  `;
  visitMessage.querySelector("button").addEventListener("click", () => {
    visitMessage.hidden = true;
  });
  visitMessage.hidden = false;

  try {
    localStorage.setItem("lastVisit", String(now));
  } catch (error) {
    /* storage unavailable, ignore */
  }
}

showVisitMessage();