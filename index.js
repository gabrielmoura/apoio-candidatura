const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./model/database");

const webRoutes = require("./routes/web");
const dashRoutes = require("./routes/dash");
const adminRoutes = require("./routes/admin");

// View engine
app.set('view engine', 'ejs');
/*
 *  Sessão
 */
app.use(session({
    secret: "KkVl3SE8tIhHnCca8_FTA",
    cookie: {maxAge: 30000000},
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
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
 *  Database
 */
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
    console.log(error);
})

/*
 *  Definição de Rotas
 */
app.use("/admin", dashRoutes); //Rotas Dash
app.use("/", webRoutes);
app.use("/admin", adminRoutes);


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Cadastro Computei listening on port %s', port);
});

