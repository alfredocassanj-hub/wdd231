import { fetchJSON } from "./data.js";
import { load, save } from "./storage.js";

const box = document.querySelector("#quiz");
const bestScore = document.querySelector("#best-score");
let questions = [];
let index = 0;
let score = 0;

const showBest = () => {
  const best = load("bestScore", null);
  bestScore.textContent = best === null ? "No score yet. Take the quiz!" : `Your best score: ${best} / ${questions.length}`;
};

function showQuestion() {
  const q = questions[index];
  box.innerHTML = `
    <p class="progress">Question ${index + 1} of ${questions.length}</p>
    <fieldset>
      <legend>${q.q}</legend>
      ${q.options
        .map((option, i) => `<label class="option"><input type="radio" name="answer" value="${i}"> ${option}</label>`)
        .join("")}
    </fieldset>
    <p id="feedback" role="status"></p>
    <button type="button" class="btn" id="check">Check answer</button>`;

  const check = box.querySelector("#check");
  check.addEventListener("click", () => {
    const chosen = box.querySelector("input[name='answer']:checked");
    if (!chosen) {
      box.querySelector("#feedback").textContent = "Please choose an answer.";
      return;
    }
    const correct = Number(chosen.value) === q.answer;
    if (correct) score++;
    box.querySelector("#feedback").textContent = `${correct ? "Correct!" : "Not quite."} ${q.explain}`;
    box.querySelectorAll("input").forEach((input) => (input.disabled = true));
    check.textContent = index === questions.length - 1 ? "See results" : "Next question";
    check.replaceWith(check.cloneNode(true));
    box.querySelector("#check").addEventListener("click", () => {
      index++;
      index < questions.length ? showQuestion() : showResult();
    });
  });
}

function showResult() {
  const best = load("bestScore", 0);
  if (score > best) save("bestScore", score);
  box.innerHTML = `
    <h2>Your result: ${score} / ${questions.length}</h2>
    <p>${score >= 8 ? "Excellent! You know the road rules well." : score >= 5 ? "Good effort. Review the guide and try again." : "Keep learning. Read the guide and try again."}</p>
    <button type="button" class="btn" id="restart">Try again</button>`;
  box.querySelector("#restart").addEventListener("click", start);
  showBest();
}

function start() {
  index = 0;
  score = 0;
  showQuestion();
}

async function init() {
  const data = await fetchJSON("data/quiz.json");
  if (!data) {
    box.innerHTML = `<p class="error" role="alert">Sorry, the quiz could not be loaded. Please try again later.</p>`;
    return;
  }
  questions = data.questions;
  showBest();
  start();
}

init();
