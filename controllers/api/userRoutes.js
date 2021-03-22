const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async(req, res) => {
        try {
            let user = await User.create(req.body);

            res.status(200).redirect('/login')
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }


)

router.post('/login', async(req, res) => {
    try {
        let { name, password } = req.body;
        let user = await User.findOne({
            where: {
                name
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
            req.session.user_name = user.name;
            req.session.logged_in = true;

            res.render('dashboard', {
                name: req.session.user_name,
                title: "dashboard"
            });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;