const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const knexfile = require('../knexfile').development;
const knex = require('knex')(knexfile);

//defines how user object is stored in a session
passport.serializeUser((user, done) => {
  console.log('serialized! user is ', user);
  done(null, user.id);
});

//takes id stored in the session and retrieves corresponding user from the database
passport.deserializeUser(async (id, done) => {
  console.log('deserializing');
  const user = await knex('users').where({ id }).first();
  return user ? done(null, user) : done(null, false);
})

//local signup configuration
passport.use('local-signup', new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  async (req, email, password, done) => {

    const emailExists = await knex('users').where({ email }).first();
    if (emailExists) {
      return done(null, false, {
        message: "This email has already been used to create an account"
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let newUser = {
      password: hash,
      email: email,
    }

    let id = await knex('users').insert(newUser).returning('id');
    newUser.id = id[0].id;
    return done(null, newUser);
  }
));

// login configuration
passport.use('local-login', new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    const user = await knex('users').where({ email }).first();

    if (!user) {
      return done(null, false, {
        message: "Account does not exist"
      })
    }

    const result = await bcrypt.compare(password, user.password);
    return result ? done(null, user) : done(null, false, {
      message: "Incorrect Password"
    });
  }
));

module.exports = passport;