const express = require("express");
const router = express.Router();

const adminAuth = require("../middlewares/adminAuth");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Processo = require("./Processo");
const Tramitacao = require("../tramitacoes/Tramitacao");

// Rotas
router.get("/admin/processos", adminAuth, (req, res) => {
    Processo.findAll({ 
        limit: 10 ,
        raw: true,
        order:[['id','DESC']],
        where: {
            status: 1
          }})
        .then(processos => {
        res.render("admin/processos/index",{processos: processos})
    });
});

router.get("/admin/processos/new", adminAuth ,(req ,res) => {
    
        res.render("admin/processos/new")
    
});


// Rotas
router.post("/admin/processos/search", adminAuth, (req, res) => {

        var searchpor = req.body.searchpor;
        var searchprocesso = req.body.searchprocesso;

        if (searchprocesso === ""){

            Processo.findAll({ 
                limit: 0 ,
                raw: true,
                order:[['id','DESC']],
                where: {
                    status: 1
                  }})
                .then(processos => {
                res.render("admin/processos/index",{processos: processos})
            });
     }

        
        if (searchpor === "processo"){

                Processo.findAll({ 
                    raw: true,
                    order:[['id','ASC']],
                    where: {
                        processo: {
                            [Op.substring]: searchprocesso
                        }, 
                        status: 1
                        
                
                    }})
                    .then(processos => {
                    res.render("admin/processos/index",{processos: processos})
                });
         }

         if (searchpor === "requerente"){

            Processo.findAll({ 
                raw: true,
                order:[['id','ASC']],
                where: {
                    requerente: {
                        [Op.substring]: searchprocesso
                    }, 
                    status: 1
                    
            
                }})
                .then(processos => {
                res.render("admin/processos/index",{processos: processos})
            });
     }

     if (searchpor === "complemento"){

            Processo.findAll({ 
                raw: true,
                order:[['id','ASC']],
                where: {
                    complemento: {
                        [Op.substring]: searchprocesso
                    }, 
                    status: 1
                    
            
                }})
                .then(processos => {
                res.render("admin/processos/index",{processos: processos})
            });
     }

     
     if (searchpor === "atividade"){

        Processo.findAll({ 
            raw: true,
            order:[['id','ASC']],
            where: {
                atividade: {
                    [Op.substring]: searchprocesso
                }, 
                status: 1
                
        
            }})
            .then(processos => {
            res.render("admin/processos/index",{processos: processos})
        });
        }

        if (searchpor === "logradouro"){

            Processo.findAll({ 
                raw: true,
                order:[['id','ASC']],
                where: {
                    Logradouro: {
                        [Op.substring]: searchprocesso
                    }, 
                    status: 1
                    
            
                }})
                .then(processos => {
                res.render("admin/processos/index",{processos: processos})
            });
            }

            if (searchpor === "bairro"){

                Processo.findAll({ 
                    raw: true,
                    order:[['id','ASC']],
                    where: {
                        Bairro: {
                            [Op.substring]: searchprocesso
                        }, 
                        status: 1
                        
                
                    }})
                    .then(processos => {
                    res.render("admin/processos/index",{processos: processos})
                });
                }

                if (searchpor === "card"){

                    Processo.findAll({ 
                        raw: true,
                        order:[['id','ASC']],
                        where: {
                            cardfile: {
                                [Op.substring]: searchprocesso
                            }, 
                            status: 1
                            
                    
                        }})
                        .then(processos => {
                        res.render("admin/processos/index",{processos: processos})
                    });
                    }

                    if (searchpor === "situacao"){

                        Processo.findAll({ 
                            raw: true,
                            order:[['id','ASC']],
                            where: {
                                situacao: {
                                    [Op.substring]: searchprocesso
                                }, 
                                status: 1
                                
                        
                            }})
                            .then(processos => {
                            res.render("admin/processos/index",{processos: processos})
                        });
                        }

                        if (searchpor === "ano"){

                            Processo.findAll({ 
                                raw: true,
                                order:[['processo','ASC']],
                                where: {
                                    processo: {
                                        [Op.like]: `%${searchprocesso}`
                                    }, 
                                    status: 1
                                    
                            
                                }})
                                .then(processos => {
                                res.render("admin/processos/index",{processos: processos})
                            });
                            }
 
});

router.get("/admin/processos/new", adminAuth ,(req ,res) => {
    
        res.render("admin/processos/new")
    
});


router.get("/admin/processo/:id", adminAuth, (req ,res) => {
    var id = req.params.id;
    Processo.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            Tramitacao.findAll({
                where: {processo: pergunta.processo},
                order:[['data','DESC']],
                
            }).then(respostas => {
                res.render("/admin/tramitacoes/index",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        }else{ // Não encontrada
            res.redirect("/");
        }
    });
});


