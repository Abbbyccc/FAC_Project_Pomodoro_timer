const timeDisplay = document.querySelector('.time-disply')

describe('check if time can display properly', () => {
    test('link time to the function', () => {
        start()
        return equal(timeDisplay.innerHTML, '25:00')
    })
})