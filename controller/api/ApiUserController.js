/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const User = require("../../model/User");
const bcrypt = require("bcryptjs");
module.exports = {
    async disableUser(req, res) {
        if (req.body.id == '') return res.status(412).send();
        if (req.session.role == 'admin') return res.status(401).send();
        User.update({status: 'disabled'}, {
            where: {
                id: req.body.id
            }
        }).then(r => {
            res.status(200).send()
        }).catch(e => {
            console.log("User catch: " + e);
            res.status(500).send()
        });
    },
    async enableUser(req, res) {
        if (req.body.id == '') return res.status(412).send();
        if (req.session.role == 'admin') return res.status(401).send();
        User.update({status: 'enabled'}, {
            where: {
                id: req.body.id
            }
        }).then(r => {
            res.status(200).send()
        }).catch(e => {
            console.log("User catch: " + e);
            res.status(500).send()
        });
    },
    async changePassword(req, res) {
        if (req.body.id == '') return res.status(412).send();

        var salt = bcrypt.genSaltSync(10);
        let password = req.body.password;

        User.update({password: bcrypt.hashSync(password, salt)}, {
            where: {
                id: req.body.id
            }
        }).then(r => {
            res.redirect("/admin/users");
        }).catch(e => {
            console.log("User catch: " + e);
            res.redirect("/admin/users");
        });
    }
}