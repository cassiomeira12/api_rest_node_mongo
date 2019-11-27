const express = require('express');
const router = express.Router();
const User = require('../models/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    console.log('Get all')
    console.log(req.params)
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/sign', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) return res.status(500).send('Error on the server');
        if (!user) return res.status(404).send('No user found');

        //var passwordIsValid = 
    });
});

router.get('/login', async (req, res) => {
    console.log('Login by ID')
    console.log(req.params)
    try {
        const user = await User.findOne({
            email: req.params.email
        });
        res.json(user);
    } catch(err) {
        res.json({ message: err });
    }
})

router.get('/:userId', async (req, res) => {
    console.log('Get by ID')
    console.log(req.params)
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/register', async (req, res) => {
    console.log('Post')
    console.log(req.params)

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone
    });

    try {
        const saved = await user.save();

        var token = jwt.sign({ id: user }, 'secret', {
            expiresIn: 86400
        });

        res.status(200).send({ auth: true, token: token });
        //res.json(saved);
    } catch (err) {
        res.json({ message: err });
    }

});

router.delete('/:userId', async (req, res) => {
    console.log('Delete')
    console.log(req.params)
    try {
        const removed = await User.remove({ _id: req.params.userId });
        res.json(removed);
    } catch (err) {
        res.json({ message: err });
    }
});

router.patch('/:userId', async (req, res) => {
    console.log('Patch')
    console.log(req.params)
    try {
        const update = await Post.updateOne(
            { _id: req.params.userId },
            { $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone
            } }
        );
        res.json(update);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;