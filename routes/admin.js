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
router.get('/users/edit/:id', adminAuth, csrfProtection, UsersController.edit);
router.post('/users/create', adminAuth, csrfProtection, UsersController.store);
router.post('/users/update/:id?', adminAuth, csrfProtection, UsersController.update);


module.exports = router;