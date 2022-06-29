/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

var router = require('express').Router();
const AuthController = require('../controller/AuthController');
const csrf = require("csurf");
const csrfProtection = csrf();

/* Rota Home */
router.get("/", (req, res) => {
    res.redirect("/login");
})

/* Rotas Login */
router.get('/login', csrfProtection, AuthController.login);
router.post('/authenticate', csrfProtection, AuthController.authenticate);
router.get('/logout', csrfProtection, AuthController.logout);

module.exports = router;