/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const User = require("../../model/User");
module.exports = {
    disableUser() {
        if (typeof req.params.id) return res.status(404).send();
        User.update({status: 'disabled'}, {
            where: {
                id: req.params.id
            }
        }).then(r => {
            res.status(200).send()
        }).catch(e => {
            console.log("User catch: " + e);
            res.status(500).send()
        });
    },
    enableUser() {
        if (typeof req.params.id) return res.status(404).send();
        User.update({status: 'enabled'}, {
            where: {
                id: req.params.id
            }
        }).then(r => {
            res.status(200).send()
        }).catch(e => {
            console.log("User catch: " + e);
            res.status(500).send()
        });
    }
}