/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */
module.exports = {
    /*  Esta função é responsável por formatar o objeto que será enviado a sessão */
    parse(dado, req) {
        return Object.assign(dado, {role: req.session.user.role, toastr: req.toastr})
    }
}