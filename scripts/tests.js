// JavaScript source code
// Invisibile Technologies JS Weather App
// Author: Jason K Swanson
// Date: 01/06/2020

class Test {
    constructor() {}

    test1() {
        console.log('Test1')
        document.getElementById('data').value = 'New York, 10005, Tokyo, São Paulo, Pluto'
        document.getElementById('submit').click()
    }

    test2() {
        console.log('Test2')
        document.getElementById('data').value = 'Clearwater, 33760, San Francisco, Rijeka, Hollidaysburg, 16648'
        document.getElementById('submit').click()
    }

    test3() {
        console.log('Test3')
        document.getElementById('data').value = 'Clearwater, 33760, sfgd2, Los Angeles, lkjhg'
        document.getElementById('submit').click()
    }

    test4() {
        console.log('Test2')
        document.getElementById('data').value = 'sfgd2, San Francisco, 94016 , Hollidaysburg, 16648'
        document.getElementById('submit').click()
    }
}

document.getElementById('test1').onclick = function() {
    const test = new Test()
    test.test1()
}

document.getElementById('test2').onclick = function() {
    const test = new Test()
    test.test2()
}

document.getElementById('test3').onclick = function() {
    const test = new Test()
    test.test3()
}

document.getElementById('test4').onclick = function() {
    const test = new Test()
    test.test4()
}