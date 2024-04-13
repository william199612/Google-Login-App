const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');

require('./config/passport');

// connect to mongoDB database
mongoose
    .connect("mongodb://127.0.0.1:27017/GoogleDB")
    .then(() => {
        console.log("Connected to MongoDB...");
    })
    .catch((e) => {
        console.log(e);
    });


// middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// routes
app.get("/", (req, res) => {
    return res.render("index", { user: req.user });
})

app.listen(8080, () => {
    console.log("Server running on port 8080...")
})