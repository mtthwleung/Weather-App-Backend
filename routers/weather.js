const router = require("express").Router();
const weather = require("../data/weatherData");

const getWeather = (city) => {
	if (weather[city]) {
		return weather[city];
	} else {
		return null;
	}
};

router.get("/:city", (req, res) => {
	const city = req.params.city.toLowerCase();
	const weatherData = getWeather(city);

	if (weatherData) {
		res.json(weatherData);
	} else {
		res.status(404).json({ error: "Weather data not found" });
	}
});

module.exports = router;