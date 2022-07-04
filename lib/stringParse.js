/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */
module.exports = {
    //  Recupara apenas os numeros, converte e retorna INTEGER.
    sanitizeInt(str) {
        return parseInt(str.replace(/[^\d]+/g, ''));
    },
    // Formata os numeros de um CPF
    cpfFormater(cpf) {
        return cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4");
    }
}