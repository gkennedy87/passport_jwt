const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../scripts/validation');
// Validation


router.post('/register', async (req, res) => {
// validate
    const {error} = registerValidation(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message)
    }
// Check if user already exists
    const emailExists = await User.findOne({
        email: req.body.email
    })
    if(emailExists) {
        return res.status(400).send('This email already exists');
    }

// Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
 // Create new User       
     const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword 
     })
    try{ 
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch (err){
        res.status(400).json({ message: err.message});
    }
});

router.post('/login', async (req, res, next) => {

    // validate
    const {error} = loginValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    };
    // validate email existence
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send('Email or password is incorrect')
    }
    // validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Email or password is incorrect')
    }
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('token', token).send(token);

    res.send('Logged in!');
});


module.exports = router;