(function () {

    document.getElementById('Submit').addEventListener('click', function() {
        queryWebsite().catch(error => {
            console.log(error);
        });
    });

})();

async function queryWebsite() {

    const axios = require('axios');

    const response = await axios.get('api.openweathermap.org/data/2.5/forecast?id=524901&appid=1315d1ad0799dca3ca95161a1d5776e7')
    console.log(response);
}
