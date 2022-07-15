const db = require("../../../db");
module.exports = {
    config: {
        nome: 'bankinny',
        cooldown: 3
    },
    run: async(client, message, args) => {
        let motivo1 = args.slice(1).join(" ")
        let gp = message.mentions.members.first(1)[0]
        if((message.author.id) !== require('../../../config.json').creatorid) {
            message.reply({content: 'Apenas meu desenvolvedor pode executar esse comando!'})
        } else {
            let procm =  await db.ban.findOne({punid: gp})
            if(!procm) {
                await db.ban.create({
                    punid: gp.id,
                    motivo: motivo1
                })
                message.reply('Pronto! Essa pessoa está banida e não pode mais usar meus comandos!')
            } else {
                message.reply('Essa pessoa já esta banida')
            }
        }
    }
}