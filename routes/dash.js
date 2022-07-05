/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */
var router = require('express').Router();

const ProcessoController = require('../controller/ProcessoController');
const TramitarController = require('../controller/TramitarController');
const TramitacoesController = require('../controller/TramitacoesController');
const DashboardController = require('../controller/DashboardController');
const LogController = require("../controller/LogController");
const adminAuth = require("../middlewares/adminAuth");

/* Rotas Processos */
router.get("/processos", adminAuth, ProcessoController.index);
router.get("/processos/new", adminAuth, ProcessoController.create);
router.post("/processos/search", adminAuth, ProcessoController.search);
router.post("/processos/store", adminAuth, ProcessoController.store);
router.post("/processos/update", adminAuth, ProcessoController.update);
router.post("/processos/delete", adminAuth, ProcessoController.delete);
// router.get("/processos/:id", adminAuth, ProcessoController.show); FORA DE USO
router.get("/processos/edit/:id", adminAuth, ProcessoController.edit);
router.get('/processos/tramitar/:id', adminAuth, TramitarController.show);

router.post('/tramitar/delete', adminAuth, TramitarController.delete);

/* Rotas Tramitacoes */
router.get("/tramitacoes/:id", adminAuth, TramitacoesController.show);
// router.get("/tramitacoes/new", adminAuth, TramitacoesController.create); FORA DE USO
router.post("/tramitacoes/new", adminAuth, TramitacoesController.store);
router.get("/tramitacao/edit/:id", adminAuth, TramitacoesController.edit);
router.post("/tramitacoes/update", adminAuth, TramitacoesController.update)
router.post("/tramitacao/delete", adminAuth, TramitacoesController.delete);
router.get("/tramitacoes/new/:id", adminAuth, TramitacoesController.create2);

router.get("/dashboard", adminAuth, DashboardController.index);

/*      Rota Log     */
router.get("/log", adminAuth, LogController.index);

module.exports = router;

