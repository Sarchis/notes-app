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

// Guardar usuario en la BD
router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    if(name.length <= 0){
        errors.push({text: 'Por favor, ingresa tu nombre'})
    }
    if(password != confirm_password){
        errors.push({text: 'Las contraseñas no coinciden'})
    }
    if(password.length < 4){
        errors.push({text: 'La contraseña debe ser mayor a 4 caracteres'})
    }
    if(errors.length > 0){
        res.render('users/signup', { errors, name, email, password, confirm_password})
    } else {
        const newUser = new User({ name, email, password, confirm_password });
        await newUser.save()
        console.log(newUser);
        res.redirect('/users/signin');
    }

})


module.exports = router;
