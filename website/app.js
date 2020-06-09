/* Global Variables */
baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="
weatherAPICred = "565b1249b81bd6f98e11a0464a1d9af5";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//GET request to weather api
const getWeather = async (baseURL, zip, weatherAPICred) => {
    const res = await fetch(baseURL+zip+",us"+"&appid="+weatherAPICred, {
        method: 'GET'
    });
    try {
        let data = await res.json();
        return data;
    } catch (error) {
        console.log("error:", error);
    }
}

//POST request calling server.js to store weather data
const postData = async ( url = '', data = {}) => {
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

    try {
		const newData = await response.json();
		return newData;
    }catch(error) {
    console.log("error", error);
    }
};

//Async request used to update UI
const updateUI = async() => {
	const req = await fetch('/getWeather');
    try {

    	dateUI = document.getElementById("date");
		tempUI = document.getElementById("temp");
		contentUI = document.getElementById("content");

        const weatherData = await req.json();
        console.log(weatherData);
        dateUI.innerHTML = "Date: " + weatherData.date;
        tempUI.innerHTML = "Temperature: " + weatherData.temperature;
        contentUI.innerHTML = "Feeling: " + weatherData.userResponse;
    } catch(error) {

        console.log('error', error);
    }
};

//EventListener assigned to button
document.querySelector("#generate").addEventListener('click', function(){
	let zip = document.querySelector('#zip').value;
	let feeling = document.querySelector('#feelings').value;
	getWeather(baseURL, zip, weatherAPICred)
		.then(function(data){
			postData('/addWeather', {temperature:data.main.temp,date:newDate,userResponse:feeling});
		}).then(updateUI())
});
