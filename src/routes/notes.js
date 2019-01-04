const express = require('express');
const router = express.Router();

const Note = require('../models/Note.model');

// Listar todas las notas
router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({date: 'desc'});
    res.render('notes/all-notes', { notes })
})

// Formulario para crear nota
router.get('/notes/add', (req, res) => {
    res.render('notes/new-note')
})

// Guardar nota en BD
router.post('/notes/new-note', async (req, res) => {
    const { title, description } = req.body;
    const errors = [];

    if(!title){
        errors.push({text: 'Please, write a title'})
    }

    if(!description){
        errors.push({text: 'Please, write a description'})
    }

    if(errors.length > 0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    }else{
        const newNote = new Note({title, description});
        await newNote.save();
        req.flash('success_msg', 'Nota agregada satisfactoriamente')
        res.redirect('/notes')
        console.log(newNote);
    }
});

// Editar notas
router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {note})
})

// Guardar notas editadas en la BD
router.put('/notes/edit-note/:id', async (req, res) => {
    const {title, description} = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Nota actualizada satisfactoriamente')
    res.redirect('/notes');
})

// Eliminar notas
router.delete('/notes/delete/:id', async (req, res) =>{
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Nota eliminada satisfactoriamente')
    res.redirect('/notes')
})


module.exports = router;