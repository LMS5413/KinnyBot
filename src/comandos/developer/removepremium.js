const db = require("../../../db");
module.exports = {
    config: {
        nome: 'removepremium',
        cooldown: 3
    },
    run: async(client, message, args) => {
        let gp = message.mentions.users.first()
        if(message.author.id !== require('../../../config.json').creatorid) {
            message.reply('Apenas meu desenvolvedor pode executar esse comando!')
        } else {
            let procm =  await db.premi.findOne({groupid: gp.id})
            if(procm) {
                await db.premi.remove({
                    groupid: gp.id,
                })
                message.reply('Pronto! Esse membro não é premium mais')
            } else {
                message.reply('Esse membro não é premium')
            }
        }
    }
}