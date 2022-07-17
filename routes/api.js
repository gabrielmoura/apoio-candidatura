/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */
var router = require('express').Router();
const adminAuth = require("../middlewares/adminAuth");
const ApiProcessoController = require("../controller/api/ApiProcessoController");
const ApiUserController = require("../controller/api/ApiUserController");
const GenericC = require("../controller/api/ApiGenericController");

/*      Rota Api    */
router.get('/processo/:id', adminAuth, ApiProcessoController.show);
router.post('/processo/search', adminAuth, ApiProcessoController.search);
router.get('/processo', adminAuth, ApiProcessoController.index);
router.post('/processoDT', adminAuth, ApiProcessoController.datatable);

router.post('/user/enable', adminAuth, ApiUserController.enableUser);
router.post('/user/disable', adminAuth, ApiUserController.disableUser);
router.post('/user/changePassword', adminAuth, ApiUserController.changePassword);

router.post('/cep', adminAuth, GenericC.getCep);
module.exports = router;

