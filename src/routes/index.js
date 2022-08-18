const express = require('express');
const routes = express.Router();
const passport = require('passport');

const reclamacaoController = require('../controller/reclamacao');
const usuarioController = require('../controller/usuario');

const dao = require('../dao/usuarioDao')

routes.get('/user/:id', usuarioController.nomeUser);
routes.get('/usuarios', usuarioController.index);
routes.post('/usuario', usuarioController.store);
routes.put('/senha/:id', usuarioController._update);

routes.post('/login', async (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/login',
        failureRedirect: '/'
    });

    next();
    console.log(req.sessionID)
    const sessionID = req.sessionID;
    return res.status(200).json({
        sessionID
    });
});

module.exports = routes;
