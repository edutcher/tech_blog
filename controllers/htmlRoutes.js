const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async(req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
            exlclude: ['password'],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('index', {
            posts,
            name: req.session.user_name,
            title: "Index",
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async(req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
            exlclude: ['password'],
            where: {
                user_id: req.session.user_id
            }
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            name: req.session.user_name,
            title: "Dashboard",
            logged_in: req.session.logged_in
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/post/:id', async(req, res) => {
    try {
        let postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }],
            exlclude: ['password']
        });

        if (!postData) res.status(400).json({ message: "Post not found" });

        const post = postData.get({ plain: true });

        res.render('showPost', {
            post,
            name: req.session.user_name,
            title: "Post",
            logged_in: req.session.logged_in
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

})

router.get('/newuser', async(req, res) => {
    res.render('newUser', {
        title: "New User"
    })
})

router.get('/newpost', withAuth, async(req, res) => {
    res.render('newPost', {
        title: "New Post"
    })
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login', {
        title: "Login"
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