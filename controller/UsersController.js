/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const nP = require("../lib/normalizeParse");
const LogAccess = require("../lib/logAccess");

function redirectIfNotAdmin(req, res) {
    if (req.session.user.role != "admin") {
        res.redirect("/");
    }
}

module.exports = {
    index(req, res) {
        redirectIfNotAdmin(req, res);
        User.findAll().then(users => {
            res.render("admin/users/index", nP.parse({users}, req));
        });
    },
    create(req, res) {
        redirectIfNotAdmin(req, res);
        res.render("admin/users/create", nP.parse({csrfToken: req.csrfToken()}, req));
        // res.render("admin/users/create");
    },
    store(req, res) {
        redirectIfNotAdmin(req, res);
        var email = req.body.email;
        var password = req.body.password;
        var role = req.body.role;

        User.findOne({where: {email: email}}).then(user => {
            if (user == undefined) {

                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);

                User.create({
                    email: email,
                    password: hash,
                    role: role
                }).then(() => {
                    LogAccess.access({email}, req.session.user.id, process.env.DB_PREFIX + '_users');
                    res.redirect("/");
                }).catch((err) => {
                    res.redirect("/");
                });


            } else {
                res.redirect("/admin/users/create");
            }
        });
    },
};