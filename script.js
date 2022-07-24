const timeDisplay = document.querySelector('#time-display')
const breakTimeDisplay = document.querySelector('#break-time-display')
const pomodoroTimer = document.querySelector('#pomodoro-timer')
const breakTimer = document.querySelector('#break-timer')

const startBtn = document.querySelector('#start-btn')

let timer = null
pomodoroTimer.addEventListener('click', () => {
    // pomodoroTimer.classList.add('pomodoro-clicked')
    // breakTimer.classList.remove('break-clicked')
    timeDisplay.classList.remove('hidden')
    breakTimeDisplay.classList.add('hidden')
    startBtn.onclick = pomodoroTimerCount()
})


breakTimer.addEventListener('click', () => {
    // breakTimer.classList.add('break-clicked')
    // pomodoroTimer.classList.remove('pomodoro-clicked')
    timeDisplay.classList.add('hidden')
    breakTimeDisplay.classList.remove('hidden')
    startBtn.onclick = breakTimerCount()
})


function pomodoroTimerCount() {
    let startMinutes = document.querySelector('#time-minutes').innerHTML
    let minutes = startMinutes
    let seconds = 0
    if (timer !== null) {
        return
    }
    timer = setInterval(() => {
        if (seconds >= 0) {
            seconds -= 1
            if (minutes > 0 && seconds == -1) {
                seconds = 59
                minutes--
            }
            if (minutes == 0 && seconds == -1) {
                const audio = new Audio('alarming.m4r')
                audio.play()
                return
            }
        } else if (minutes == 0 && seconds == -1) {
            return
        }
        let m = minutes < 10 ? '0' + minutes : minutes
        let s = seconds < 10 ? '0' + seconds : seconds
        timeDisplay.innerHTML = `<span id="time-minutes">${m}</span>:${s}`
    }, 1000)
}

function breakTimerCount() {
    let startMinutes = document.querySelector('#break-minutes').innerHTML
    let minutes = startMinutes
    let seconds = 0
    if (timer !== null) {
        return
    }
    timer = setInterval(() => {
        if (seconds >= 0) {
            seconds -= 1
            if (minutes > 0 && seconds == -1) {
                seconds = 59
                minutes--
            }
            if (minutes == 0 && seconds == -1) {
                const audio = new Audio('alarming.m4r')
                audio.play()
                return
            }
        } else if (minutes == 0 && seconds == -1) {
            return
        }
        let m = minutes < 10 ? '0' + minutes : minutes
        let s = seconds < 10 ? '0' + seconds : seconds
        breakTimeDisplay.innerHTML = `<span id="break-minutes">${m}</span>:${s}`
    }, 1000)
}



function pause() {
    clearInterval(timer)
    timer = null
}

function reset() {
    clearInterval(timer)
    minutes = 25
    seconds = 0
    let m = minutes < 10 ? '0' + minutes : minutes
    let s = seconds < 10 ? '0' + seconds : seconds
    timeDisplay.innerHTML = `<span id="time-minutes">${m}</span>:${s}`
    breakTimeDisplay.innerHTML = `<span id="break-minutes">${m}</span>:${s}`
}