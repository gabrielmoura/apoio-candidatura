/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */
const Tramitacao = require("../model/Tramitacao");
const Processo = require("../model/Processo");
const User = require("../model/User");
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
        var id = req.body.tramitacaoId;
        var data = req.body.data;
        var anotacao = req.body.anotacao;


        let dado = {
            data: data,
            anotacao: anotacao,
            user_id: req.session.user.id,
        };

        Tramitacao.update(dado, {
            where: {
                id: id
            }
        }).then(rr => {
            Log.update(dado, req.session.user.id, process.env.DB_PREFIX + "_tramitacoes");
            res.redirect("/admin/tramitacoes/" + req.body.processoId);
        }).catch(err => {
            console.error(err);
            res.redirect("/admin/processos");
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
        //
        // if (isNaN(id)) {
        //     res.redirect("/admin/tramitacoes/" + id);
        // }

        Tramitacao.findByPk(id, {
            include: [{model: Processo, as: 'processo'}]
        }).then(tramitacao => {

            if (tramitacao != undefined) {

                res.render("admin/tramitacoes/edit", nP.parse({
                    tramitacao: tramitacao,
                    processo: tramitacao.processo
                }, req));
            } else {
                res.redirect("/admin/tramitacoes/" + id);
            }
        }).catch(erro => {
            console.error(erro);
            res.redirect("/admin/tramitacoes/" + id);
        })
    },
    store(req, res) {
        Tramitacao.create({
            data: req.body.data,
            carga: req.body.carga,
            anotacao: req.body.anotacao,
            processo_id: req.body.processoId,
            status: 1,
            user_id: req.session.user.id,
        }).then(() => {
            res.redirect("/admin/tramitacoes/" + req.body.processoId);
        }).catch(err => {
            console.error(err);
            res.redirect("/admin/processos");
        });
    },
    show(req, res) {
        Processo.findByPk(req.params.id, {
            include: [{model: Tramitacao, as: 'tramitacao', include: {model: User, as: 'user', required: false}}]
        }).then(processo => {
            if (processo != undefined) { // Pergunta encontrada
                res.render("admin/tramitacoes/index", nP.parse({processo: processo}, req));
            } else { // Não encontrada
                res.redirect("/");
            }
        }).catch(err => {
            console.error(err);
            res.redirect("/admin/processos");
        });
    },
};