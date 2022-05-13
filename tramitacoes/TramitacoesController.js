const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Tramitacao = require("./Tramitacao");
const Processo = require("../processos/Processo");
const { and } = require("sequelize");


router.get("/admin/tramitacoes/new/:id",(req ,res) => {
    var id = req.params.id;
    Processo.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            Tramitacao.findAll({

                where: {perguntaId: pergunta.id},
                //where: {processo: pergunta.processo},
                order:[ 
                    ['sicopsequencia','DESC'] 
                ]
            }).then(respostas => {
                res.render("admin/tramitacoes/new",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        }else{ // Não encontrada
            res.redirect("/");
        }
    });
})

router.get("/admin/tramitacoes/:id",(req ,res) => {
    var processo = req.params.id;
    Processo.findOne({
        where: {id: processo}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            Tramitacao.findAll({
                where: {
                    [Op.and]: [
                        { perguntaId: pergunta.id }
                        
                      ]
                },
                order:[ 
                    ['sicopsequencia','DESC'] 
                ]
            }).then(respostas => {
                res.render("admin/tramitacoes/index",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        }else{ // Não encontrada
            res.redirect("/");
        }
    });
})



router.get("/admin/tramitacoes/new", adminAuth ,(req ,res) => {  res.render("admin/tramitacoes/new") });

router.post("/admin/tramitacoes/new", adminAuth, (req, res) => {
    

    var perguntaId = req.body.id;
    var data = req.body.data;
    var carga = req.body.carga;
    var ctrt = req.body.ctrt;
    var tecnico = req.body.tecnico;
    var anotacao = req.body.anotacao;
    var processo = req.body.processo;
    var sicopsequencia = req.body.sicopsequencia;

        Tramitacao.create({
            
            data: data,
            carga: carga,
            ctrt: ctrt,
            tecnico: tecnico,
            anotacao: anotacao,        
            perguntaId: perguntaId,
            processo: processo,
            sicopsequencia: sicopsequencia,
            status: 1
        }).then(() => {
            res.redirect("/admin/tramitacoes/"+perguntaId);
        }); 
})

router.get("/admin/tramitacao/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;
    var processo = req.params.processo;

    if(isNaN(id)){
        res.redirect("/admin/tramitacoes/"+id); 
    }

    Tramitacao.findByPk(id).then(tramitacao => {

        if(tramitacao != undefined){
            res.render("admin/tramitacoes/edit",{tramitacao: tramitacao});
        }else{
            res.redirect("/admin/tramitacoes/"+processo);
        }
    }).catch(erro => {
        res.redirect("/admin/tramitacoes/"+processo);        
    })
});


router.post("/admin/tramitacoes/update", adminAuth, (req, res) => {
    
    var id = req.body.id;
    var data = req.body.data;
    var carga = req.body.carga;
    var ctrt = req.body.ctrt;
    var tecnico = req.body.tecnico;
    var anotacao = req.body.anotacao;
    var processo = req.body.processo;
    var sicopsequencia = req.body.sicopsequencia;

    sicopsequencia
       
        Tramitacao.update({
            
            data: data,
            carga: carga,
            ctrt: ctrt,
            tecnico: tecnico,
            anotacao: anotacao,        
            processo: processo,
            sicopsequencia: sicopsequencia,
            
            
        },{
            where: {
                id: id
            }
        }).then(() => {
            res.redirect("/admin/tramitacoes/"+processo);
        }).catch(err => {
            
            res.redirect("/admin/tramitacoes");
            
        });
    })        

// DESABILITAR A TRAMITAÇÃO COM O STATUS 0 OU 1
router.post("/admin/tramitacao/delete", adminAuth, (req, res) => {
    var id = req.body.id;
    var processo = req.body.processo;

    Tramitacao.update({
        status: 0,
    
        },{
        where: {
            id: id
        }
    }).then(() => {
        console.log("atualizou e tentou redirecionar");
        res.redirect("/admin/tramitacoes/"+processo);    
    });

});


module.exports = router;