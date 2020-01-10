//const myWeatherAppId = '315d1ad0799dca3ca95161a1d5776e7';

// Make a request for a user with a given ID
axios.get('https://pokeapi.co/api/v2/pokemon/ditto/')
    .then(function (response) {
// handle success
        console.log(response);
    })
    .catch(function (error) {
// handle error
        console.log(error);
    })
    .finally(function () {
// always executed
    });



