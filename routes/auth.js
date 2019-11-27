const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validations');


router.post('/register', async (req, res) => {
    //Validacao dos dados
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Verificar se ja existe o usuario
    const emailExist = await User.findOne({
        email: req.body.email
    });
    if (emailExist) return res.status(400).send('Email já cadastrado');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const saved = await user.save();
        res.send({
            user: user._id
        });
    } catch (err) {
        res.status(400).send(err);
    }

});

router.post('/login', async (req, res) => {
    //Validacao dos dados
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Verificar se existe o usuario
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email não encontrado');

    //Verificar senha
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    //Criar token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    //res.send(user);
});


module.exports = router;