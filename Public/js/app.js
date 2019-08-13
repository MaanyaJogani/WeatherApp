// This app.js is to get the details of the form in index.hbs
// and to also display the response of the request made by the user


// get elements from form
const place = document.querySelector('#place');
const getWeather = document.querySelector('#get-weather');
const result = document.querySelector('#result');
const heading = document.querySelector('#heading');
const cardFooter = document.querySelector('.card-footer')
const loading = document.querySelector('#loading');
const locationLabel = document.querySelector('#location-label');

//*******************************************************************************************************************
//*******************************************************************************************************************
//*******************************************************************************************************************


// Listen for form submission in two ways: 
// 1. Add event listener to the 'Get Weather' button
getWeather.addEventListener('click', (e) => onsubmit(e) );
// 2. Add event listener to the textbox and listen for 'Enter'
place.addEventListener('keyup', (e) => {
    if(e.keyCode == 13) {
        onsubmit(e);
    }
});

//*******************************************************************************************************************
//*******************************************************************************************************************
//*******************************************************************************************************************

// define the function after submission
const onsubmit = (e) => {
    loading.style.display = 'block';        
    heading.textContent = 'Weather App';
    result.style.display = 'none';
    cardFooter.style.display = 'none';

    // display the loading gif while the data is fetched
    loading.innerHTML = `
        <div  class="row">
            <div class="col text-center justify-content-center">
                <img src="/img/loading.gif" alt="">
            </div>
        </div>
    `; 

    // check if the textbox is empty or not
    if(place.value) {
        
        // fetch data from the weather page
        fetch(`http://localhost:3000/weather?address=${place.value}`)
            .then((response) => {
                response.json()
                    .then((data) => {
                        if(data.error) {
                            showAlert(data.error);      // alert message on error
                        }
                        else {
                            paint(data);                // display result on success
                        }
                    })
            })
            .catch((error) => {                         // alert message on error fetching data
                showAlert(error);
            })
        place.value = '';                               // reset the textbox after click
    } else {
        // if nothing is entered
        showAlert('Enter a location to get results');
    }
    // prevent from reloading the page
    e.preventDefault();
}

//*******************************************************************************************************************
//*******************************************************************************************************************
//*******************************************************************************************************************

// paint the UI to display result
const paint = (data) => {
    heading.textContent = data.location;
    locationLabel.textContent = 'Enter another Location';
    loading.style.display = 'none';                         // stop loading gif
    cardFooter.style.display = 'block';                     // display form
    result.style.display = 'block';                         // display result
    result.innerHTML = `
    <hr>
    <div class="row">
        <div class="col-sm-4 text-center">
            <span class="font-weight-bold"> Summary:  </span>
        </div>
        <div class="col text-center">
            ${data.summary}
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-sm-4 text-center">
            <span class="font-weight-bold"> Temperature:  </span>
        </div>
        <div class="col text-center">
            ${data.temperature} &deg;C
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-sm-4 text-center">
            <span class="font-weight-bold"> Precipitation:  </span>
        </div>
        <div class="col text-center">
            ${data.precipProbability} %
        </div>
    </div>
    <hr>
    <p align='center' class='text-success font-weight-bold'> Try Again? </p>
    
    `;
}

//*******************************************************************************************************************
//*******************************************************************************************************************
//*******************************************************************************************************************

// display alert message on error
const showAlert = (message) => { 
    cardFooter.style.display = 'block';                             // display form
    heading.textContent = 'Weather App';                            // reset the heading
    loading.style.display = 'none';                                 // stop the loading gif
    
    const presentAlert = document.querySelector('.alert-new');

    // check if alert is not already present
    if(!presentAlert) {
        
        const div = document.createElement('div');                  // Create div
        
        div.className = `alert alert-danger alert-new p-2 m-2`;     // Add classes
        
        div.appendChild(document.createTextNode(message));          // Add text
        
        const container = document.querySelector('.card');          // Get parent

        container.insertBefore(div, cardFooter);                    // Insert alert

        // Remove alert after 3 sec
        setTimeout(function(){
        document.querySelector('.alert-new').remove();
        }, 3000);
    } 
}