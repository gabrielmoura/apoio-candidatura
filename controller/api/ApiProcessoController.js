/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const {Op} = require('@sequelize/core');


const Processo = require("../../model/Processo");
const Tramitacao = require("../../model/Tramitacao");

// Objetivo: https://datatables.net/examples/non_jquery/ajax.html
module.exports = {
    async show(req, res) {
        var id = req.params.id;
        Processo.findByPk(id, {
            include: [{model: Tramitacao, as: 'tramitacao'}]
        }).then((processo) => {
            if (processo != undefined) { // Pergunta encontrada
                res.json({processos: processos});
            }
        });
    },
    async index(req, res) {
        Processo.findAll({
            limit: 10,
            raw: true,
            order: [['id', 'DESC']],
            where: {
                status: 1
            }
        }).then(processos => {
            res.json({processos: processos});
        });
    },
    async datatable(req, res) {
        const pp = Processo;
        var recordsTotal = await pp.count()
        var recordsFiltered = (!!req.body.length) ? req.body.length : 1000;

        processos = await pp.findAll({
            limit: recordsFiltered,
            raw: true,
            order: [['id', 'DESC']],
            where: {
                status: 1,
            }
        });
        var data = {
            "draw": req.body.draw,
            "recordsFiltered": recordsFiltered,
            "recordsTotal": recordsTotal,
            "data": processos
        };
        res.status(200).send(data);

    },
    async search(req, res) {
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
                res.json({processos: processos});
            });
        }
        if (searchpor != "") {
            Processo.findAll({
                raw: true,
                order: [['id', 'ASC']],
                where: {
                    [searchpor]: {[Op.substring]: searchprocesso},
                    status: 1
                }
            }).then(processos => {
                res.json({processos: processos});
            });
        }
    },

}

