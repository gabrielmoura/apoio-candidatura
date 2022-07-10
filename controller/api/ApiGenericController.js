/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */
const axios = require('axios');

// Objetivo: https://datatables.net/examples/non_jquery/ajax.html
module.exports = {
    //  Caso esta API pare de funcionar será mais simples a substituição.
    getCep(req, res) {
        let {cep} = req.body;
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(r => {
                if (r.status >= 200 && r.status < 300) {
                    res.json(r.data);
                }
            })
            .catch(e => console.log(e));
    },
}

