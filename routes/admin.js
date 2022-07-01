/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

var router = require('express').Router();
const csrf = require("csurf");
const csrfProtection = csrf();
const UsersController = require('../controller/UsersController');
const adminAuth = require("../middlewares/adminAuth");


// Rotas de Usuários
router.get('/users', adminAuth, csrfProtection, UsersController.index);
router.get('/users/create', adminAuth, csrfProtection, UsersController.create);
router.post('/users/create', adminAuth, csrfProtection, UsersController.store);


module.exports = router;