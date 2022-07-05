/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const Sequelize = require("sequelize");
const db = require("./database");
const Log = require("../lib/logDatabase");

const User = db.connection.define(db.env.DB_PREFIX + '_users', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.ENUM({values: ['disabled', 'active']}),
        allowNull: false,
        defaultValue: 'active'
    }
}, {
    timestamps: false,
    createdAt: true,
    updatedAt: false,
    hooks: {
        // afterCreate(instance, options) {
        //     Log.create(instance.toJSON(), instance.user_id, db.env.DB_PREFIX + '_users');
        // },
        // afterUpdate(instance, options) {
        //     Log.update(instance.toJSON(), instance.user_id, db.env.DB_PREFIX + '_users');
        // },
    }
})


User.sync()

module.exports = User
