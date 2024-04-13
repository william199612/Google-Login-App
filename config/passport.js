const passport = require('passport');
const GoogleStrtegy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local');
const User = require('../models/user-model');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    console.log("Serializing user...");
    // console.log(user);
    // save mongoDB id and stores in session, signed the id and send to user as cookie
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    console.log("Deserializing user...");
    let foundUser = await User.findOne({ _id });
    done(null, foundUser); // req.user = foundUser
})

passport.use(
    new GoogleStrtegy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
    },
    // function
    async (accessToken, refreshToken, profile, done) => {
        console.log("Enter GoogleStrtegy area...");
        // console.log(profile);
        // console.log("===============================");

        let foundUser = await User.findOne({ googleID: profile.id }).exec();

        if (foundUser) {
            console.log("User signed up already, no need to store in DB");
            done(null, foundUser);
        } else {
            console.log("New user detected, store in DB");

            let newUser = new User({
                name: profile.displayName,
                googleID: profile.id,
                thumbnail: profile.photos[0].value,
                email: profile.emails[0].value,
            });

            let savedUser = await newUser.save();
            console.log("Create new user {" + savedUser.name + "} successfully.");
            done(null, savedUser);
        }
    }
))

// local login
passport.use(new LocalStrategy(
    async (username, password, done) => {
        let foundUser = await User.findOne({ email: username });
        if (foundUser) {
            let result = await bcrypt.compare(password, foundUser.password);
            if (result) {
                done(null, foundUser);
            } else {
                done(null, false);
            }
        } else {
            done(null, false);
        }
    }
));