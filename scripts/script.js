// ASYNC FUNCTION LES GO
(function () {
    document.getElementById('submit').addEventListener('click', function() {
        axiosRequest().catch(error => {
            console.log(error);
        });
        backgroundImage().catch(error => {
            console.log(error);
        })
    });
})();

// Async for background Image, thanks Erick!!
async function backgroundImage() {
    let countryInput = document.getElementById('formCityInput').value;
    let response = await fetch('https://api.unsplash.com/search/photos?query=$' + countryInput + '&client_id=8b3303518e733b03bb9fbe890041915da381de31ef0602ad71dc8adfd4b79f83');
    let data = await response.json();
    let countryImage = data['results'][0]['urls']['regular'];
    document.body.style.backgroundImage = 'url' + "('" + countryImage + "')";
}

// Async function for fetching url
async function axiosRequest() {

    // Get user values and my ID
    let city = document.getElementById('formCityInput').value;
    let country = document.getElementById('formCountryInput').value;
    const myWeatherAppId = '&APPID=1315d1ad0799dca3ca95161a1d5776e7&units=metric';

    // Response
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + country + myWeatherAppId);

    // Split array
    let splitArray = splitObject(response.data);

    // Get averages
    let dailyAverage = getAverages(splitArray);

    // Add values in array to bootstrap cards
    addInfoToCards(dailyAverage);

    console.log(response.data, splitArray, dailyAverage);
}

// Function to split object into 5 arrays
function splitObject(weatherObj) {

    // Set variables and empty array for a new object
    let today = [], tomorrow = [], todayPlusTwo = [], todayPlusThree = [], todayPlusFour = [];
    let splitArray = [today, tomorrow, todayPlusTwo, todayPlusThree, todayPlusFour];
    let currentDay = new Date();

    // Compare dates, use difference factor to determine day, then organize
    for (let x = 0; x < weatherObj.list.length; x++) {

        let comparableDate = new Date(weatherObj.list[x].dt * 1000);
        let factorOfComparableDate = comparableDate.getDay() - currentDay.getDay();

        if (factorOfComparableDate < 0) {
            factorOfComparableDate += 7;
        }

        switch (factorOfComparableDate) {
            case 0:
                today.push(weatherObj.list[x]);
                break;
            case 1:
                tomorrow.push(weatherObj.list[x]);
                break;
            case 2:
                todayPlusTwo.push(weatherObj.list[x]);
                break;
            case 3:
                todayPlusThree.push(weatherObj.list[x]);
                break;
            case 4:
                todayPlusFour.push(weatherObj.list[x]);
                break;
            case 5:
                break;
        }
    }
    return splitArray;
}

// Function to get averages
function getAverages(organizedArray) {

    let arrayOfAverages = [];

    for (let x = 0; x < 5; x++) {

        // Setting variables we need
        let maxTemp = 0;
        let minTemp = 0;
        let averageWind = 0;
        let averageHumidity = 0;
        let weatherConditions;
        let mainCondition;
        let day;

        // Loop through stuff here and add averages to objects
        for (let y = 0; y < organizedArray[x].length; y++) {
            if (maxTemp < organizedArray[x][y].main.temp_max || y === 0) {
                maxTemp = organizedArray[x][y].main.temp_max;
            }
            if (minTemp > organizedArray[x][y].main.temp_min || y === 0) {
                minTemp = organizedArray[x][y].main.temp_min;
            }
            averageWind += organizedArray[x][y].wind.speed * 3.6;
            averageHumidity += organizedArray[x][y].main.humidity;
            weatherConditions = organizedArray[x][y].weather[0].description;
            mainCondition = organizedArray[x][y].weather[0].main;
            day = new Date(organizedArray[x][y].dt * 1000).getDay();
        }

        averageWind = (Math.round(averageWind / organizedArray[x].length * 10) / 10);
        averageHumidity = Math.round(averageHumidity / organizedArray[x].length * 10) / 10;

        let dailyObject = new DailyWeatherObject(maxTemp, minTemp, averageWind, averageHumidity, weatherConditions, mainCondition, day);
        arrayOfAverages.push(dailyObject);

    }
    return arrayOfAverages;
}

// Function to add info to cards
function addInfoToCards(averagesArray) {

    // If there are cards already, remove them
    if (document.getElementsByClassName('card').length > 0) {
        let cards = document.getElementsByClassName('card');
        for (x = 0; x < 5; x++) {
            document.getElementById('card-deck').removeChild(cards[0]);
        }
    }

    // Loop through object array and add relevant info
    for (x = 0; x < 5; x++) {

        // Clone template of cards and append
        let unclonedCardTemplate = document.getElementById('cardTemplate');
        let cardTemplate = unclonedCardTemplate.content.cloneNode(true);
        let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        cardTemplate.querySelector('#max-temp').innerHTML = 'High: ' + averagesArray[x].tempMax + '&#8451';
        cardTemplate.querySelector('#min-temp').innerHTML = 'Low: ' + averagesArray[x].tempMin + '&#8451';
        cardTemplate.querySelector('#wind-speed').innerHTML = 'Wind Speed: ' + averagesArray[x].wind + 'km/h';
        cardTemplate.querySelector('#humidity').innerHTML = 'Humidity: ' + averagesArray[x].humidity + '%';
        cardTemplate.querySelector('#dayName').innerHTML = daysOfWeek[averagesArray[x].day];

        document.getElementById('card-deck').appendChild(cardTemplate);

    }
}

// Class for new Weather Objects
class DailyWeatherObject {
    constructor(newTempMax, newTempMin, newWind, newHumidity, newDescription, newMain, newDay) {
        this.tempMax = newTempMax;
        this.tempMin = newTempMin;
        this.wind = newWind;
        this.humidity = newHumidity;
        this.description = newDescription;
        this.main = newMain;
        this.day = newDay;
    }
}


