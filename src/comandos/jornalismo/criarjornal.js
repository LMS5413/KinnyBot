const db = require('../../../db')
const langs = require('../../../langs.json')
module.exports = {
    config: {
        nome: 'criarjornal',
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
        if(!args[0]) return message.reply(lan && lan.lang === 'en' ? langs.en.noName:langs.pt.noName)
        const jor = await db.empr.findOne({nametolower: message.options.getString('nome').toLowerCase()})
        if(jor) return message.reply(lan && lan.lang === 'en' ? langs.en.existente:langs.pt.existente)

        await db.empr.create({name: args[0], nametolower: args[0].toLowerCase(), materias: [], lang: lan && lan.lang === 'en' ? 'en':'pt', dono: message.user.id})
        message.reply(lan && lan.lang == 'en' ? langs.en.sucess.replace('name', `**${message.options.getString('nome')}**`).replace('lang', lan && lan.lang === 'en' ? "English":"Portuguesa"):langs.pt.sucess.replace('name', `**${args[0]}**`).replace('lang', lan && lan.lang === 'en' ? "English":"Portuguesa"))
    }
}