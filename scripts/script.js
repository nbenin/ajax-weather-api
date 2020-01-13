// ASYNC FUNCTION LES GO
(function () {
    document.getElementById('submit').addEventListener('click', function() {

        // my Id, always the same
        const myWeatherAppId = '&APPID=1315d1ad0799dca3ca95161a1d5776e7&units=metric';

        axiosRequest(myWeatherAppId).catch(error => {
            console.log(error);
        });
    });
})();



// async function for fetching url
async function axiosRequest(myWeatherAppId) {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=London,uk' + myWeatherAppId);

    let arrayOfImportantInfo = splitObjectIntoFive(response.data);


    console.log(response.data, arrayOfImportantInfo);
}



// function to split object into 5 arrays
function splitObjectIntoFive(weatherObj) {

    // set variables and empty array for a new object
    let today = [], tomorrow = [], todayPlusTwo = [], todayPlusThree = [], todayPlusFour = [];
    let betterFormattedObj = [today, tomorrow, todayPlusTwo, todayPlusThree, todayPlusFour];
    let currentFullDay = new Date();
    //let currentHourMultipleOfThree = Math.floor(currentHours / 3) * 3;

    // looping through object and separating into 5 new objects with the info we need
    for (let x = 0; x < weatherObj.list.length; x++) {

        // compare dates, use difference factor to determine day, then organize
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
    return betterFormattedObj;
}



// Class for new Weather Objects
class WeatherObject {
    constructor(newDate, newTempMax, newTempMin, newPrecipitation, newWind, newHumidity) {
        this.date = newDate;
        this.tempMax = newTempMax;
        this.tempMin = newTempMin;
        this.precipitation = newPrecipitation;
        this.wind = newWind;
        this.humidity = newHumidity;
    }
}


