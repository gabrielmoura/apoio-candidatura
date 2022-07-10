/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

window.getCep = (cep) => {
    axios.post(`/api/cep`, {cep})
        .then(r => {
            if (r.status >= 200 && r.status < 300) {
                document.getElementById('Street').value = r.data.logradouro;
                document.getElementById('City').value = r.data.localidade;
                document.getElementById('District').value = r.data.bairro;
                document.getElementById('State').value = r.data.uf;
            }
        })
        .catch(e => console.log(e));
};
window.getProcessos = () => {
    axios.get('/api/processo')
        .then(r => {
            if (r.status >= 200 && r.status < 300) {
                return r.data;
            }
        })
        .catch(e => console.log(e));
};
window.enableUser = (id) => {
    axios.post('/api/user/enable', {id})
        .then(r => {
            if (r.status >= 200 && r.status < 300) {
                return r.data;
            }
        })
        .catch(e => console.log(e));
};
window.disableUser = (id) => {
    axios.post('/api/user/disable', {id})
        .then(r => {
            if (r.status >= 200 && r.status < 300) {
                return r.data;
            }
        })
        .catch(e => console.log(e));
};