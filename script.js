const timeDisplay = document.querySelector('.time-disply')


let timer = null
let minutes = 25
let seconds = 0

function start() {
    if (timer !== null) {
        return
    }
    timer = setInterval(countdown, 1000)
}

function countdown() {
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
    timeDisplay.innerHTML = `${m}:${s}`
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
    timeDisplay.innerHTML = `${m}:${s}`
}