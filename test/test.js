const timeDisplaytest = document.querySelector('.time-disply')

describe('check if time can display properly', () => {
    test('link time to the function', () => {
        start()
        return equal(timeDisplaytest.innerHTML, '25:00')
    })
})