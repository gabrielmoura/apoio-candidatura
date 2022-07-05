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
                    res.redirect("/admin/users");
                }).catch((err) => {
                    console.log("User catch: " + err);
                    res.redirect("/admin/users");
                });


            } else {
                res.redirect("/admin/users/create");
            }
        });
    },
    edit(req, res) {
        redirectIfNotAdmin(req, res);
        User.findByPk(req.params.id).then(user => {
            res.render("admin/users/edit", nP.parse({user, csrfToken: req.csrfToken()}, req));
        }).catch(e => {
            console.log("User catch: " + e);
            res.redirect("/admin/users");
        })
    },
    update(req, res) {
        if (typeof req.params.id) return res.redirect("/admin/users");
        let {username, password, email, role} = req.body;
        var salt = bcrypt.genSaltSync(10);

        payload = {
            username,
            password:bcrypt.hashSync(password, salt),
            email,
            role
        }
        User.update(payload, {
            where: {
                id: req.params.id
            }
        }).then(r => {
            res.redirect("/admin/users");
        }).catch(e => {
            console.log("User catch: " + e);
            res.redirect("/admin/users");
        });

    }
    ,
};