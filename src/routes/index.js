const express = require('express');
const routes = express.Router();
const passport = require('passport');

const reclamacaoController = require('../controller/reclamacao');
const usuarioController = require('../controller/usuario');

routes.get('/user/:id', usuarioController.nomeUser);
routes.get('/usuarios', usuarioController.index);
routes.post('/usuario', usuarioController.store);
routes.put('/senha/:id', usuarioController._update);

routes.post('/login', usuarioController.login);

module.exports = routes;
