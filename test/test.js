const timeDisplaytest = document.querySelector('.time-disply')

describe('check if time can display properly', () => {
    test('link time to the function', () => {
        return equal(timeDisplaytest.innerHTML, '25:00')
    })
})