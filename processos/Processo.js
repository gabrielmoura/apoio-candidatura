const Sequelize = require("sequelize");
const connection = require("../database/database");

const Processo = connection.define('perguntas',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    processo:{ type: Sequelize.STRING, allowNull: true},
    sicoplogradouro:{ type: Sequelize.STRING, allowNull: true},
    sicopnumerologr:{ type: Sequelize.STRING, allowNull: true},
    sicopcomplemento:{ type: Sequelize.STRING, allowNull: true},
    sicopbairro:{ type: Sequelize.STRING, allowNull: true},
    sicopcidade:{ type: Sequelize.STRING, allowNull: true},
    sicopcep:{ type: Sequelize.STRING, allowNull: true},
    requerente:{ type: Sequelize.STRING, allowNull: true},
    logradouro:{ type: Sequelize.STRING, allowNull: true}, numero:{ type: Sequelize.STRING, allowNull: true}, complemento:{ type: Sequelize.STRING, allowNull: true}, bairro:{ type: Sequelize.STRING, allowNull: true}, cidade:{ type: Sequelize.STRING, allowNull: true}, cep:{ type: Sequelize.STRING, allowNull: true},
    email:{ type: Sequelize.STRING, allowNull: true},
    atividade:{ type: Sequelize.TEXT, allowNull: true},
    atc:{ type: Sequelize.STRING, allowNull: true},
    vagas:{ type: Sequelize.STRING, allowNull: true},
    dataabertura:{ type: Sequelize.STRING, allowNull: true},
    contatorequerente:{ type: Sequelize.STRING, allowNull: true},
    assunto:{ type: Sequelize.STRING, allowNull: true},
    informacaocomplementar:{ type: Sequelize.STRING, allowNull: true},
    datadespacho:{ type: Sequelize.STRING, allowNull: true},
    despacho:{ type: Sequelize.STRING, allowNull: true},
    codigocub:{ type: Sequelize.STRING, allowNull: true},
    latitude:{ type: Sequelize.STRING, allowNull: true},
    longitude:{ type: Sequelize.STRING, allowNull: true},
    status:{ type: Sequelize.INTEGER, allowNull: false},
    situacao:{ type: Sequelize.STRING, allowNull: true},
    datasituacao:{ type: Sequelize.STRING, allowNull: true},    
    cardfile:{ type: Sequelize.TEXT, allowNull: true}
});





Processo.sync();

module.exports = Processo;