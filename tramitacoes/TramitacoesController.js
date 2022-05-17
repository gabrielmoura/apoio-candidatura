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
    Processo.findByPk(id, {include: [{ model: Tramitacao}]
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            res.render("admin/tramitacoes/new",{pergunta: pergunta });
            

        }else{ // Não encontrada
            res.redirect("/");
        }
    });
})


router.get("/admin/tramitacoes/:id", (req, res) => {
    
    Processo.findByPk(req.params.id, {include: [{ model: Tramitacao}]
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

             res.render("admin/tramitacoes/index",{pergunta: pergunta});
        }else{ // Não encontrada
            res.redirect("/");
        }
    });
})



router.get("/admin/tramitacoes/new", adminAuth ,(req ,res) => {  res.render("admin/tramitacoes/new") });

router.post("/admin/tramitacoes/new", adminAuth, (req, res) => {

    Tramitacao.create({
            data: req.body.data,
            carga: req.body.carga,
            ctrt: req.body.ctrt,
            tecnico: req.body.tecnico,
            anotacao: req.body.anotacao,        
            perguntaId: req.body.perguntaId,
            sicopsequencia: req.body.sicopsequencia,
            status: 1
        }).then(() => {
            res.redirect("/admin/tramitacoes/"+req.body.perguntaId);
        }); 
})

router.get("/admin/tramitacao/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/tramitacoes/"+id); 
    }

    Tramitacao.findByPk(id).then(tramitacao => {

        if(tramitacao != undefined){
            res.render("admin/tramitacoes/edit",{tramitacao: tramitacao});
        }else{
            res.redirect("/admin/tramitacoes/"+id);
        }
    }).catch(erro => {
        res.redirect("/admin/tramitacoes/"+id);        
    })
});


router.post("/admin/tramitacoes/update", adminAuth, (req, res) => {
    
    var id = req.body.id;
    var data = req.body.data;
    var carga = req.body.carga;
    var ctrt = req.body.ctrt;
    var tecnico = req.body.tecnico;
    var anotacao = req.body.anotacao;
    var sicopsequencia = req.body.sicopsequencia;

    sicopsequencia
       
        Tramitacao.update({
            
            data: data,
            carga: carga,
            ctrt: ctrt,
            tecnico: tecnico,
            anotacao: anotacao,        
            sicopsequencia: sicopsequencia,
            
            
        },{
            where: {
                id: id
            }
        }).then(() => {
            res.redirect("/admin/tramitacoes/"+id);
        }).catch(err => {
            
            res.redirect("/admin/tramitacoes");
            
        });
    })        

// DESABILITAR A TRAMITAÇÃO COM O STATUS 0 OU 1
router.post("/admin/tramitacao/delete", adminAuth, (req, res) => {
    var id = req.body.id;

    Tramitacao.update({
        status: 0,
    
        },{
        where: {
            id: id
        }
    }).then(() => {
        console.log("atualizou e tentou redirecionar");
        res.redirect("/admin/tramitacoes/"+id);    
    });

});


module.exports = router;