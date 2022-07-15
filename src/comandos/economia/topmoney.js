const db = require('../../../db.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: "topmoney",
        cooldown: 10
    },
    run: async (client, message, args) => {
        const lan = await db.lgs.findOne({ guildID: message.guild.id })
       db.coins.find().sort({ coinsc: -1, coinsb: -1 }).exec(async (err, users) => {

            let top = users.map(async (value, index) => `🎉 ${index + 1}° \`${(await client.users.fetch(`${value.id}`))?.username || "Sem nick"} possui uma quantia de ${value.coinsc + value.coinsb} Koins\``)
            top = await Promise.all(top)
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Estatisticas`)
                .addField('Tops Koins', `${top.slice(0, 10).join('\n')}`)
            message.reply({embeds: [embed]})
})
}
}