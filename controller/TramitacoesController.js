/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */
const Tramitacao = require("../model/Tramitacao");
const Processo = require("../model/Processo");
const nP = require("../lib/normalizeParse");
const Log = require("../lib/logDatabase");

module.exports = {
    create(req, res) {
        res.render("admin/tramitacoes/new");
    },
    create2(req, res) {
        var id = req.params.id;
        Processo.findByPk(id, {
            include: [{model: Tramitacao, as: 'tramitacao'}]
        }).then(processo => {
            if (processo != undefined) {
                res.render("admin/tramitacoes/new", nP.parse({processo}, req));
            } else { // Não encontrada
                res.redirect("/");
            }
        });
    },
    update(req, res) {
        var id = req.body.id;
        var data = req.body.data;
        var carga = req.body.carga;
        var ctrt = req.body.ctrt;
        var tecnico = req.body.tecnico;
        var anotacao = req.body.anotacao;
        var sicopsequencia = req.body.sicopsequencia;

        sicopsequencia

        Tramitacao.update({
            data: data,
            carga: carga,
            ctrt: ctrt,
            tecnico: tecnico,
            anotacao: anotacao,
            sicopsequencia: sicopsequencia,
            user_id: req.session.user.id,
        }, {
            where: {
                id: id
            }
        }).then(rr => {
            Log.update(rr, req.session.user.id, process.env.DB_PREFIX + "_tramitacoes");
            res.redirect("/admin/tramitacoes/" + id);
        }).catch(err => {
            res.redirect("/admin/tramitacoes");
        });
    },
    delete(req, res) {
        // DESABILITAR A TRAMITAÇÃO COM O STATUS 0 OU 1
        var id = req.body.id;

        Tramitacao.update({
            status: 0,

        }, {
            where: {
                id: id
            }
        }).then(() => {
            console.log("atualizou e tentou redirecionar");
            res.redirect("/admin/tramitacoes/" + id);
        });
    },
    edit(req, res) {
        var id = req.params.id;

        if (isNaN(id)) {
            res.redirect("/admin/tramitacoes/" + id);
        }

        Tramitacao.findByPk(id).then(tramitacao => {

            if (tramitacao != undefined) {
                res.render("admin/tramitacoes/edit", nP.parse({tramitacao: tramitacao}, req));
            } else {
                res.redirect("/admin/tramitacoes/" + id);
            }
        }).catch(erro => {
            res.redirect("/admin/tramitacoes/" + id);
        })
    },
    store(req, res) {
        Tramitacao.create({
            data: req.body.data,
            carga: req.body.carga,
            ctrt: req.body.ctrt,
            tecnico: req.body.tecnico,
            anotacao: req.body.anotacao,
            processoId: req.body.processoId,
            sicopsequencia: req.body.sicopsequencia,
            status: 1,
            user_id: req.session.user.id,
        }).then(() => {
            res.redirect("/admin/tramitacoes/" + req.body.processoId);
        });
    },
    show(req, res) {
        Processo.findByPk(req.params.id, {
            include: [{model: Tramitacao, as: 'tramitacao'}]
        }).then(processo => {
            if (processo != undefined) { // Pergunta encontrada
                res.render("admin/tramitacoes/index", nP.parse({processo: processo}, req));
            } else { // Não encontrada
                res.redirect("/");
            }
        });
    },
};