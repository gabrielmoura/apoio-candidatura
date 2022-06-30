/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */
const Processo = require("../model/Processo");
const Log = require('../lib/logDatabase');
module.exports = {
    delete(req, res) {
        var id = req.body.id;
        var perguntaId = req.body.pergunta;
        if (id != undefined) {
            if (!isNaN(id)) {
                Processo.destroy({
                    where: {
                        id: id
                    },
                }).then((r) => {
                    Log.delete(r, req.session.user.id, Processo.tableName);
                    res.redirect("/pergunta/" + perguntaId);
                });
            } else {// NÃO FOR UM NÚMERO
                res.redirect("/pergunta/" + perguntaId);
            }
        } else { // NULL
            res.redirect("/pergunta/" + perguntaId);
        }
    },
    show(req, res) {
        var id = req.params.id;

        if (isNaN(id)) {
            res.redirect("/admin/processos");
        }

        Processo.findByPk(id).then(processo => {

            if (processo != undefined) {
                res.render("admin/processos/edit", {processo: processo});
            } else {
                res.redirect("/admin/processos");
            }
        }).catch(erro => {
            res.redirect("/admin/processos");
        })
    },
};


