/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */
const {Op} = require('@sequelize/core');

const Processo = require("../model/Processo");
const Tramitacao = require("../model/Tramitacao");
const nP = require("../lib/normalizeParse");
const Log = require("../lib/logDatabase");


module.exports = {
    async delete(req, res) {
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
    async edit(req, res) {
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
    async show(req, res) {
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
    async update(req, res) {
        const {
            id,
            name, //
            address, //
            cep, //
            number,
            complement,
            district,
            city,
            tell, //
            cpf, //
            date_of_birth, //
            indication, //
            benefit, //
            date_of_call,//
            date_of_schedule, //
            time, //
            reschedule, //
            observation, //
            contract, //
            status, //
            status_of_observation, //
            status_of_3232,
            candidacy_support ,//
            unit, //
            source, //
            want_material,
            call_status,
        } = req.body;
        let payload = {
            id,
            name,
            address,
            cep,
            number,
            complement,
            district,
            city,
            tell,
            cpf,
            date_of_birth,
            indication,
            benefit,
            date_of_call,
            date_of_schedule,
            time,
            reschedule,
            observation,
            contract,
            status,
            status_of_observation,
            status_of_3232,
            candidacy_support ,//
            unit, //
            source, //
            want_material,
            call_status,
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
        }).catch(err => {
            console.error(err);
        });
    },
    async store(req, res) {
        const {
            name,
            address,
            cep,
            number,
            complement,
            district,
            city,
            tell,
            cpf,
            date_of_birth,
            indication,
            benefit,
            date_of_call,
            date_of_schedule,
            time,
            reschedule,
            observation,
            contract,
            status,
            status_of_observation,
            status_of_3232,
            candidacy_support ,//
            unit, //
            source, //
            want_material,
            call_status,
        } = req.body;
        const user_id = req.session.user.id;
        Processo.create({
            name,
            address,
            cep,
            number,
            complement,
            district,
            city,
            tell,
            cpf,
            date_of_birth,
            indication,
            benefit,
            date_of_call,
            date_of_schedule,
            time,
            reschedule,
            observation,
            contract,
            status,
            status_of_observation,
            status_of_3232,
            candidacy_support ,//
            unit, //
            source, //
            want_material,
            call_status,
            user_id
        }).then(() => {
            console.log("criou e tentou redirecionar");
            //console.log(Processo.getId())
            res.redirect("/admin/processos");
        }).catch(err => {
            console.error(err);
            res.redirect("/admin/processos");
        });
    },
    async search(req, res) {
        var searchpor = req.body.searchpor;
        var searchprocesso = req.body.searchprocesso;
        if (searchprocesso === "") {
            Processo.findAll({
                limit: 0,
                raw: true,
                order: [['id', 'DESC']],
            }).then(processos => {
                res.render("admin/processos/index", nP.parse({processos: processos}, req));
            });
        }

        if (searchpor != "") {
            Processo.findAll({
                raw: true,
                order: [['id', 'ASC']],
                where: {
                    [searchpor]: {
                        [Op.substring]:searchprocesso},
                }
            }).then(processos => {
                res.render("admin/processos/index", nP.parse({processos: processos}, req))
            }).catch(err => {
                console.error(err);
                res.redirect('/admin/processos')
            });
        }
    },
    async create(req, res) {
        return await res.render("admin/processos/new", nP.parse({}, req));
    },
    async index(req, res) {
        //776 ->1.533ms
        //async -> 0.358ms
        Processo.findAll({
            limit: 10,
            raw: true,
            order: [['id', 'DESC']],
        }).then(processos => {
            res.render("admin/processos/index", nP.parse({processos: processos}, req))
        });
    },
    async search2(req, res) {
        //776 ->0.729ms
        //async -> 21.211ms
        Processo.search(req.body.search)
            .then(valor => {
                res.render("admin/processos/index", nP.parse({processos: processos}, req))
            });
    }

}

