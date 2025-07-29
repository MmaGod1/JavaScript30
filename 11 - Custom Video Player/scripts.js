const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const enlargeBtn = player.querySelector(".fullscreen");

function play() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
  //console.log(icon);
}

function skip() {
  // console.log(this.dataset);
  video.currentTime += parseFloat(this.dataset.skip);
}

function upadateRange() {
  // console.log(this);
  // console.log(this.name, this.value);
  video[this.name] = this.value;
}

function updateProgressBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(event) {
  //  console.log(e);
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function fullscreen() {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function updateFullscreenIcon() {
  enlargeBtn.textContent = document.fullscreenElement
    ? "fullscreen_exit"
    : "fullscreen";
}

video.addEventListener("clic}k", play);
toggle.addEventListener("click", play);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", updateProgressBar);

skipButtons.forEach((button) => button.addEventListener("click", skip));
enlargeBtn.addEventListener("click", fullscreen);
document.addEventListener("fullscreenchange", updateFullscreenIcon);
ranges.forEach((range) => range.addEventListener("change", upadateRange));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub);
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
