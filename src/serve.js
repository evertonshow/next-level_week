//requerendo o express
const express = require("express");
const app = express();

//as function que trazem as rotas pro servidor
const {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses,
  redirect,
} = require("./pages");

//invocando o nunjucks
const nunjucks = require("nunjucks");
//configurar nunjucks
nunjucks.configure("src/views", {
  express: app,
  noCache: true,
});

//inicio da confuguração do servidor
app
  //recebendo os dados do req.body
  .use(express.urlencoded({ extended: true }))
  //configurando arquivos estaticos como (css, imagens e script)
  .use(express.static("public"))
  //rotas da aplicação https
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  .get("/conclusion", redirect)
  .post("/save-classes", saveClasses)
  //porta da url
  .listen(5500);
