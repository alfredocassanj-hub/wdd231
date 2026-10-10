// Displays the submitted form data (read from the URL).
const params = new URLSearchParams(location.search);
const output = document.querySelector("#summary");
const fields = [
  ["name", "Name"],
  ["email", "Email"],
  ["area", "Neighbourhood"],
  ["type", "Type of problem"],
  ["message", "Description"],
];

if (!params.has("name")) {
  output.textContent = "No form data was received. Please use the report form on the home page.";
} else {
  const list = document.createElement("dl");
  fields.forEach(([key, label]) => {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = params.get(key) || "-";
    list.append(dt, dd);
  });
  output.replaceChildren(list);
}
