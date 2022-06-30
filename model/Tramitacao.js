/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const Sequelize = require("sequelize");
const Processo = require("./Processo");
const db = require("./database");
const Log = require("../lib/logDatabase");

const Tramitacao = db.connection.define(db.env.DB_PREFIX + "_respostas", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    carga: {type: Sequelize.STRING, allowNull: true},

    sicopsequencia: {type: Sequelize.STRING, allowNull: true},
    sicopdatadespacho: {type: Sequelize.STRING, allowNull: true},
    sicopdatarecebimento: {type: Sequelize.STRING, allowNull: true},
    sicopdatasaida: {type: Sequelize.STRING, allowNull: true},
    sicopcoddespacho: {type: Sequelize.STRING, allowNull: true},
    sicopdescrdespacho: {type: Sequelize.STRING, allowNull: true},
    sicoorgorigem: {type: Sequelize.STRING, allowNull: true},
    sicopdescrorgorgiem: {type: Sequelize.STRING, allowNull: true},
    sicoporgdestino: {type: Sequelize.STRING, allowNull: true},
    sicopdescrorgdestino: {type: Sequelize.STRING, allowNull: true},
    sicoporgdigitador: {type: Sequelize.STRING, allowNull: true},
    sicopdescrorgdigit: {type: Sequelize.STRING, allowNull: true},
    sicopmatrdigitador: {type: Sequelize.STRING, allowNull: true},
    sicopmatrrecebedor: {type: Sequelize.STRING, allowNull: true},
    ctrt: {type: Sequelize.STRING, allowNull: true},
    data: {type: Sequelize.STRING, allowNull: true},
    tecnico: {type: Sequelize.TEXT, allowNull: true},
    anotacao: {type: Sequelize.TEXT, allowNull: true},
    processo: {type: Sequelize.STRING, allowNull: true},
    status: {type: Sequelize.INTEGER, allowNull: false},
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: db.env.DB_PREFIX + '_users',
            key: 'id'
        }
    }

}, {
    hooks: {
        afterCreate(instance, options) {
            Log.create(instance.toJSON(), instance.user_id, db.env.DB_PREFIX + "_respostas");
        },
        afterUpdate(instance, options) {
            Log.update(instance.toJSON(), instance.user_id, db.env.DB_PREFIX + "_respostas");
        },
    }
});

Tramitacao.belongsTo(Processo);
Processo.hasMany(Tramitacao, {as: 'tramitacao'});

Tramitacao.sync();

module.exports = Tramitacao;


