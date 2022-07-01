/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */
function redirectIfNotAdmin(req, res) {
    if (req.session.user.role == 'user') {
        res.redirect("/");
    }
}

const Log = require("../model/Log");
const nP = require("../lib/normalizeParse");
module.exports = {
    index(req, res) {
        redirectIfNotAdmin(req, res, 'admin');
        Log.findAll().then(log => {
            res.render('admin/log/index', nP.parse({log}, req));
        });
    },

}
