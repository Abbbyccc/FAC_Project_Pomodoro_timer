const timeDisplay = document.querySelector('#time-display')
const breakTimeDisplay = document.querySelector('#break-time-display')
const pomodoroTimer = document.querySelector('#pomodoro-timer')
const breakTimer = document.querySelector('#break-timer')

const startBtn = document.querySelector('#start-btn')
const resetBtn = document.querySelector('#reset-btn')

const pomodoroSetting = document.querySelector('#pomodoro-setting')
const breakSetting = document.querySelector('#break-setting')

const pomodoroSettingform = document.querySelector('#time-form')
const breakSettingform = document.querySelector('#break-time-form')


let timer = null
let minutes
let seconds = 0

pomodoroTimer.addEventListener('click', () => {
    resetPomo()
    timeDisplay.classList.remove('hidden')
    breakTimeDisplay.classList.add('hidden')

    breakSettingform.classList.add('hidden')
    pomodoroSettingform.classList.remove('hidden')

    let startMinutes = document.querySelector('#time-minutes')
    pomodoroSetting.addEventListener('click', (event) => {
        event.preventDefault()
        settingTime = document.forms["time-form"].timers;
        minutes = Number(settingTime.value)
        startMinutes.innerHTML = minutes
        seconds = 0
    })

    startBtn.setAttribute('onclick', 'pomodoro()')
    resetBtn.setAttribute('onclick', 'resetPomo()')
})

breakTimer.addEventListener('click', () => {
    resetbreak()
    timeDisplay.classList.add('hidden')
    breakTimeDisplay.classList.remove('hidden')

    breakSettingform.classList.remove('hidden')
    pomodoroSettingform.classList.add('hidden')

    pomodoroTimer.classList.remove('pomodoro-clicked')
    breakTimer.classList.add('break-clicked')
    const breakMinutes = document.querySelector('#break-minutes')
    breakSetting.addEventListener('click', (event) => {
        event.preventDefault()
        settingTime = document.forms["break-time-form"]['break-timer'];
        minutes = Number(settingTime.value)
        breakMinutes.innerHTML = minutes
        seconds = 0
    })

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
                const audio = new Audio('alarming.m4r')
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
    pomodoroTimer.click()
}

function resetbreak() {
    clearInterval(timer)
    minutes = 5
    seconds = 0
    let m = minutes < 10 ? '0' + minutes : minutes
    let s = seconds < 10 ? '0' + seconds : seconds
    breakTimeDisplay.innerHTML = `<span id="break-minutes">${m}</span>:${s}`
    timer = null
    breakTimer.click()
}

