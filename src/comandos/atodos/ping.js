const { MessageEmbed } = require('discord.js')
const db = require('../../../db.js')
module.exports = {
    config: {
        nome: 'ping',
        cooldown: 10,
    },
    run: async(client, message, args) => {
        let lan = await db.lgs.findOne({guildID: message.user.id})
        const start = process.hrtime();
        await db.lgs.findOne({id: message.guild.id})
        const stop = process.hrtime(start);
        const embed2 = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - <a:carregando:800011672122556447> Testando latencia`)
        message.reply({embeds: [embed2], fetchReply: true}).then(async edita => {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Infos`)
                .addField('<:vps:800011671099670538> API', client.ws.ping + ' ms', true)
                .addField('<:rede:800011671145545738> Kinny', edita.createdTimestamp - message.createdTimestamp + ' ms', true)
                .addField(`<:mongodbkin:801203593658105898> ${lan && lan.lang === 'en' ? "Database":"Banco de dados"}`, `${Math.floor(((stop[0] * 1e9) + stop[1]) / 1e6)} ms`, true)
                .addField(`🌋 Lavalink ping (EUA)`, `${(await client.manager.nodes[0].ping()) === Infinity ? "Desligado":await client.manager.nodes[0].ping()} ms`, true)
                .addField(`🌋 Lavalink ping (BR)`, `${(await client.manager.nodes[1].ping()) === Infinity ? "Desligado":await client.manager.nodes[1].ping()} ms`, true)
            setTimeout(() => {
                edita.edit({embeds: [embed]})
            }, 2000)
        })
    }
}