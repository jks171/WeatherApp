// JavaScript source code
// Invisibile Technologies JS Weather App
// Author: Jason K Swanson
// Date: 01/06/2020

class Location {

    constructor () {
        this._city = null
        this._zip = null
        this._currentWeather = null
        this._currentTime = null
    }

    get city() {
        return this._city
    }
    set city(val) {
        this._city = val
    }

    get zip() {
        return this._zip
    }
    set zip(val) {
        this._zip = val
    }

    get currentWeather() {
        return this._currentWeather
    }
    set currentWeather(val) {
        this._currentWeather = val
    }

    get currentTime() {
        return this._currentTime
    }
    set currentTime(val) {
        this._currentTime = val
    }

    _logToConsole = function() {
        const formattedZip = this._zip != null ? ', ' + this._zip : ''
        console.log(this._city + formattedZip + ' : Weather -> ' + this._currentWeather +
            ': Time -> ' + this._currentTime)
    }

    _retrieveLocationData = function() {
        const request = new XMLHttpRequest()

        if(this._city != null && this._zip == null) {
            request.open('GET', WorldWeatherAPI.apiWeatherBaseAddress + this._city + 
                '&num_of_days=1&format=json&fx=no&showlocaltime=yes&key=' + WorldWeatherAPI.apiKey)
        }
        else{
            if(this._zip != null) {
                request.open('GET', WorldWeatherAPI.apiWeatherBaseAddress + this._zip +
                    '&num_of_days=1&format=json&fx=no&showlocaltime=yes&key=' + WorldWeatherAPI.apiKey)
            }
        }

        const self = this
        request.onload = function() {
            if(request.status == 200){
                const apiWeatherJSON = JSON.parse(this.response)
                if(apiWeatherJSON.data.error == undefined) {

                    self._currentWeather = apiWeatherJSON.data.current_condition[0].temp_F + ' \xB0F, ' +
                        apiWeatherJSON.data.current_condition[0].weatherDesc[0].value

                    const localDate = new Date();
                    const localUtc = localDate.getTime() + (localDate.getTimezoneOffset() * 1000 * 60)
                    const desiredDate =
                        new Date(localUtc + parseInt(apiWeatherJSON.data.time_zone[0].utcOffset) * 1000 * 60 * 60)
                    self._currentTime = desiredDate.toLocaleTimeString()
                    
                }
                else {
                    self._currentWeather = apiWeatherJSON.data.error[0].msg
                    self._currentTime = apiWeatherJSON.data.error[0].msg.replace('weather location to', 'time for')
                }
            }
            else {
                self._currentWeather = 'Location Currently Unavailable'
                self._currentTime = 'Location Currently Unavailable'
            }
            self._logToConsole()
        }
        request.send()
    }

    retrieveCurrentWeatherAndTime() {
        this._retrieveLocationData()
    } 
}

class WorldWeatherAPI {
    constructor() {}

    static get apiKey() {
        return 'e9a905ea18264f348a821316200601'
    }
    static get apiWeatherBaseAddress() {
        return 'http://api.worldweatheronline.com/premium/v1/weather.ashx?q='
    }
    static get apiTimeZoneBaseAddress() {
        return 'http://api.worldweatheronline.com/premium/v1/tz.ashx?q='
    }
}

class Utilities {
    static ParseInputData(data) {
        const result = []
        try {
            const inputArray = data.split(',')
            var index = 0
            while(index < inputArray.length){
                const location = new Location()
                location.city = inputArray[index].trim()
                index++

                if(index < inputArray.length){
                    
                    const nextValue = inputArray[index]
                    if(!isNaN(nextValue)) {
                        location.zip = nextValue.trim()
                        index++
                    }
                }
                location.retrieveCurrentWeatherAndTime()
                result.push(location)
            }
            return result
        }
        catch(err) {
            return 'The input data could not be parsed: ' + err
        }
    }
}

document.getElementById('submit').onclick = function() {
    Utilities.ParseInputData(document.getElementById('data').value)
}


