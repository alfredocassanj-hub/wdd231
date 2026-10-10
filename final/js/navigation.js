// Hamburger menu, wayfinding and footer dates (used on every page).
const button = document.querySelector("#menu-button");
const nav = document.querySelector("#site-nav");

button.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  button.setAttribute("aria-expanded", String(open));
  button.textContent = open ? "✕" : "☰";
});

// Wayfinding: mark the link that matches the current page.
const current = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("#site-nav a").forEach((link) => {
  if (link.getAttribute("href") === current) {
    link.setAttribute("aria-current", "page");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#modified").textContent = document.lastModified;
