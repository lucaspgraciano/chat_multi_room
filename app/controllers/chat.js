const { emit } = require("../../config/server")

module.exports.iniciaChat = function(application, req, res){

    const dadosForm = req.body
    req.assert('apelido', 'Nome ou apelido é obrigatório.').notEmpty()
    req.assert('apelido', 'Nome ou apelido deve entre 5 e 15 caracteres.').len(5, 15)
    const erros = req.validationErrors()
    if(erros){
        res.render('index', {validacao: erros})
        return
    }
    //validando o nickname

    application.get('io').emit(
        'msgParaCliente',
        {apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat.'})
    //recuperando o obj

    res.render('chat', {dadosForm: dadosForm})
}