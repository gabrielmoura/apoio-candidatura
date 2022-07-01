/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const Sequelize = require("sequelize");
const db = require("./database");
const Log = require("../lib/logDatabase");

const Processo = db.connection.define(db.env.DB_PREFIX + '_processos', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    datacomparecimento: {type: Sequelize.STRING, allowNull: true},
    nomebeneficiario: {type: Sequelize.STRING, allowNull: true},
    telefone: {type: Sequelize.STRING, allowNull: true},
    celular: {type: Sequelize.STRING, allowNull: true},
    telefone2: {type: Sequelize.STRING, allowNull: true},
    logradouro: {type: Sequelize.STRING, allowNull: true},
    numero: {type: Sequelize.STRING, allowNull: true},
    complemento: {type: Sequelize.STRING, allowNull: true},
    bairro: {type: Sequelize.STRING, allowNull: true},
    cidade: {type: Sequelize.STRING, allowNull: true},
    cep: {type: Sequelize.STRING, allowNull: true},
    beneficiorequerido: {type: Sequelize.STRING, allowNull: true},
    indicacao: {type: Sequelize.STRING, allowNull: true},
    pendenciadedocumentos: {type: Sequelize.STRING, allowNull: true},
    informacaocomplementar: {type: Sequelize.STRING, allowNull: true},
    enviados: {type: Sequelize.STRING, allowNull: true},
    entrada: {type: Sequelize.STRING, allowNull: true},
    cpf: {type: Sequelize.STRING, allowNull: true},
    senhadocliente: {type: Sequelize.STRING, allowNull: true},
    situacao: {type: Sequelize.STRING, allowNull: true},
    novaentrada: {type: Sequelize.STRING, allowNull: true},
    datapesquisa: {type: Sequelize.STRING, allowNull: true},
    advogadoqueassinou: {type: Sequelize.STRING, allowNull: true},
    pagamento: {type: Sequelize.STRING, allowNull: true},
    email: {type: Sequelize.STRING, allowNull: true},
    avaliacaopericia: {type: Sequelize.STRING, allowNull: true},
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
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    hooks: {
        afterCreate(instance, options) {
            Log.create(instance.toJSON(), instance.user_id, db.env.DB_PREFIX + "_processos");
        },
        afterUpdate(instance, options) {
            Log.update(instance.toJSON(), instance.user_id, db.env.DB_PREFIX + "_processos");
        },
    }
});

Processo.sync();
// Processo.sync({force: true});

module.exports = Processo;