const express = require('express');
const cors = require('cors');
const app = express();

//dummy data
const weather = {
	london: {
		day0: {
			temperature: 20,
			lowTemp: 18,
			highTemp: 24,
			weather: "Sunny",
			humidity: 60,
			precipitation: 50,
		},
		day1: {
			temperature: 20,
			lowTemp: 16,
			highTemp: 22,
			weather: "Cloudy",
			humidity: 70,
			precipitation: 80,
		},
		day2: {
			temperature: 19,
			lowTemp: 17,
			highTemp: 21,
			weather: "Cloudy",
			humidity: 80,
			precipitation: 70,
		},
		day3: {
			temperature: 17,
			lowTemp: 13,
			highTemp: 19,
			weather: "Rainy",
			humidity: 90,
			precipitation: 100,
		},
	},
	tokyo: {
		day0: {
			temperature: 27,
			lowTemp: 30,
			highTemp: 24,
			weather: "Rainy",
			humidity: 100,
			precipitation: 100,
		},
		day1: {
			temperature: 27,
			lowTemp: 25,
			highTemp: 32,
			weather: "Cloudy",
			humidity: 90,
			precipitation: 50,
		},
		day2: {
			temperature: 30,
			lowTemp: 27,
			highTemp: 33,
			weather: "Sunny",
			humidity: 80,
			precipitation: 30,
		},
		day3: {
			temperature: 33,
			lowTemp: 28,
			highTemp: 34,
			weather: "Sunny",
			humidity: 90,
			precipitation: 20,
		},
	},
};

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