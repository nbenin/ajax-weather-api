// ASYNC FUNCTION LES GO
(function () {
    document.getElementById('submit').addEventListener('click', function() {

        // setting variables
        const myWeatherAppId = '315d1ad0799dca3ca95161a1d5776e7';

        axiosRequest().catch(error => {
            console.log(error);
        });
    });
})();

// async function for fetching url
async function axiosRequest() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto/');
    console.log(response);
}



