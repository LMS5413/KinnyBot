const db = require('../../../db')

module.exports = {
    config: {
        nome: 'lang',
        options: [{
            name: 'lang',
            type: 'STRING',
            description: 'Linguagem definida pelo usuario (Apenas EN)',
            required: true,
        }],
    },
    run: async(client, message, args) => {
        let lang = await db.lgs.findOne({guildID: message.user.id})
        let list = ['en']
        let lang2 = message.options?.getString('lang')
        if(!lang2) return message.reply(`Linguas disponiveis: ${list.join(", ")}`)
        if(!list.includes(lang2)) return message.reply(`Linguas disponiveis: ${list.join(", ")}`)

        if(!lang) {
            await db.lgs.create({guildID: message.user.id, lang: lang2})
            message.reply('Lingua configurado com sucesso! Caso queira que volte para o portugues e so dar o comando denovo! \n \n**Sabia que você pode contribuir a ajudar a traduzir a kinny para o ingles? Basta chamar o LMS5413 (O meu pai) para ajudar!**')
        } else {
            await db.lgs.findOneAndRemove({guildID: message.user.id})
            message.reply('Lingua resetado com sucesso!')
        }
        
    }
}