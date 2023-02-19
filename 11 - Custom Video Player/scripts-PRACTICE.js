const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreenButton = player.querySelector(".player__fullscreen");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skipVideo));

ranges.forEach((range) => range.addEventListener("change", handleRangeInput));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeInput)
);

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

let isFullscreen = false;
fullscreenButton.addEventListener("click", toggleFullscreen);
[
  "fullscreenchange",
  "webkitfullscreenchange",
  "mozfullscreenchange",
  "msfullscreenchange",
].forEach((eventType) =>
  player.addEventListener(eventType, updateFullscreenStatus)
);

function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

function updatePlayButton() {
  toggle.textContent = this.paused ? "►" : "❚ ❚";
}

function skipVideo() {
  const skipSeconds = this.dataset.skip;
  video.currentTime += parseFloat(skipSeconds);
}

function handleRangeInput() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const areaPercent = e.offsetX / progress.offsetWidth;
  video.currentTime = areaPercent * video.duration;
}

function toggleFullscreen() {
  if (isFullscreen) {
    document.exitFullscreen();
  } else {
    player.requestFullscreen();
  }
}

function updateFullscreenStatus() {
  isFullscreen = !isFullscreen;
  fullscreenButton.textContent = isFullscreen ? "⤢" : "\u{26F6}";
}
