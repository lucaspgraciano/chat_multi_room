const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
//importando as ferramentas

const app = express();
//iniciando a aplicação

app.set('view engine', 'ejs')
app.set('views', './app/views')
//configurando as views e a engine ejs

app.use(express.static('./app/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())
//configurando os middleware

consign()
    .then('app/controllers')
    .then('app/models')
    .then('app/routes')
    .into(app)
//autoload das rotas para a aplicação    

module.exports = app;
//exportando a aplicação