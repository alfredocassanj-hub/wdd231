import { fetchJSON } from "./data.js";
import { renderCards } from "./render.js";
import { openModal } from "./modal.js";
import { load, save } from "./storage.js";

const list = document.querySelector("#results");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const sortSelect = document.querySelector("#sort");
const favOnly = document.querySelector("#favourites-only");
const count = document.querySelector("#count");

let items = [];
let favourites = load("favourites", []);
const saved = load("guideFilters", { search: "", category: "all", sort: "name", favOnly: false });

searchInput.value = saved.search;
categorySelect.value = saved.category;
sortSelect.value = saved.sort;
favOnly.checked = saved.favOnly;

const order = { high: 0, medium: 1, low: 2 };

function update() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = items
    .filter((item) => categorySelect.value === "all" || item.category === categorySelect.value)
    .filter((item) => !favOnly.checked || favourites.includes(item.id))
    .filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(term))
    .sort((a, b) =>
      sortSelect.value === "risk"
        ? order[a.severity] - order[b.severity] || a.name.localeCompare(b.name)
        : a.name.localeCompare(b.name)
    );

  renderCards(list, filtered, favourites);
  count.textContent = `Showing ${filtered.length} of ${items.length} items`;
  save("guideFilters", {
    search: searchInput.value,
    category: categorySelect.value,
    sort: sortSelect.value,
    favOnly: favOnly.checked,
  });
}

list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const id = Number(button.dataset.id);

  if (button.dataset.action === "details") {
    openModal(items.find((item) => item.id === id), button);
  } else {
    favourites = favourites.includes(id)
      ? favourites.filter((fav) => fav !== id)
      : [...favourites, id];
    save("favourites", favourites);
    update();
    list.querySelector(`[data-action="favourite"][data-id="${id}"]`)?.focus();
  }
});

[searchInput, categorySelect, sortSelect, favOnly].forEach((control) =>
  control.addEventListener(control.type === "search" ? "input" : "change", update)
);

async function init() {
  const data = await fetchJSON("data/signs.json");
  if (!data) {
    list.innerHTML = `<p class="error" role="alert">Sorry, the guide could not be loaded. Please check your connection and try again.</p>`;
    count.textContent = "";
    return;
  }
  items = data.items;
  update();
}

init();
