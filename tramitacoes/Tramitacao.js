const Sequelize = require("sequelize");
const connection = require("../database/database");
const Processo = require("../processos/Processo");

const Tramitacao = connection.define("respostas", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    carga: {type: Sequelize.STRING, allowNull: true},
    
    sicopsequencia: {type: Sequelize.STRING, allowNull: true},
    sicopdatadespacho: {type: Sequelize.STRING, allowNull: true},
    sicopdatarecebimento: {type: Sequelize.STRING, allowNull: true},
    sicopdatasaida: {type: Sequelize.STRING, allowNull: true},
    sicopcoddespacho: {type: Sequelize.STRING, allowNull: true},
    sicopdescrdespacho: {type: Sequelize.STRING, allowNull: true},
    sicoorgorigem: {type: Sequelize.STRING, allowNull: true},
    sicopdescrorgorgiem: {type: Sequelize.STRING, allowNull: true},
    sicoporgdestino: {type: Sequelize.STRING, allowNull: true},
    sicopdescrorgdestino: {type: Sequelize.STRING, allowNull: true},
    sicoporgdigitador: {type: Sequelize.STRING, allowNull: true},
    sicopdescrorgdigit: {type: Sequelize.STRING, allowNull: true},
    sicopmatrdigitador: {type: Sequelize.STRING, allowNull: true},
    sicopmatrrecebedor: {type: Sequelize.STRING, allowNull: true},
    ctrt: { type: Sequelize.STRING, allowNull: true},
    data: { type: Sequelize.STRING, allowNull: true},
    tecnico: { type: Sequelize.TEXT, allowNull: true},
    anotacao: {type: Sequelize.TEXT,allowNull: true},
    processo: {type: Sequelize.STRING, allowNull: true},
    status:{ type: Sequelize.INTEGER, allowNull: false}
    
});

Tramitacao.belongsTo(Processo);
Processo.hasMany(Tramitacao);

Tramitacao.sync();

module.exports = Tramitacao;


