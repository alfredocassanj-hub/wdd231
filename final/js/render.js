// Builds the HTML for the sign/offence cards.
const labels = {
  warning: "Warning sign",
  prohibition: "Prohibition sign",
  mandatory: "Mandatory sign",
  offence: "Offence",
  documents: "Documents",
  emergency: "Emergency",
};

export const categoryLabel = (key) => labels[key] ?? key;

export function cardTemplate(item, isFavourite) {
  return `
    <article class="card severity-${item.severity}">
      <img src="${item.image}" alt="" width="120" height="120" loading="lazy">
      <div class="card-body">
        <h3>${item.name}</h3>
        <p class="meta"><span class="tag">${categoryLabel(item.category)}</span>
          <span class="tag level">Risk: ${item.severity}</span></p>
        <p>${item.description}</p>
        <div class="actions">
          <button type="button" class="btn" data-action="details" data-id="${item.id}">Details</button>
          <button type="button" class="btn secondary" data-action="favourite" data-id="${item.id}"
            aria-pressed="${isFavourite}">${isFavourite ? "★ Saved" : "☆ Save"}</button>
        </div>
      </div>
    </article>`;
}

export function renderCards(container, items, favourites) {
  if (items.length === 0) {
    container.innerHTML = `<p class="empty">No results found. Try another search or filter.</p>`;
    return;
  }
  container.innerHTML = items
    .map((item) => cardTemplate(item, favourites.includes(item.id)))
    .join("");
}
