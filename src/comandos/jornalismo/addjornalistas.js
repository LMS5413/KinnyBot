const db = require('../../../db')
const langs = require('../../../langs.json')
module.exports = {
    config: {
        nome: 'addjornalistas',
        options: [
            {
                name: 'jornalista',
                type: 'USER',
                required: true,
                description: 'Jornalista que deseja adicionar'
            }
        ]
    },
    run: async(client, message, args ) => {
        const lan = await db.lgs.findOne({guildID: message.user.id})
        const jor = await db.empr.findOne({dono: message.user.id})
        if(!jor) return message.reply(lan && lan.lang === 'en' ? langs.en.existente:langs.pt.naoexistente)
        const reporter = message.options.getUser('jornalista')
        if(!reporter) return message.reply('Mencione o jornalista!')
        await db.empr.findOneAndUpdate({dono: message.user.id}, {$push: {jornalistas: {id: reporter.id, username: reporter.username}}})
        message.reply('Adicionei com sucesso um jornalista!')
    }
}