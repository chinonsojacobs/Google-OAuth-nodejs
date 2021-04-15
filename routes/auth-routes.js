const router = require('express').Router();
const passport = require('passport');
//auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

//auth logout
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

//auth with google
router.get('/google', passport.authenticate('google', {
    //scope tells user what we want to retrieve from user profile
    scope: ['profile']
}));


//callback routes or google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile/');
});
module.exports = router;