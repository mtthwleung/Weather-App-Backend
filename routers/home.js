const router = require("express").Router();
const passport = require("passport");

const knexfile = require("../knexfile").development;
const knex = require("knex")(knexfile);

//home page
router.get('/user', async (req, res) => {
  console.log('request received!', req.user)
  if (req.user) {
			const email = req.user.email;
			res.send(`Welcome, logged in with email ${email}`);
		} else {
			res.send("Welcome, guest");
		}  
})

module.exports = router;