/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const User = require("../../model/User");
module.exports = {
    disableUser(req, res) {
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
    enableUser(req, res) {
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
    }
}