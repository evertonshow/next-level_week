//dados do objetos
const proffys = [
  {
    avatar:
      "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    name: "Diego Fernandes",
    whatsapp: 11995417589,
    bio:
      "Entusiasta das melhores tecnologias de química avançada <br /><br /> Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma   das minhas explosões.",
    subject: "Química",
    cost: "20",
    weekday: [0],
    time_from: [720],
    time_to: [1220],
  },
  {
    name: "Mayk Brito",
    avatar:
      "https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
    whatsapp: "11987655432",
    bio:
      "Entusiasta das melhores tecnologias de química avançada.  Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    subject: "Matematica",
    cost: "20",
    weekday: [3],
    time_from: [720],
    time_to: [1220],
  },
  {
    name: "Everton Souza ",
    avatar:
      "https://avatars0.githubusercontent.com/u/60049210?s=400&u=ecd959e4fc569cb2b04c09595258c561e645dc22&v=4",
    whatsapp: "1187655432",
    bio:
      "Trabalhava no transporte, mas o grande sonho era tecnologia adoro o front e estou me encantando pelo back, principalmente o nodejs.Vamoe embarca ness foguete",
    subject: "Matematica",
    cost: "20",
    weekday: [3],
    time_from: [720],
    time_to: [1220],
  },
];

const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação Física",
  "Física",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Química",
];

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

//requerendo o express
const express = require("express");
const app = express();

//invocando o nunjucks
const nunjucks = require("nunjucks");
//configurar nunjucks
nunjucks.configure("src/views", {
  express: app,
  noCache: true,
});

app
  //configurando arquivos estaticos como (css, imagens e script)
  .use(express.static("public"))
  //rotas da aplicação https
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  //porta da url
  .listen(5500);

//funcionalidades

function getSubject(subjectNumber) {
  const position = subjectNumber - 1;
  return subjects[position];
}
function pageLanding(require, response) {
  return response.render("index.html");
}
function pageStudy(req, res) {
  const filter = req.query;
  return res.render("study.html", { proffys, filter, subjects, weekdays });
}
function pageGiveClasses(req, res) {
  const data = req.query;

  //verificando se tem os dados (data)
  const isNotEmpty = Object.keys(data).length !== 0;
  if (isNotEmpty) {
    //pegando os dados colocando na função para ordenar
    data.subject = getSubject(data.subject);

    // Adicionando os dados a lista do proffys
    proffys.push(data);
    return res.redirect("/study");
  }

  //não tendo dados manter a pagina
  return res.render("give-classes.html", { subjects, weekdays });
}
