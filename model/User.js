/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const Sequelize = require("sequelize");
const connection = require("./database");

const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }, password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
})


User.sync()

module.exports = User
