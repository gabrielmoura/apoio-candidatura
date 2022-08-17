/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const { DataTypes } = require('@sequelize/core');
const db = require("./database");

const Log = db.connection.define(db.env.DB_PREFIX + '_logs', {
    payload: {
        type: DataTypes.JSON,
        allowNull: false
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
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    action: {
        type: DataTypes.ENUM({
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
