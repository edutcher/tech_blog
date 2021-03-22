const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', async(req, res) => {

})

router.get('/:id', async(req, res) => {
    try {
        let { id } = req.params;
        let post = await Post.findByPk(id);

        if (!post) res.status(400).json({ message: "no post found" });

        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.post('/', async(req, res) => {
        if (!req.session.logged_in) {
            res.render('login', {
                message: "You must login first",
                title: "login"
            });
            return;
        }
        try {
            let newPost = {
                text: req.body.post,
                user_id: req.session.user_id
            }
            let user = await Post.create(newPost);

            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }


)

module.exports = router;