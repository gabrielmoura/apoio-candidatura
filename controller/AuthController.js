/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const LogAccess = require("../lib/logAccess");

module.exports = {
    login(req, res) {
        res.render("admin/users/login", {csrfToken: req.csrfToken()});
    },
    authenticate(req, res) {

        var email = req.body.email;
        var password = req.body.password;

        User.findOne({where: {email: email}}).then(user => {
            if (user != undefined) { // Se existe um usuário com esse e-mail
                // Validar senha
                var correct = bcrypt.compareSync(password, user.password);

                if (correct) {
                    payload = {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                    };
                    req.session.user = payload;
                    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                    LogAccess.access(Object.assign(payload, {ip}, {agent: req.useragent}), user.id, 'session');
                    res.redirect("/admin/processos");
                } else {
                    res.redirect("/login");
                }

            } else {
                res.redirect("/login");
            }
        });
    },
    logout(req, res) {
        req.session.user = undefined;
        res.redirect("/");
    }
};