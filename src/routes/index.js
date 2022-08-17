const express = require('express');
const routes = express.Router();

const reclamacaoController = require('../controller/reclamacao');
const usuarioController = require('../controller/usuario');

routes.get('/', reclamacaoController.index);
routes.get('/usuarios', usuarioController.index);
routes.post('/usuario', usuarioController.store);
routes.put('/senha/:id', usuarioController._update);

module.exports = routes;
