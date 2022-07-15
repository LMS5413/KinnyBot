const { MessageEmbed } = require('discord.js')
const db = require('../../../db')

module.exports = {
    config: {
        nome: 'responde',
        options: [{
            name: 'responde',
            type: 'STRING',
            description: 'Digite a pergunta que deseja que seja respondida!',
            required: true,
        }],
    },
    run: async (client, message, args) => {
        let perguntaa = message.options?.getString('responde')
        const questionEnd = perguntaa?.indexOf('?')+1 || null
        const pergunta = perguntaa?.slice(0, questionEnd)
        const resposta = perguntaa?.slice(questionEnd).trim()
        if(!pergunta && !resposta) return message.reply('Digite: k.responde <pergunta (Argumento falha)> <resposta (Argumento falha)>')
        if(pergunta && !resposta) return message.reply('Digite: k.responde <pergunta (Argumento valido)> <resposta (Argumento falha)>')
        if(!pergunta && resposta) return message.reply('Digite: k.responde <pergunta (Argumento falha)> <resposta (Argumento valido)>')
        if(!pergunta.endsWith('?')) return message.reply('Digite um ? no final da pergunta')
        if(!pergunta) return message.reply('Digite: k.responde <pergunta> <resposta>')
        let res = await db.res.findOne({perguntatolower: `${pergunta.toLowerCase().replace('?', '')}?`})
        if(!res) return message.reply(`Hmmm... Não achei essa pergunta! Veja as pergunta disponiveis! \`${(await db.res.find()).map(x => x.pergunta).join(', ')}\``)
        if(res.especialistas) return message.reply('Essa pergunta foi verificado por especialista e você não pode responder ela!')
        if(res.length >= 5) return message.reply('5 pessoas já responderam essa pergunta!')
        await db.res.findOneAndUpdate({pergunta: `${pergunta.replace('?', '')}?`}, {$push: {respostas: `**${resposta} - ${message.user.username}**`}})
        message.reply(`Pergunta respondida com sucesso! ${res.respostas.length + 1 === 1 ? "Você foi a primeira pessoa a responder essa pergunta!":""}`)
        client.users.cache.get(res.autor).send(`Atenção! O ${message.user.username} respondeu sua pergunta! Veja!`)


    }
}