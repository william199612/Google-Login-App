const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');

router.get("/login", (req, res) => {
    return res.render("login", { user: req.user });
})

router.get("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) return res.send(err);
        return res.redirect('/');
    })
})

router.get("/signup", (req, res) => {
    return res.render("signup", { user: req.user });
})

// local sign up
router.post("/signup", async (req, res) => {
    let { name, email, password } = req.body;

    if (password.length < 8) {
        req.flash("error_msg", "Your password must be at least 8 characters.");
        return res.redirect("/auth/signup");
    }

    // check if email already exists
    const foundEmail = await User.findOne({ email }).exec();
    if (foundEmail) {
        req.flash("error_msg", "Email already been signed up, try again with another email or sign in with this email.");
        return res.redirect("/auth/signup");
    }

    // new email signing up
    let hashedPassword = await bcrypt.hash(password, 12);
    let newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    let savedUser = await newUser.save();
    req.flash("success_msg", "Welcome, " + savedUser.name + "!  Sign up successfully! You can now sign in with this email.");
    return res.redirect("/auth/login");
})

router.post(
    "/login", 
    passport.authenticate("local", {
        failureRedirect: "/auth/login",
        failureFlash: "Login unsuccessfully, your email or password is incorrect, please try again." // req.flash("error")
    }),
    (req, res) => {
        return res.redirect("/profile");
    }
)

router.get("/google", passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account",
    })
)

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    console.log("Redirecting...");
    return res.redirect("/profile");
})

module.exports = router;