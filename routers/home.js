const router = require("express").Router();

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log('session info', req.session);
    console.log('you are not authenticated');
  }
}

//home page
router.get('/user', isLoggedIn, async (req, res) => {
  if (req.user) {
			const email = req.user.email;
			res.send(`Logged in with email ${email}`);
		} else {
			res.send("Welcome, guest");
		}  
})

module.exports = router;