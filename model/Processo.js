/*
 * Copyright (c) Gabriel Moura 2022.
 * email: gabriel.blx32@gmail.com
 */

const Sequelize = require("sequelize");
const db = require("./database");
const Log = require("../lib/logDatabase");
const Queue = require('bull');

const Processo = db.connection.define(db.env.DB_PREFIX + '_processos', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    datacomparecimento: {type: Sequelize.STRING, allowNull: true},
    nomebeneficiario: {type: Sequelize.STRING, allowNull: true},
    telefone: {type: Sequelize.STRING, allowNull: true},
    celular: {type: Sequelize.STRING, allowNull: true},
    telefone2: {type: Sequelize.STRING, allowNull: true},
    logradouro: {type: Sequelize.STRING, allowNull: true},
    numero: {type: Sequelize.STRING, allowNull: true},
    complemento: {type: Sequelize.STRING, allowNull: true},
    bairro: {type: Sequelize.STRING, allowNull: true},
    cidade: {type: Sequelize.STRING, allowNull: true},
    cep: {type: Sequelize.STRING, allowNull: true},
    beneficiorequerido: {type: Sequelize.STRING, allowNull: true},
    indicacao: {type: Sequelize.STRING, allowNull: true},
    pendenciadedocumentos: {type: Sequelize.STRING, allowNull: true},
    informacaocomplementar: {type: Sequelize.STRING, allowNull: true},
    enviados: {type: Sequelize.STRING, allowNull: true},
    entrada: {type: Sequelize.STRING, allowNull: true},
    cpf: {type: Sequelize.STRING, allowNull: true},
    senhadocliente: {type: Sequelize.STRING, allowNull: true},
    situacao: {type: Sequelize.STRING, allowNull: true},
    novaentrada: {type: Sequelize.STRING, allowNull: true},
    datapesquisa: {type: Sequelize.STRING, allowNull: true},
    advogadoqueassinou: {type: Sequelize.STRING, allowNull: true},
    pagamento: {type: Sequelize.STRING, allowNull: true},
    email: {type: Sequelize.STRING, allowNull: true},
    avaliacaopericia: {type: Sequelize.STRING, allowNull: true},
    status: {type: Sequelize.INTEGER, allowNull: false},
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: db.env.DB_PREFIX + '_users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    unidade: {
        type: Sequelize.STRING,
        allowNull: true
    },
    apoio: {type: Sequelize.STRING, allowNull: true},
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
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