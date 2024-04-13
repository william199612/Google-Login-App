const router = require('express').Router();
const Post = require('../models/post-model');

const authCheck = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/auth/login');
    }
}

router.get("/", authCheck, async (req, res) => {
    console.log("Entering profile route...");

    let foundPost = await Post.find({ author: req.user._id });
    // console.log(foundPost);
    return res.render("profile", { user: req.user, posts: foundPost });
})

router.get("/post", authCheck, (req, res) => {
    return res.render("post", { user: req.user });
})

router.post("/post", authCheck, async (req, res) => {
    console.log("Creating new post...");
    let { title, content } = req.body;
    let newPost = new Post({ title, content, author: req.user._id });
    try {
        await newPost.save();
        console.log("New post saved.")
        return res.redirect("/profile");
    } catch (e) {
        req.flash("error_msg", "Title and contents cannot be empty.");
        return res.redirect("/profile/post");
    }

})

module.exports = router;