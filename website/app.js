const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=75858e7b6b96544194f04c1527152ab6';

// Date instance dynamically with JS
let d = new Date();
let date = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// get weather data from the API, api.openweathermap.org
const getWeatherData = async (baseURL, zip, apiKey) => {
  const res = await fetch(`${baseURL}${zip}${apiKey}`);
  let weatherData;
  try {
    weatherData = await res.json();
  }  catch (error) {
    console.error(error);
  }
  return weatherData;
};

// POST the data
const postData = async (url = '', data = {}) => {

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    });

  try {
    const newData = await res.json();
    return newData;

  } catch(error) {
    console.log('error', error);
  }
};

// GET Project Data
const updateUI = async () => {

  const req = await fetch('/all');

  try {
    const allData = await req.json();
    document.getElementById('date').innerHTML = 'Date: ' + allData.date;
    document.getElementById('temp').innerHTML = 'Temperature: ' +allData.temp + ' °F';
    document.getElementById('content').innerHTML = 'I feel: ' +allData.feeling;
  } catch(error) {
    console.log('error', error);
  }
}

// click function
const handleClick = async () => {
  const zip =  document.getElementById('zip').value;
  const feeling = document.getElementById('feelings').value;
  const weatherData = await getWeatherData(baseURL, zip, apiKey);

  try {
    const { main: { temp }, name, weather } = weatherData;
    const postResult = await postData('/post', { 
      temp,
      feeling,
      date,
    });
    if (postResult) {
      updateUI(); 
    }
  } catch(error) {
  		alert("Please enter a valid zip code");
  	}
}

// Add event listener
document.getElementById('generate').addEventListener('click', handleClick);