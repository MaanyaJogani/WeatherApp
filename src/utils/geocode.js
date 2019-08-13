// return latitude and longitude of a given address
const request = require('request')

const geocode = (address, callback) => {

    console.log('GeoCode Started')

    // construction of url using the name of place entered by the user
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFhbnlhaiIsImEiOiJjanl0czlveDcwNzk2M2hvZDl0Yzk0eGc5In0.NDphg6IRt107mLSH0kG46w&limit=1';
    
    // fetching data from the url in form of json objects
    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to the weather server. Please Connect to the Internet', undefined)
        }
        else if(body.features.length === 0) {
            callback('Unable to find location. Please enter another Address', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
            })
        } 
    })
}

module.exports = geocode