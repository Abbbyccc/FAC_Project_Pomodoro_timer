const timeDisplay = document.querySelector('#time-display')
const breakTimeDisplay = document.querySelector('#break-time-display')
const pomodoroTimer = document.querySelector('#pomodoro-timer')
const breakTimer = document.querySelector('#break-timer')

const startBtn = document.querySelector('#start-btn')
const pauseBtn = document.querySelector('#pause-btn')
const resetBtn = document.querySelector('#reset-btn')

let timer = null
let minutes
let seconds = 0

pomodoroTimer.addEventListener('click', () => {
    resetPomo()
    timeDisplay.classList.remove('hidden')
    breakTimeDisplay.classList.add('hidden')
    const startMinutes = document.querySelector('#time-minutes').innerHTML
    minutes = startMinutes
    startBtn.setAttribute('onclick', 'pomodoro()')
    resetBtn.setAttribute('onclick', 'resetPomo()')
})

breakTimer.addEventListener('click', () => {
    resetbreak()
    timeDisplay.classList.add('hidden')
    breakTimeDisplay.classList.remove('hidden')
    pomodoroTimer.classList.remove('pomodoro-clicked')
    breakTimer.classList.add('break-clicked')
    const breakMinutes = document.querySelector('#break-minutes').innerHTML
    minutes = breakMinutes
    startBtn.setAttribute('onclick', 'breakTime()')
    resetBtn.setAttribute('onclick', 'resetbreak()')
})

pomodoroTimer.click()
function pomodoro() {
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
                alarmActivate()
                breakTimer.click()
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

function breakTime() {
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
                alarmActivate()
                pomodoroTimer.click()
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


function resetPomo() {
    clearInterval(timer)
    minutes = 25
    seconds = 0
    let m = minutes < 10 ? '0' + minutes : minutes
    let s = seconds < 10 ? '0' + seconds : seconds
    timeDisplay.innerHTML = `<span id="time-minutes">${m}</span>:${s}`
    timer = null

}

function resetbreak() {
    clearInterval(timer)
    minutes = 5
    seconds = 0
    let m = minutes < 10 ? '0' + minutes : minutes
    let s = seconds < 10 ? '0' + seconds : seconds
    breakTimeDisplay.innerHTML = `<span id="break-minutes">${m}</span>:${s}`
    timer = null
}

function alarmActivate() {
    const audio = new Audio('alarming.m4r')
    audio.play()
    setTimeout(function () { alert("Extraction is finished"); }, 500);
}