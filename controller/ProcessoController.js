/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Processo = require("../model/Processo");
const Tramitacao = require("../model/Tramitacao");
const nP = require("../lib/normalizeParse");
const Log = require("../lib/logDatabase");

module.exports = {
    delete(req, res) {
        var id = req.body.id;
        var status = req.body.status;

        Processo.update({
            status: status,
        }, {
            where: {
                id: id
            }
        }).then(() => {
            console.log("atualizou e tentou redirecionar");
            res.redirect("/admin/processos");
        });
    },
    edit(req, res) {
        var id = req.params.id;

        if (isNaN(id)) {
            res.redirect("/admin/processos");
        }

        Processo.findByPk(id).then(processo => {

            if (processo != undefined) {
                res.render("admin/processos/edit", nP.parse({processo}, req));
            } else {
                res.redirect("/admin/processos");
            }
        }).catch(() => {
            res.redirect("/admin/processos");
        })
    },
    show(req, res) {
        var id = req.params.id;
        Processo.findByPk(id, {
            include: [{model: Tramitacao, as: 'tramitacao'}]
        }).then((processo) => {
            if (processo != undefined) { // Pergunta encontrada
                res.render("admin/tramitacoes/index", nP.parse({processos: processos}, req));
            } else { // Não encontrada
                res.redirect("/");
            }
        });
    },
    update(req, res) {
        let payload = {
            id: req.body.id,
            datacomparecimento: req.body.datacomparecimento,
            nomebeneficiario: req.body.nomebeneficiario,
            telefone: req.body.telefone,
            celular: req.body.celular,
            telefone2: req.body.telefone2,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            cep: req.body.cep,
            beneficiorequerido: req.body.beneficiorequerido,
            indicacao: req.body.indicacao,
            pendenciadedocumentos: req.body.pendenciadedocumentos,
            informacaocomplementar: req.body.informacaocomplementar,
            enviados: req.body.enviados,
            entrada: req.body.entrada,
            cpf: req.body.cpf,
            senhadocliente: req.body.senhadocliente,
            situacao: req.body.situacao,
            novaentrada: req.body.novaentrada,
            datapesquisa: req.body.datapesquisa,
            advogadoqueassinou: req.body.advogadoqueassinou,
            pagamento: req.body.pagamento,
            email: req.body.email,
            avaliacaopericia: req.body.avaliacaopericia,
            status: 1,
            user_id: req.session.user.id,

        };
        Processo.update(payload, {
            where: {
                id: req.body.id
            }
        }).then(rr => {
            Log.update(payload, req.session.user.id, process.env.DB_PREFIX + "_processos");
            console.log("atualizou e tentou redirecionar");

            //res.redirect("/admin/processos");
            res.redirect("/admin/tramitacoes/" + req.body.id);
        });
    },
    store(req, res) {
        Processo.create({

            datacomparecimento: req.body.datacomparecimento,
            nomebeneficiario: req.body.nomebeneficiario,
            telefone: req.body.telefone,
            celular: req.body.celular,
            telefone2: req.body.telefone2,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            cep: req.body.cep,
            beneficiorequerido: req.body.beneficiorequerido,
            indicacao: req.body.indicacao,
            pendenciadedocumentos: req.body.pendenciadedocumentos,
            informacaocomplementar: req.body.informacaocomplementar,
            enviados: req.body.enviados,
            entrada: req.body.entrada,
            cpf: req.body.cpf,
            senhadocliente: req.body.senhadocliente,
            situacao: req.body.situacao,
            novaentrada: req.body.novaentrada,
            datapesquisa: req.body.datapesquisa,
            advogadoqueassinou: req.body.advogadoqueassinou,
            pagamento: req.body.pagamento,
            email: req.body.email,
            avaliacaopericia: req.body.avaliacaopericia,
            status: 1,
            user_id: req.session.user.id,

        }).then(() => {
            console.log("criou e tentou redirecionar");
            //console.log(Processo.getId())
            res.redirect("/admin/processos");
        });
    },
    search(req, res) {
        var searchpor = req.body.searchpor;
        var searchprocesso = req.body.searchprocesso;
        if (searchprocesso === "") {
            Processo.findAll({
                limit: 0,
                raw: true,
                order: [['id', 'DESC']],
                where: {
                    status: 1
                }
            }).then(processos => {
                res.render("admin/processos/index", nP.parse({processos: processos}, req));
            });
        }

        if (searchpor === "nomebeneficiario") {

            Processo.findAll({

                raw: true,
                order: [['id', 'ASC']],
                where: {
                    nomebeneficiario: {
                        [Op.substring]: searchprocesso
                    },
                    status: 1
                }
            }).then(processos => {
                res.render("admin/processos/index", nP.parse({processos: processos}, req))
            });
        }
        if (searchpor === "telefone") {
            Processo.findAll({
                raw: true,
                order: [['id', 'ASC']],
                where: {
                    telefone: {
                        [Op.substring]: searchprocesso
                    },
                    status: 1
                }
            }).then(processos => {
                res.render("admin/processos/index", nP.parse({processos: processos}, req))
            });
        }
        if (searchpor === "logradouro") {
            Processo.findAll({
                raw: true,
                order: [['id', 'ASC']],
                where: {
                    logradouro: {
                        [Op.substring]: searchprocesso
                    },
                    status: 1
                }
            }).then(processos => {
                res.render("admin/processos/index", nP.parse({processos: processos}, req))
            });
        }
        if (searchpor === "bairro") {
            Processo.findAll({
                raw: true,
                order: [['id', 'ASC']],
                where: {
                    bairro: {
                        [Op.substring]: searchprocesso
                    },
                    status: 1
                }
            }).then(processos => {
                res.render("admin/processos/index", nP.parse({processos: processos}, req))
            });
        }
    },
    create(req, res) {
        res.render("admin/processos/new", nP.parse({}, req));
    },
    index(req, res) {
        Processo.findAll({
            limit: 10,
            raw: true,
            order: [['id', 'DESC']],
            where: {
                status: 1
            }
        }).then(processos => {
            res.render("admin/processos/index", nP.parse({processos: processos}, req))
        });
    }

}

