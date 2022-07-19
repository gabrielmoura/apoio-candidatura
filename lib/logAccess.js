/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const Log = require("../model/Log");
module.exports = {
    async access(payload, user_id, subject) {
        Log.create({
            payload: payload,
            user_id: user_id,
            action: 'create',
            subject: subject,
        });
    },
};