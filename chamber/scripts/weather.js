// weather.js
// Weather section for the Benguela Chamber of Commerce home page
// Uses the OpenWeatherMap API: current weather + 5-day/3-hour forecast

const API_KEY = "PUT_YOUR_API_KEY_HERE";
const LAT = -12.5763; // Benguela, Angola
const LON = 13.4055;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecastList = document.querySelector("#forecast");

function buildUrl(endpoint) {
  return `${BASE_URL}/${endpoint}?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
}

async function fetchJson(endpoint) {
  const response = await fetch(buildUrl(endpoint));
  if (!response.ok) {
    throw new Error(`${endpoint} request failed with status ${response.status}`);
  }
  return response.json();
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Shift a UTC timestamp (in seconds) by the city's timezone offset so that
// the getUTC* methods and toISOString() return the city's local time.
function toLocalDate(seconds, offset) {
  return new Date((seconds + offset) * 1000);
}

function displayCurrent(current) {
  currentTemp.textContent = Math.round(current.main.temp);
  weatherDesc.textContent = capitalize(current.weather[0].description);
}

// The forecast has one entry every 3 hours. Keep one entry per day: the one
// closest to noon local time. Returns 3 days starting from the current date
// (if today has no entries left, it starts from tomorrow).
function pickDailyForecast(forecast) {
  const days = new Map();

  forecast.list.forEach((item) => {
    const local = toLocalDate(item.dt, forecast.city.timezone);
    const key = local.toISOString().slice(0, 10);

    const distance = Math.abs(local.getUTCHours() - 12);
    const best = days.get(key);

    if (!best || distance < best.distance) {
      days.set(key, { key, local, distance, temp: item.main.temp });
    }
  });

  return [...days.values()].slice(0, 3);
}

function displayForecast(days, todayKey) {
  forecastList.replaceChildren();

  days.forEach((day) => {
    const name =
      day.key === todayKey
        ? "Today"
        : day.local.toLocaleDateString("en-US", {
            weekday: "long",
            timeZone: "UTC",
          });

    const item = document.createElement("li");
    item.innerHTML = `<span>${name}</span> <strong>${Math.round(day.temp)}&deg;C</strong>`;
    forecastList.appendChild(item);
  });
}

async function loadWeather() {
  try {
    const [current, forecast] = await Promise.all([
      fetchJson("weather"),
      fetchJson("forecast"),
    ]);

    const todayKey = toLocalDate(current.dt, current.timezone)
      .toISOString()
      .slice(0, 10);

    displayCurrent(current);
    displayForecast(pickDailyForecast(forecast), todayKey);
  } catch (error) {
    console.error("Weather error:", error);
    currentTemp.textContent = "--";
    weatherDesc.textContent = "Weather is unavailable right now.";
    forecastList.textContent = "";
  }
}

loadWeather();