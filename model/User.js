/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const {DataTypes} = require('@sequelize/core');
const db = require("./database");
const Log = require("../lib/logDatabase");

const User = db.connection.define(db.env.DB_PREFIX + '_users', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM({values: ['disabled', 'enabled']}),
        allowNull: false,
        defaultValue: 'enabled'
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
