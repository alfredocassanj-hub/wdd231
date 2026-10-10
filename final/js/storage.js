// Small wrapper around localStorage with safe JSON handling.
export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (error) {
    console.error(`Could not read "${key}" from localStorage:`, error);
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Could not save "${key}" to localStorage:`, error);
  }
}
