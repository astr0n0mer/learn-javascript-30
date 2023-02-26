const timeLeft = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
let countdown;

buttons.forEach((button) =>
  button.addEventListener("click", () => {
    const timeInSeconds = parseInt(button.dataset.time);
    startTimer(timeInSeconds);
  })
);

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  startTimer(this.minutes.value * 60);
  this.reset();
});

function startTimer(seconds) {
  const start = Date.now(); // in milliseconds
  const end = start + seconds * 1e3;
  displayTimeLeft(seconds);
  displayEndTime(end);

  // if user changes timer when previous one is already running, clear the previous one
  clearInterval(countdown);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((end - Date.now()) / 1e3);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(secondsLeft) {
  let h = Math.floor(secondsLeft / 3600);
  secondsLeft %= 3600;
  let m = Math.floor(secondsLeft / 60);
  let s = secondsLeft % 60;

  h = h ? h + ":" : "";
  m = (m < 10 ? "0" : "") + m + ":";
  s = (s < 10 ? "0" : "") + s;

  document.title = timeLeft.innerText = h + m + s;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  endTime.textContent = `Be back at ${end.toLocaleTimeString()}`;
}
