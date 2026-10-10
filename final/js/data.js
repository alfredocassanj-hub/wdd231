// Fetches JSON data and handles errors.
export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Could not load ${url}:`, error);
    return null;
  }
}
