const router = require('express').Router();
const passport = require('passport');

const knexfile = require('../knexfile').development;
const knex = require('knex')(knexfile);

//signup page
router.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {

    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    } 

    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.sendStatus(204);
    })

  })(req, res, next);
})

//login page
router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(400).json({ message: info.message })
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.sendStatus(204);
    })
  })(req, res, next);
})

//logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' })
    }
    res.sendStatus(204);
  });
})

module.exports = router;