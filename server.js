require("dotenv").config(); //Variáveis de ambiente referentes ao arquivo env, dados mais privados, senha do banco de dados, usuário, etc
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit("pronto");
  })
  .catch((e) => console.log(e)); //gerencia o MongoDB e retornau uma promise

const session = require("express-session"); //identificar o computador do cliente, o cookie
const MongoStore = require("connect-mongo"); //sessoes salvas na base de dado
const flash = require("connect-flash"); //mensagens auto destrutivas
//const helmet = require("helmet"); // recomendacao do express
const csrf = require("csurf"); // cria um token pra formulário
const routes = require("./routes"); // rotas em geral
const path = require("path"); //trabalha com caminhos

const {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddleware,
} = require("./src/middlewares/middleware");

//app.use(helmet());
//app.use(helmet.referrerPolicy({ policy: ["origin", "unsafe-url"] }));
app.use(express.urlencoded({ extended: true })); //permite postar formularios para dentro da aplicação
app.use(express.json()); // permitindo também json para dentro da aplicação
app.use(express.static(path.resolve(__dirname, "public"))); // permite acessar arquivos estáticos diretamente, css, img, etc...

const sessionOptions = session({
  secret: "kasdpksdapodsd",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views")); //arquivos que redenriza na tela
app.set("view engine", "ejs"); //engine utilizada para redenrizar

app.use(csrf());
//Middlewares criados
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on("pronto", () => {
  app.listen(3000);
});
