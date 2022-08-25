/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const {DataTypes} = require('@sequelize/core');
const db = require("./database");
const Log = require("../lib/logDatabase");
const Queue = require('bull');
const moment = require('moment');

const Processo = db.connection.define(db.env.DB_PREFIX + '_processos', {
    id: {type: DataTypes.BIGINT, autoIncrement: true, allowNull: false, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},// 212 caracteres
    address: {type: DataTypes.STRING},// 121
    cep: {type: DataTypes.STRING},// 51 caracteres
    number: {type: DataTypes.STRING, allowNull: true},
    complement: {type: DataTypes.STRING, allowNull: true},
    district: {type: DataTypes.STRING, allowNull: true},
    city: {type: DataTypes.STRING, allowNull: true},
    tell: {type: DataTypes.STRING},// 663 caracteres
    cpf: {type: DataTypes.STRING},// 55 carateres
    date_of_birth: {type: DataTypes.STRING},// 30 caracteres
    indication: {type: DataTypes.STRING},// 440 caracteres
    benefit: {type: DataTypes.STRING},// 42
    date_of_call: {type: DataTypes.STRING},// //68
    date_of_schedule: {type: DataTypes.STRING},// 51 Data do Agendamento
    time: {type: DataTypes.STRING},// 17 Horario
    reschedule: {type: DataTypes.STRING},// 27 //Reagendamento
    observation: {type: DataTypes.STRING},// 152 //OBS
    candidacy_support: {type: DataTypes.STRING},// Apoio
    contract: {type: DataTypes.STRING},// 83 // COntrato
    status: {type: DataTypes.STRING},// 128
    status_of_observation: {type: DataTypes.STRING},// 127
    status_of_3232: {type: DataTypes.STRING},// //192 (USO EXCLUSIVO DA 3232)

    want_material: {type: DataTypes.STRING, allowNull: true},
    call_status: {type: DataTypes.STRING, allowNull: true},

    status_of_call: {type: DataTypes.STRING}, // Status Caso consiga falar com o cliente.
    unit: {type: DataTypes.STRING}, // Unidade
    source: {type: DataTypes.STRING, allowNull: true}, // Fonte: Origem do dado
    deletedAt: {type: DataTypes.STRING, allowNull: true}, // Quando foi deletado
    deletedStatus: {type: DataTypes.STRING, allowNull: true}, // Motivo que foi deletado.
    employee_of_call:{type: DataTypes.STRING, allowNull: true}, // Funcionário que originou a ligação
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: db.env.DB_PREFIX + '_users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
}, {
    timestamps: false,
    createdAt: true,
    updatedAt: true,
    hooks: {
        afterCreate(instance, options) {
            Log.create(instance.toJSON(), instance.user_id, db.env.DB_PREFIX + "_processos");
        },
        // afterUpdate(instance, options) {
        //     Log.update(instance.toJSON(), instance.user_id, db.env.DB_PREFIX + "_processos");
        // },
    }
});
// Define nome da Coluna que será indexada
Processo.getSearchVector = () => {
    return 'ProcessoText';
};
// Adiciona Coluna, Define os campos, Cria index, Cria TRIGGER
Processo.addFullTextIndex = () => {
    if (db.connection.options.dialect !== 'postgres') {
        console.log('Not creating search index, must be using POSTGRES to do this');
        return;
    }
    job = new Queue(
        `addFullTextIndex-${new Date().getTime()}`,
        `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    );
    var searchFields = ['nomebeneficiario', 'informacaocomplementar', 'indicacao', 'beneficiorequerido', 'logradouro'];
    var vectorName = Processo.getSearchVector();
    console.time('CREATE INDEX ' + vectorName);
    job.process(async (job, done) => {
        db.connection
            .query('ALTER TABLE "' + Processo.tableName + '" ADD COLUMN "' + vectorName + '" TSVECTOR')
            .then(() => {
                job.progress(25);
                return db.connection
                    .query('UPDATE "' + Processo.tableName + '" SET "' + vectorName + '" = to_tsvector(\'english\', ' +
                        searchFields.join(' || \' \' || ') + ')')
                    .then(() => {
                        job.progress(50);
                        return db.connection
                            .query('CREATE INDEX post_search_idx ON "' + Processo.tableName + '" USING gin("' + vectorName + '");')
                            .then(() => {
                                job.progress(75);
                                return db.connection
                                    .query('CREATE TRIGGER post_vector_update BEFORE INSERT OR UPDATE ON "' +
                                        Processo.tableName + '" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("' +
                                        vectorName + '", \'pg_catalog.english\', ' + searchFields.join(', ') + ')')
                                    .then(() => {
                                        job.progress(100);
                                        console.debug('Criado com Sucesso.')
                                        done();
                                    }).catch((err) => {
                                        console.error(err);
                                        done(new Error('error transcoding'));
                                    });
                            }).catch((err) => {
                                console.error(err);
                                done(new Error('error transcoding'));
                            });
                    }).catch((err) => {
                        console.error(err);
                        done(new Error('error transcoding'));
                    });
            }).catch((err) => {
            console.error(err);
            done(new Error('error transcoding'));
        });
    });
    job.add(null, {removeOnFail: true, removeOnComplete: true});
    console.timeEnd('CREATE INDEX ' + vectorName);
};
Processo.search = query => {
    if (db.connection.options.dialect !== 'postgres') {
        console.log('Search is only implemented on POSTGRES database');
        return;
    }
    return db.connection
        .query('SELECT * FROM "' + Processo.tableName + '" WHERE "' +
            Processo.getSearchVector() + '" @@ plainto_tsquery(\'english\', \'' + query + '\')', Processo)
        .catch(console.error);
};
Processo.sync();
// Processo.sync({force: true});

module.exports = Processo;