const app = require('./config/server')
//exportando as configurações do servidor

const server = app.listen(80, function(){
    console.log('SERVER ON')
})
//parametrizando a porta de escuta

const io = require('socket.io').listen(server)
//linkando o websocket com a porta de escuta

app.set('io', io)
//criando uma variavel global atraves do obj express

io.on('connection', function(socket){
    console.log('USUÁRIO SE CONECTOU')

    socket.on('disconnect', function(){
        console.log('USUÁRIO SE DESCONECTOU')
    })

    socket.on('msgParaServidor', function(data){
        socket.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        )//para o emitente
        socket.broadcast.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        )//para os outros users
        //evento de mensagens

        if(parseInt(data.apelido_att) == 0){
            socket.emit(
                'participanteParaClientes', 
                {apelido: data.apelido}
            )//para o emitente
            socket.broadcast.emit(
                'participanteParaClientes', 
                {apelido: data.apelido}
            )//para os outros users
            //evento de participantes
        }
    })
})
//criar a conexao por websocket