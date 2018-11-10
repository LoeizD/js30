console.log("hello ZORLD")

const player = document.querySelector('.player__controls')
const video = document.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

// Functions
function togglePlay () {
    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}
function updateButton() {
    toggle.textContent = this.paused? "▶" : "▋▋"
}
function skip () {
    video.currentTime += parseFloat(this.dataset.skip)
}
function handleRangeUpdate() {
    video[this.name] = this.value
}
function handleProgress() {
    const percent = 100 * (video.currentTime / video.duration)
    progressBar.setAttribute("style",`width:${percent}%`);
}
function scrub(e) {
    const scrubTime = video.duration * e.offsetX / progress.offsetWidth
    video.currentTime = scrubTime;
    // console.log(e);
}

// Event Listeners
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', e => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
