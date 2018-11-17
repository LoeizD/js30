let countdown;
const timerDisplay = document.querySelector('.timer')
const back = document.querySelector('.back')
const buttons = document.querySelectorAll('nav > div')


function timer(seconds) {
    clearInterval(countdown)

    const now = Date.now()
    const then = now + (seconds * 1000)
    displayEndTime(then)
    displayTimeLeft(seconds)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        console.log(secondsLeft);
        
        if (secondsLeft <= 0) {
            clearInterval(countdown)
        }
        displayTimeLeft(secondsLeft)
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds/60)
    const secondsUp = seconds % 60
    const timeLeft = `${minutes}:${secondsUp < 10 ? '0' : ""}${secondsUp}`
    timerDisplay.textContent = timeLeft
    document.title = timeLeft
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp)
    back.textContent = `Be back at ${end.getHours()}:${end.getMinutes() < 10? "0" : ""}${end.getMinutes()}:${end.getSeconds() < 10? "0" : ""}${end.getSeconds()}`

}

buttons.forEach(b => b.addEventListener('click', ()=> {
    console.log(b.getAttribute('data-time'));
    
    timer(b.getAttribute('data-time'))
}))
document.customForm.addEventListener('submit', e => {
    e.preventDefault()
    timer(document.customForm.minutes.value * 60)
    document.customForm.reset()
})