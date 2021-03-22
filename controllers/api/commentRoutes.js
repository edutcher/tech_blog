const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async(req, res) => {
        try {
            let user = await User.create(req.body);

            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }


)

router.post('/login', async(req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            res.status(400).json({ logged_in: false, message: 'Incorrect info' });
            return;
        }

        let goodPass = await user.checkPassword(password);

        if (!goodPass) {
            res.status(400).json({ logged_in: false, message: 'Incorrect info' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;

            res.json({ user, logged_in: true, message: 'Logged in' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;