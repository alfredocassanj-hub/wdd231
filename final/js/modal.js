// Accessible modal built on the native <dialog> element.
import { categoryLabel } from "./render.js";

const dialog = document.querySelector("#detail-dialog");
const content = document.querySelector("#dialog-content");
let opener = null;

export function openModal(item, triggerButton) {
  opener = triggerButton;
  content.innerHTML = `
    <img src="${item.image}" alt="" width="96" height="96">
    <h2 id="dialog-title">${item.name}</h2>
    <p><span class="tag">${categoryLabel(item.category)}</span>
       <span class="tag level">Risk: ${item.severity}</span></p>
    <h3>What it means</h3><p>${item.description}</p>
    <h3>What to do</h3><p>${item.whatToDo}</p>
    <h3>Penalty</h3><p>${item.penalty}</p>
    <p class="note">Fines and rules can change. Always confirm current amounts with the traffic authority.</p>`;
  dialog.showModal();
}

dialog.querySelector("#dialog-close").addEventListener("click", () => dialog.close());

// Close when clicking the dark backdrop.
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

// Return focus to the button that opened the dialog.
dialog.addEventListener("close", () => opener?.focus());
