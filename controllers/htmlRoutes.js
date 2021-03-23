const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async(req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('index', {
            posts,
            name: req.session.user_name,
            title: "index",
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async(req, res) => {
    res.render('dashboard', {
        name: req.session.user_name,
        title: "dashboard",
        logged_in: req.session.logged_in
    });
})

router.get('/newuser', async(req, res) => {
    res.render('newUser', {
        title: "new user"
    })
})

router.get('/newpost', withAuth, async(req, res) => {
    res.render('newPost', {
        title: "new post"
    })
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login', {
        title: "login"
    });
});

router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).redirect("/");
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;