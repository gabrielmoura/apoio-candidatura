/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const Log = require("../model/Log");
module.exports = {
    delete(instance, user_id, model) {
        Log.create({
            payload: instance,
            user_id: user_id,
            action: 'delete',
            subject: model,
        });
    },
    update(instance, user_id, model) {
        Log.create({
            payload: instance,
            user_id: user_id,
            action: 'update',
            subject: model,
        });
    },
    create(instance, user_id, model) {
        Log.create({
            payload: instance,
            user_id: user_id,
            action: 'create',
            subject: model,
        });
    }
};