const timeDisplay = document.querySelector('#time-display')
const breakTimeDisplay = document.querySelector('#break-time-display')
const pomodoroTimer = document.querySelector('#pomodoro-timer')
const breakTimer = document.querySelector('#break-timer')

const startBtn = document.querySelector('#start-btn')
const resetBtn = document.querySelector('#reset-btn')

const timeSettingBtn = document.querySelector('#time-setting')

let timer = null
let minutes
let seconds = 0

pomodoroTimer.addEventListener('click', () => {
    resetPomo()
    timeDisplay.classList.remove('hidden')
    breakTimeDisplay.classList.add('hidden')

    startBtn.setAttribute('onclick', 'pomodoro()')
    resetBtn.setAttribute('onclick', 'resetPomo(event)')
})

breakTimer.addEventListener('click', () => {
    resetbreak()
    timeDisplay.classList.add('hidden')
    breakTimeDisplay.classList.remove('hidden')

    startBtn.setAttribute('onclick', 'breakTime()')
    resetBtn.setAttribute('onclick', 'resetbreak()')
})

pomodoroTimer.click()

function timeSetting(event) {
    event.preventDefault()
    settingTime = document.forms["time-form"].timers;
    settingBreakTime = document.forms["time-form"]['break-timer'];
    const startMinutes = document.querySelector('#time-minutes')
    const breakMinutes = document.querySelector('#break-minutes')
    let bm = settingTime.value < 10 ? '0' + settingTime.value : settingTime.value
    let sm = settingBreakTime.value < 10 ? '0' + settingBreakTime.value : settingBreakTime.value
    startMinutes.innerHTML = bm
    breakMinutes.innerHTML = sm
}

function pomodoro() {
    const audio = new Audio('src/click_sound.wav')
    audio.play()
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
                const audio = new Audio('src/alarming.m4r')
                audio.play()
                setTimeout(function () { alert("Good Job! Have some rest"); }, 500);
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
    const audio = new Audio('src/click_sound.wav')
    audio.play()
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
                const audio = new Audio('src/alarming.m4r')
                audio.play()
                setTimeout(function () { alert("Let's go back to work!"); }, 500);
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
    const audio = new Audio('src/click_off.wav')
    audio.play()
    clearInterval(timer)
    timer = null
}

function resetPomo() {
    clearInterval(timer)
    timeSetting(event)
    let startMinutes = document.querySelector('#time-minutes')
    minutes = parseInt(startMinutes.innerHTML)
    seconds = 0
    let m = minutes < 10 ? '0' + minutes : minutes
    let s = seconds < 10 ? '0' + seconds : seconds
    timeDisplay.innerHTML = `<span id="time-minutes">${m}</span>:${s}`
    timer = null
    pomodoroTimer.click()
}

function resetbreak() {
    clearInterval(timer)
    timeSetting(event)
    const breakMinutes = document.querySelector('#break-minutes')
    minutes = parseInt(breakMinutes.innerHTML)
    seconds = 0
    let m = minutes < 10 ? '0' + minutes : minutes
    let s = seconds < 10 ? '0' + seconds : seconds
    breakTimeDisplay.innerHTML = `<span id="break-minutes">${m}</span>:${s}`
    timer = null
    breakTimer.click()
}