router.post("/admin/processos/salvarpergunta", adminAuth ,(req, res) => {
    
        var processo = req.body.processo;
        var requerente = req.body.requerente;
        var logradouro = req.body.logradouro;
        var numero = req.body.numero;
        var complemento = req.body.complemento;
        var bairro = req.body.bairro;
        var cidade = req.body.cidade; 
        var cep = req.body.cep;
        var email = req.body.email;
        var atividade = req.body.atividade;
        var atc = req.body.atc;
        var vagas = req.body.vagas;
        var dataabertura = req.body.dataabertura; 
        var contatorequerente = req.body.contatorequerente;
        var assunto = req.body.assunto;
        var informacaocomplementar = req.body.informacaocomplementar;
        var datadespacho = req.body.datadespacho;
        var despacho = req.body.despacho;
        var codigocub = req.body.codigocub;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var cardfile = req.body.cardfile;
        
        var sicoplogradouro = req.body.sicoplogradouro;
        var sicopnumerologr = req.body.sicopnumerologr;
        var sicopcomplemento = req.body.sicopcomplemento;
        var sicopbairro = req.body.sicopbairro;
        var sicopcidade = req.body.sicopcidade;
        var sicopcep = req.body.sicopcep;
        var situacao = req.body.situacao;
        var datasituacao = req.body.datasituacao;
        
        

        

        Processo.create({
        processo: processo,
        requerente: requerente,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade, 
        cep: cep,
        email: email,
        atividade: atividade,
        atc: atc,
        vagas: vagas,
        dataabertura: dataabertura, 
        contatorequerente: contatorequerente,
        assunto: assunto,
        informacaocomplementar: informacaocomplementar,
        datadespacho: datadespacho,
        despacho: despacho,
        codigocub: codigocub,
        latitude: latitude,
        longitude: longitude,
        situacao: situacao,
        datasituacao: datasituacao,

        sicoplogradouro: sicoplogradouro,
        sicopnumerologr: sicopnumerologr,
        sicopcomplemento: sicopcomplemento,
        sicopbairro: sicopbairro,
        sicopcidade: sicopcidade,
        sicopcep: sicopcep,
        cardfile: cardfile,
        

        status: 1

    }).then(() => {
        console.log("criou e tentou redirecionar");
        res.redirect("/admin/tramitacoes/"+processo);   
    });
});

router.post("/admin/processos/update", adminAuth, (req, res) => {

    var id = req.body.id;
    var processo = req.body.processo;
    var requerente = req.body.requerente;
    var logradouro = req.body.logradouro;
    var numero = req.body.numero;
    var complemento = req.body.complemento;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade; 
    var cep = req.body.cep;
    var email = req.body.email;
    var atividade = req.body.atividade;
    var atc = req.body.atc;
    var vagas = req.body.vagas;
    var dataabertura = req.body.dataabertura; 
    var contatorequerente = req.body.contatorequerente;
    var assunto = req.body.assunto;
    var informacaocomplementar = req.body.informacaocomplementar;
    var datadespacho = req.body.datadespacho;
    var despacho = req.body.despacho;
    var codigocub = req.body.codigocub;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var cardfile = req.body.cardfile;
    var situacao = req.body.situacao;
    var datasituacao = req.body.datasituacao;

    

    var sicoplogradouro = req.body.sicoplogradouro;
    var sicopnumerologr = req.body.sicopnumerologr;
    var sicopcomplemento = req.body.sicopcomplemento;
    var sicopbairro = req.body.sicopbairro;
    var sicopcidade = req.body.sicopcidade;
    var sicopcep = req.body.sicopcep;

    // Está aqui pois não foi possível receber o processo desable
    var numprocesso = req.body.numprocesso


  

    Processo.update({
        processo: processo,
        requerente: requerente,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade, 
        cep: cep,
        email: email,
        atividade: atividade,
        atc: atc,
        vagas: vagas,
        dataabertura: dataabertura, 
        contatorequerente: contatorequerente,
        assunto: assunto,
        informacaocomplementar: informacaocomplementar,
        datadespacho: datadespacho,
        despacho: despacho,
        codigocub: codigocub,
        latitude: latitude,
        longitude: longitude,
        cardfile: cardfile,

        situacao: situacao,
        datasituacao: datasituacao,
        


        sicoplogradouro: sicoplogradouro,
        sicopnumerologr: sicopnumerologr,
        sicopcomplemento: sicopcomplemento,
        sicopbairro: sicopbairro,
        sicopcidade: sicopcidade,
        sicopcep: sicopcep,

        status: 1
    
        },{
        where: {
            id: id
        }
    }).then(() => {
        console.log("atualizou e tentou redirecionar");
           
        //res.redirect("/admin/processos");
        res.redirect("/admin/tramitacoes/"+numprocesso); 
    });

});


router.get("/admin/processos/tramitar/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/processos"); 
    }

    Processo.findByPk(id).then(processo => {

        if(processo != undefined){
            res.render("admin/processos/edit",{processo: processo});
        }else{
            res.redirect("/admin/processos");
        }
    }).catch(erro => {
        res.redirect("/admin/processos");        
    })

    
});





router.get("/admin/processos/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/processos"); 
    }

    Processo.findByPk(id).then(processo => {

        if(processo != undefined){
            res.render("admin/processos/edit",{ processo: processo });
        }else{
            res.redirect("/admin/processos");
        }
    }).catch(erro => {
        res.redirect("/admin/processos");        
    })
});


router.post("/admin/processo/delete", adminAuth, (req, res) => {

    var id = req.body.id;
    var status = req.body.status;

    
    Processo.update({
        status: status,
    
        },{
        where: {
            id: id
        }
    }).then(() => {
        console.log("atualizou e tentou redirecionar");
        res.redirect("/admin/processos");    
    });

});


router.post("/tramitar/delete", (req, res) => {
    var id = req.body.id;
    var perguntaId = req.body.pergunta;
    if(id != undefined){
        if(!isNaN(id)){
            Resposta.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/pergunta/"+perguntaId);
            });
        }else{// NÃO FOR UM NÚMERO
            res.redirect("/pergunta/"+perguntaId);
        }
    }else{ // NULL
        res.redirect("/pergunta/"+perguntaId);
    }
});




module.exports = router;