const express = require('express');
const cors = require('cors');
const app = express();
const weather = require('./weatherData');

//cors because our frontend is on a different port
app.use(cors());

//knex - delete if not used in this file
const knexfile = require('./knexfile').development;
const knex = require('knex')(knexfile);

//passport and sessions
const session = require('express-session');
const passport = require('./auth/passport-config');

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
	session({
		secret: 'ExpectoPatronum',
		resave: false,
		saveUninitialized: false,
	})
)

app.use(passport.initialize());
app.use(passport.session());

const getWeather = city => {

  if (weather[city]) {
    return weather[city]
  } else {
    return null;
  }
}

//routes
const authRoutes = require('./routers/auth');
app.use('/auth', authRoutes);

const homeRoutes = require('./routers/home');
app.use('/', homeRoutes);

app.get("/weather/:city", (req, res) => {
  const city = req.params.city.toLowerCase();
  const weatherData = getWeather(city);

  if (weatherData) {
    res.json(weatherData)
  } else {
    res.status(404).json({ error: 'Weather data not found' });
  }
});

app.listen(8000, () => {
  console.log('Server listening on port 8000!')
});