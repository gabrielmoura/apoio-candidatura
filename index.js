const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

const processosController = require("./processos/ProcessosController");
const Processo = require("./processos/Processo");

const tramitacoesController = require("./tramitacoes/TramitacoesController");
const Tramitacao = require("./tramitacoes/Tramitacao");

// const categoriesController = require("./categories/CategoriesController");
const dashboardController = require("./dashboard/DashboardController");
// const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

// View engine
app.set('view engine', 'ejs');
// Sessions
app.use(session({
    secret: "KkVl3SE8tIhHnCca8_FTA",
    cookie: { maxAge: 30000000 },
    resave: true,
    saveUninitialized: true
}))

app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP
        res.redirect(`https://${req.hostname}${req.url}`); //Redireciona pra HTTPS
    else //Se a requisição já é HTTPS
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado
});

// Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

app.use("/", processosController);
app.use("/", tramitacoesController);

// app.use("/", categoriesController);
app.use("/", dashboardController);
// app.use("/", articlesController);
app.use("/", usersController);

app.get("/", (req, res) => {   
    res.redirect("/login");
    })

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Cadastro Computei listening on port %s', port);
});

/* 

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 12
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", { articles: articles, categories: categories });
        });
    });
})

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", { article: article, categories: categories });
            });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
})

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }]
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", { articles: category.articles, categories: categories });
            });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
})

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const Dashboard = require("./dashboard/Dashboard");
const User = require("./users/User");
var moment = require('moment'); // require

 */

