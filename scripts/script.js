// ASYNC FUNCTION LES GO
(function () {
    document.getElementById('submit').addEventListener('click', function() {

        // setting variables
        const myWeatherAppId = '&APPID=1315d1ad0799dca3ca95161a1d5776e7&units=metric';

        axiosRequest(myWeatherAppId).catch(error => {
            console.log(error);
        });
    });
})();

// async function for fetching url
async function axiosRequest(myWeatherAppId) {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?q=London,uk' + myWeatherAppId);
    const currentFullDay = new Date();
    let arrayOfImportantInfo = splitObjectIntoFive(response.data);

    let currentYear = currentFullDay.getFullYear();
    let currentMonth = currentFullDay.getMonth();
    let currentDate = currentFullDay.getDate();
    let currentHours = currentFullDay.getHours();
    let currentHourMultipleOfThree = Math.floor(currentHours / 3) * 3;

    console.log(response.data, currentFullDay, currentYear, currentMonth, currentDate, currentHours, currentHourMultipleOfThree);
}

// function to split object into 5 arrays
function splitObjectIntoFive(weatherObj) {

    let betterFormattedObj = [];

    for (let x = 0; x > weatherObj.list.length; x++) {
        if (weatherObj.list[x])
    }
}

// Class for new Weather Objects
class weatherObject {
    constructor(date, tempMax, tempMin, precipitation, wind, humidity) {
        let newDate = this.date;
        let tempMaximum = this.tempMax;

    }
}


