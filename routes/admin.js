/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

var router = require('express').Router();
const csrf = require("csurf");
const csrfProtection = csrf();
const UsersController = require('../controller/UsersController');


// Rotas de Usuários
router.get('/users', csrfProtection, UsersController.index);
router.get('/users/create', csrfProtection, UsersController.create);
router.post('/users/create', csrfProtection, UsersController.store);


module.exports = router;