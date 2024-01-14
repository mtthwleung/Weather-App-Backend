const express = require('express');
const app = express();

//dummy data
const londonWeather = {
  day0: {
    temperature: 20,
    lowTemp: 18,
    highTemp: 24,
    weather: 'sunny',
    humidity: 60,
    precipitation: 50
  },
  day1: {
    temperature: 20,
    lowTemp: 18,
    highTemp: 24,
    weather: 'sunny',
    humidity: 60,
    precipitation: 50
  },
  day2: {
    temperature: 20,
    lowTemp: 18,
    highTemp: 24,
    weather: 'sunny',
    humidity: 60,
    precipitation: 50
  },
  day3: {
    temperature: 20,
    lowTemp: 18,
    highTemp: 24,
    weather: 'sunny',
    humidity: 60,
    precipitation: 50
  },
}


app.listen(8000, () => {
  console.log('Server listening on port 8000!')
});