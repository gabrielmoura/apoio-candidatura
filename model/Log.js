/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const Sequelize = require("sequelize");
const db = require("./database");

const Log = db.connection.define(db.env.DB_PREFIX + '_logs', {
    payload: {
        type: Sequelize.JSON,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: db.env.DB_PREFIX + '_users',
            key: 'id'
        },
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false
    },
    action: {
        type: Sequelize.ENUM({
            values: ['create', 'update', 'delete']
        }),
        allowNull: false
    },

}, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
})


Log.sync()

module.exports = Log
