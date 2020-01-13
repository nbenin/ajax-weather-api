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

    // get medians
    let mediansOfEachDay = getMediansOfAllDays(arrayOfImportantInfo);

    // add values in array to bootstrap cards

    console.log(response.data, arrayOfImportantInfo, mediansOfEachDay);
}


// Function to get medians
function getMediansOfAllDays(unorganizedArray) {

    let arrayOfMedians = [];

    for (let x = 0; x < 5; x++) {

        // setting variables we need
        let medianMaxTemp = 0;
        let medianMinTemp = 0;
        let medianWind = 0;
        let medianHumidity = 0;

        // loop through stuff here and add numbers
        for (let y = 0; y < unorganizedArray[x].length; y++) {
            medianMaxTemp += unorganizedArray[x][y].main.temp_max;
            medianMinTemp += unorganizedArray[x][y].main.temp_min;
            medianWind += unorganizedArray[x][y].wind.speed;
            medianHumidity += unorganizedArray[x][y].main.humidity;
        }

        medianMaxTemp /= unorganizedArray[x].length;
        medianMinTemp /= unorganizedArray[x].length;
        medianWind /= unorganizedArray[x].length;
        medianHumidity /= unorganizedArray[x].length;

        let dailyObject = new DailyWeatherObject(medianMaxTemp, medianMinTemp, medianWind, medianHumidity);
        arrayOfMedians.push(dailyObject);

    }
    return arrayOfMedians;
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
        let factorOfComparableDate = comparableDate.getDate() - currentFullDay.getDate();

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

// Class for new Weather Objects
class DailyWeatherObject {
    constructor(newTempMax, newTempMin, newWind, newHumidity) {
        this.tempMax = newTempMax;
        this.tempMin = newTempMin;
        this.wind = newWind;
        this.humidity = newHumidity;
    }
}


