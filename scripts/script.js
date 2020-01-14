// ASYNC FUNCTION LES GO
(function () {
    document.getElementById('submit').addEventListener('click', function() {
        axiosRequest().catch(error => {
            console.log(error);
        });
    });
})();

// async function for fetching url
async function axiosRequest() {

    // my Id, always the same
    const myWeatherAppId = '&APPID=1315d1ad0799dca3ca95161a1d5776e7&units=metric';

    // response
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=Antwerp,be' + myWeatherAppId);

    // split array
    let arrayOfImportantInfo = splitObjectIntoFive(response.data);

    // get averages
    let averagesOfEachDay = getAveragesOfAllDays(arrayOfImportantInfo);

    // add values in array to bootstrap cards
    addInfoToCards(averagesOfEachDay);

    console.log(response.data, arrayOfImportantInfo, averagesOfEachDay);
}

// function to split object into 5 arrays
function splitObjectIntoFive(weatherObj) {

    // set variables and empty array for a new object
    let today = [], tomorrow = [], todayPlusTwo = [], todayPlusThree = [], todayPlusFour = [];
    let splitArray = [today, tomorrow, todayPlusTwo, todayPlusThree, todayPlusFour];
    let currentFullDay = new Date();

    // compare dates, use difference factor to determine day, then organize
    for (let x = 0; x < weatherObj.list.length; x++) {

        let comparableDate = new Date(weatherObj.list[x].dt * 1000);
        let factorOfComparableDate = Math.abs(comparableDate.getDay() - currentFullDay.getDay());

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
function getAveragesOfAllDays(unorganizedArray) {

    let arrayOfAverages = [];

    for (let x = 0; x < 5; x++) {

        // setting variables we need
        let averageMaxTemp = 0;
        let averageMinTemp = 0;
        let averageWind = 0;
        let averageHumidity = 0;

        // loop through stuff here and add numbers
        for (let y = 0; y < unorganizedArray[x].length; y++) {
            averageMaxTemp += unorganizedArray[x][y].main.temp_max;
            averageMinTemp += unorganizedArray[x][y].main.temp_min;
            averageWind += unorganizedArray[x][y].wind.speed;
            averageHumidity += unorganizedArray[x][y].main.humidity;
        }

        averageMaxTemp /= unorganizedArray[x].length;
        averageMinTemp /= unorganizedArray[x].length;
        averageWind /= unorganizedArray[x].length;
        averageHumidity /= unorganizedArray[x].length;

        let dailyObject = new DailyWeatherObject(averageMaxTemp, averageMinTemp, averageWind, averageHumidity);
        arrayOfAverages.push(dailyObject);

    }
    return arrayOfAverages;
}

// Function to add info to cards
function addInfoToCards(averagesArray) {



    for (x = 0; x < 5; x++) {

        // clone template of cards
        let unclonedCardTemplate = document.getElementById('cardTemplate');
        let cardTemplate = unclonedCardTemplate.content.cloneNode(true);

        cardTemplate.querySelector('#max-temp').innerHTML = averagesArray[x].tempMax;
        cardTemplate.querySelector('#min-temp').innerHTML = averagesArray[x].tempMin;
        cardTemplate.querySelector('#wind-speed').innerHTML = averagesArray[x].wind;
        cardTemplate.querySelector('#humidity').innerHTML = averagesArray[x].humidity;

        document.getElementById('card-deck').appendChild(cardTemplate);


    }
    console.log(averagesArray);
}
// Class for new Weather Objects
class DailyWeatherObject {
    constructor(newTempMax, newTempMin, newWind, newHumidity) {
        this.tempMax = newTempMax;
        this.tempMin = newTempMin;
        this.wind = newWind;
        this.humidity = newHumidity;
    }
}


