const db = require('../../../db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        nome: 'toprep',
        aliases: ['topreprank', 'reprank']
    },
    run: async(client, message) => {
        let users = await db.reps.find()
        let lan = await db.lgs.findOne({guildID: message.user.id})
        if(!lan) {
        users = users.sort((a, b) => b.reps - a.reps)
       let top = users.map((value, index) => `🎉 ${index + 1}° \`${client.users.cache.get(`${value.id}`)?.username || "Sem nome"}\` tem ${value.reps} reputações`)
    const embed = new MessageEmbed()
        .setColor('#9900f8')
        .setTitle(`${client.user.username} - Estatisticas`)
        .addField('TOP Reputações', `${top.slice(0, 10).join('\n')}`)
    message.reply({embeds: [embed]})
        } else {
            if(lan.lang === 'en') {
                users = users.sort((a, b) => b.reps - a.reps)
                let top = users.map((value, index) => `🎉 ${index + 1}° \`${client.users.cache.get(`${value.id}`)?.username || "Without nick"}\` has ${value.reps} reputations`)
             const embed = new MessageEmbed()
                 .setColor('#9900f8')
                 .setTitle(`${client.user.username} - Statics`)
                 .addField('TOP Reputations', `${top.slice(0, 10).join('\n')}`)


                 message.reply({embeds: [embed]})
            }
        }
     }
}