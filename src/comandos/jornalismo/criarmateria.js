const db = require('../../../db')
const langs = require('../../../langs.json')
module.exports = {
    config: {
        nome: 'criarmateria',
        options: [
            {
                name: 'nome',
                type: 'STRING',
                required: true,
                description: 'Nome do jornal'
            }
        ]
    },
    run: async(client, message, args ) => {
        const lan = await db.lgs.findOne({guildID: message.user.id})
        if(!message.options.getString('nome')) return message.reply(lan && lan.lang === 'en' ? langs.en.noName:langs.pt.noName)
        const jor = await db.empr.findOne({nametolower: args[0].toLowerCase()})
        if(!jor) return message.reply(lan && lan.lang === 'en' ? langs.en.naoexistente:langs.pt.naoexistente)
        let jor2 = jor.jornalistas.map(x => x.id)
        if(message.user.id !== jor.dono) {
        if(!(jor2.some(x => message.user.id.includes(x)))) return message.reply(lan && lan.lang === 'en' ? langs.en.noJornalista:langs.pt.noJornalista)
        }
        let title = message.channel.createMessageCollector({filter: ({author}) => author.id === message.user.id})
        title.on('collect', async ro => {
            
        let meter = message.channel.createMessageCollector({filter: ({author}) => author.id === message.user.id})
        message.reply('Agora digite a noticia')
        meter.on('collect', async me => {
            await db.empr.findOneAndUpdate({nametolower: message.options.getString('nome').toLowerCase()}, {$push: {materias: {titulo: ro.content, materia: me.content, jornal: message.options.getString('nome'), jornalistas: message.user.username}}})
            message.reply('Materia criada com sucesso!')
            meter.stop()
        })
       })
    }
}