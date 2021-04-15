const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
});

passport.use( 
    //using google api behind the scenes client id and secret
    new GoogleStrategy({
        //options for the google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        // callback function takes in a number of parameters
        // access token is used to go back and alter users profile
        // refresh token is to refresh the access token after a certain amount of time
        // profile is the information passport comes back when it takes the code in uri to google and brings back profile info
        // done is when we are done with callback function
        
        //check if user already exist in database
        User.findOne({googleID: profile.id}).then((currentUser) => {
            if (currentUser) {
                //already have the user
                console.log('user is: ', currentUser);
                done(null, currentUser)
            } else {
                //if not create user in db
                new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log('new user created: ' + newUser);
                    done(null, newUser);
                });
            }
        });
        
    })
)