const db = require('../../../db.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: "topxp",
        cooldown: 10
    },
    run: async(client, message) => {
        const lan = await db.lgs.findOne({guildID: message.user.id})
            let users = await db.xps.find()
            users = users.sort((a, b) => b.xp - a.xp)
            if(!lan) {
           let top = users.map((value, index) => `🎉 ${index + 1}° \`${client.users.cache.get(`${value.userID}`)?.username || "Sem nome"}\` tem uma quantia de ${value.xp} XP`)
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Estatisticas`)
            .addField('Tops XP', `${top.slice(0, 10).join('\n')}`)
        message.reply({embeds: [embed]})
            } else {
                if(lan.lang === 'en') {
                    let top = users.map((value, index) => `🎉 ${index + 1}° \`${client.users.cache.get(`${value.userID}`)?.username || "Without Nick"}\` have an amount of ${value.xp} XP`)
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .setTitle(`${client.user.username} - Statics`)
                        .addField('XP tops', `${top.slice(0, 10).join('\n')}`)

                        message.reply({embeds: [embed]})
                }
            }
    }
}