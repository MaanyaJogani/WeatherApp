const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    
    console.log('Forecast App Started');
    
    // url construction using the latitude and longitude of the place entered by the user
    const url = 'https://api.darksky.net/forecast/ed85403fdfd9350f4a01b7865abd11ef/' + encodeURIComponent(lattitude) + ',' + encodeURIComponent(longitude) + '?units=si';

    // fetching data from the above url in form of json objects
    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to forecast servers', undefined);
        } else if(body.error) {
            callback('Coordinates not found', undefined);
        } else {
            callback(undefined, {
                place: body.timezone,
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            });
        }  
    })

}

module.exports = forecast
