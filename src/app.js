// Themain app.js

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express configuration
const indexDirectoryPath = path.join(__dirname, '../Public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// set up Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// set up static directory to serve
app.use(express.static(indexDirectoryPath))

// home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        body: 'Weather App'
    })
})

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        body: 'This a dynamic About Page'
    })
})


// help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        body: 'This a dynamic Help Page'
    })
})


// weather page
app.get('/weather', (req, res) => {
    console.log('Weather Forecast App Started')
    
    // if no request is made
    if(!req.query.address) {

        // render the 'notFound' page
        return res.render('notFound', {
            title: 'Address Not Entered',
            error: 'Please Enter the Address'
        })
    }

    // when the request is made, obtain coordinates of place
    geocode(req.query.address, (error, geoResponse) => {
        
        // if no coordinates found of the enetered place
        if(error) {
            return res.send({
                title: 'Address not Found',
                error: error
            })
        } else {
            // obtain forecast for the place using its coordinates
            forecast(geoResponse.latitude, geoResponse.longitude, (error, response) => {
                
                // if an error occurs
                if(error) {
                    return res.send({
                        title: 'Address not Found',
                        error: error
                    })
                } else {
                    
                    // return an object if forecast found
                    return res.send({
                        title: 'Forecast',
                        body: 'Weather Report',
                        location: geoResponse.location,
                        summary: response.summary,
                        temperature: response.temperature,
                        precipProbability: response.precipProbability
                    })
                }
            })
        }
    })
})

// wrong help page
app.get('/help*', (req, res) => {
    res.render('notFound', {
        title: 'HELP Error 404',
        body: 'Help Page not Found'
    })
})


// any other address that is not defined
app.get('/*', (req, res) => {
    res.render('notFound', {
        title: 'Error 404',
        body: 'Page not Found'
    })
})

// start the app at port 3000
app.listen(3000, () => {
    console.log("App started")
})