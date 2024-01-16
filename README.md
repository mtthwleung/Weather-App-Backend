This application is used in conjunction with its [frontend](https://github.com/mtthwleung/Weather-App-Frontend)

This backend is built with Node.js and queries with a PostgreSQL database. Before setup, ensure that you have a database set up on Postgres, as well as a username and password.

To run the backend:
1. `npm install` to install dependencies
2. create a .env file in the main directory, with values for `DATABASE`, `USERNAME`, and `PASSWORD`. These should match their corresponding values on Postgres. For example
   DATABASE='weatherapp'
   USERNAME='testuser'
   PASSWORD='123abc'
3. Run `npx knex migrate:latest` to create a table in the database, used for storing user information.
4. Run `node app.js` or `node app` to start the server.

Unit Tests
There are currently unit tests for the routes in `weather.js` and `auth.js`.
The test for the weather routes passes, but the test for auth does not (the auth itself, however, works as intended)

To run the tests, run either `npx jest weather.test.js` or `npx jest auth.test.js`.
