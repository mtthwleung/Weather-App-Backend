const express = require('express');
const cors = require('cors');
const app = express();

//cors because our frontend is on a different port
app.use(cors());

//knex - delete if not used in this file
const knexfile = require('./knexfile').development;
const knex = require('knex')(knexfile);

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//passport and sessions
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./auth/passport-config');
app.use(cookieParser());

app.use(
	session({
		secret: 'ExpectoPatronum',
		resave: false,
		saveUninitialized: false,
	})
)

app.use(passport.initialize());
app.use(passport.session());

//routes
const authRoutes = require('./routers/auth');
app.use('/auth', authRoutes);

const homeRoutes = require('./routers/home');
app.use('/', homeRoutes);

const weatherRoutes = require('./routers/weather');
app.use('/weather', weatherRoutes);



app.listen(8000, () => {
  console.log('Server listening on port 8000!')
});