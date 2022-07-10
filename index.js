const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const helmet = require("helmet");
const db = require("./model/database");
const Redis = require("ioredis");
const RedisStore = require("connect-redis")(session);
app.redis = new Redis({
    port: process.env.REDIS_PORT || 6379, // Redis port
    host: process.env.REDIS_HOST || "127.0.0.1", // Redis host
    username: process.env.REDIS_USERNAME || "default", // needs Redis >= 6
    password: process.env.REDIS_PASSWORD || "NULL",
    db: process.env.REDIS_DB || 0, // Defaults to 0
});


/*      View Engine        */
app.set('view engine', 'ejs');

/*      UserAgent        */
var useragent = require('express-useragent');
app.use(useragent.express());

/*      Sessão        */
app.use(session({
    secret: process.env.SECRET_KEY,
    credentials: true,
    store: new RedisStore({client: app.redis, prefix: process.env.APP_NAME + ":sess:" || "sess:"}),
    cookie: {
        secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
        maxAge: 30000000,
        httpOnly: true,
        expires: 1000 * 60 * 60 * 24 * 7,
    //    sameSite: "lax",
    },
    resave: false,
    saveUninitialized: false,
    name: process.env.APP_NAME || "GeriADV",
}))

app.use((req, res, next) => {
    //Cria um middleware onde todas as requests passam por ele
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP
        res.redirect(`https://${req.hostname}${req.url}`); //Redireciona pra HTTPS
    else //Se a requisição já é HTTPS
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado
});

/*      Arquivos Estáticos      */
app.use(express.static('public', {maxAge: 3600000 * 24}));

/*      Body Parser      */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*      Controle Header e Cross      */
app.use(helmet({
    contentSecurityPolicy: false,
    // // crossOriginResourcePolicy: false,
    // crossOriginEmbedderPolicy: false
}));

/*      Database        */
db.connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
    console.log(error);
})

/*      Definição de Rotas        */
const webRoutes = require("./routes/web");
const dashRoutes = require("./routes/dash");
const adminRoutes = require("./routes/admin");
const apiRoutes = require("./routes/api");
app.use("/admin", dashRoutes); //Rotas Dash
app.use("/", webRoutes);
app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);


var port = db.env.PORT || 3000;
app.listen(port, function () {
    console.log('Cadastro Computei listening on port %s', port);
});

