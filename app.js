const express = require('express');
const cors = require('cors');
const app = express();

const weather = require('./weatherData');

const getWeather = city => {

  if (weather[city]) {
    return weather[city]
  } else {
    return null;
  }
}

app.use(cors());

app.get("/weather/:city", (req, res) => {
  const city = req.params.city.toLowerCase();
  const weatherData = getWeather(city);

  if (weatherData) {
    res.json(weatherData)
  } else {
    res.status(404).json({ error: 'Weather data not found ' });
  }
});

app.listen(8000, () => {
  console.log('Server listening on port 8000!')
});