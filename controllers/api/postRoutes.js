const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async(req, res) => {
    try {
        let posts = await Post.findAll({
            include: [{ model: User }, { model: Comment }]
        });

        if (!posts) res.status(400).json({ message: "No posts" });

        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.get('/:id', async(req, res) => {
    try {
        let { id } = req.params;
        let post = await Post.findByPk(id);

        if (!post) res.status(400).json({ message: "No post found" });

        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.post('/', async(req, res) => {
    if (!req.session.logged_in) {
        res.status(400).json({ logged_in: false, message: 'Please log in.' });
        return;
    }
    let now = new Date;
    try {
        let newPost = {
            title: req.body.title,
            text: req.body.post,
            user_id: req.session.user_id,
            created_on: now.toISOString()
        }
        let post = await Post.create(newPost);

        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.delete('/:id', async(req, res) => {
    if (!req.session.logged_in) {
        res.status(400).json({ logged_in: false, message: 'Please log in.' });
        return;
    }
    try {
        let { id } = req.params;

        let result = await Post.destroy({
            where: {
                id
            }
        });

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;