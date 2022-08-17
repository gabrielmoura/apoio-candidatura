/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const {DataTypes} = require('@sequelize/core');
const Processo = require("./Processo");
const db = require("./database");
const Log = require("../lib/logDatabase");
const User = require("./User");
const Tramitacao = db.connection.define(db.env.DB_PREFIX + "_tramitacoes", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data: {type: DataTypes.STRING, allowNull: true},
    anotacao: {type: DataTypes.TEXT, allowNull: true},
    status: {type: DataTypes.INTEGER, allowNull: false},
    processo_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: db.env.DB_PREFIX + '_processos',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: db.env.DB_PREFIX + '_users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }

}, {
    hooks: {
        afterCreate(instance, options) {
            Log.create(instance.toJSON(), instance.user_id, db.env.DB_PREFIX + "_tramitacoes");
        },
        // afterUpdate(instance, options) {
        //     Log.update(instance.toJSON(), instance.user_id, db.env.DB_PREFIX + "_tramitacoes");
        // },
    }
});
Processo.belongsTo(User, {foreignKey: 'user_id'});
Processo.hasMany(Tramitacao, {as: 'tramitacao', foreignKey: 'processo_id'});
Tramitacao.belongsTo(Processo, {foreignKey: 'processo_id', as: 'processo'});
Tramitacao.belongsTo(User, {foreignKey: 'user_id', as: 'user'});

Tramitacao.sync();

module.exports = Tramitacao;


