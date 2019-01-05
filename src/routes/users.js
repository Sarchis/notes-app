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
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            console.log(emailUser);
            // req.flash('error_msg', 'El correo está en uso')
            // errors.push({text: 'El correo ya está en uso'})
            res.redirect('/users/signup')
        }else{
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Estás registrado')
            res.redirect('/users/signin');
            console.log(newUser);
        }
    }

})


module.exports = router;
