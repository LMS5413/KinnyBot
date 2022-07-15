const db = require('../../../db')
const langs = require('../../../langs.json')
module.exports = {
    config: {
        nome: 'removerjornalistas',
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
        if(!jor) return message.reply(lan && lan.lang === 'en' ? langs.en.naoexistente:langs.pt.naoexistente)
        const reporter = message.options.getUser('jornalista')
        if(!reporter) return message.reply('Mencione o jornalista!')
        if(!jor.jornalistas.map(x => x.id).some(x =>  reporter.id.includes(x))) return message.reply(lan && lan.lang === 'en' ? langs.en.noJornalista:langs.pt.noJornalista)
        await db.empr.findOneAndUpdate({dono: message.user.id}, {$pull: {jornalistas: {id: reporter.id}}})
        message.reply('Removi com sucesso um jornalista!')
    }
}