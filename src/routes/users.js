const express = require('express');
const router = express.Router();

const User = require('../models/User.model');

// Ingresar a la app
router.get('/users/signin', (req, res) => {
    res.render('users/signin')
})

// Reguistrar en la app
router.get('/users/signup', (req, res) => {
    res.render('users/signup')
})

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const newUser = new User({ name, email, password, confirm_password });
    await newUser.save()
    console.log(newUser);
    res.send('Ok')
})


module.exports = router;
