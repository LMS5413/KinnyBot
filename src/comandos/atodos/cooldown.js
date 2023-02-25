const db = require('../../../db')
const { MessageEmbed } = require('discord.js')
const parseMilliseconds = require('parse-ms');
module.exports = {
    config: {
        nome: 'cooldown',
        cooldown: 10,
        aliases: ['cd', 'cooldowns'],
        options: [{
            name: 'usuario',
            type: 'USER',
            description: 'User da pessoa',
            required: false,
        }],
    },
    run: async (client, message) => {
        let coins = await db.coins.findOne({ id: message.user.id })
        let lan = await db.lgs.findOne({ guildID: message.guild.id })
        if (!lan) {
            if (!coins) {
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Cooldowns`)
                    .setFields([
                        {name: 'Daily', value: 'O k.daily foi liberado!'},
                        {name: 'Work', value: 'O k.work foi liberado!'},
                        {name: 'Apostar', value: 'O k.apostar foi liberado!'},
                        {name: 'Cassino', value: 'O k.cassino foi liberado!'},
                        {name: 'Multiplicador de koins', value: 'O k.multiplier foi liberado!'},
                    ])
                message.reply({ embeds: [embed] })
            } else {
                const timeout = 8.64e+7
                let tempo = parseMilliseconds(timeout - (Date.now() - coins.dailyCooldown));
                const timeout2 = 1.8e+7
                let tempo2 = parseMilliseconds(timeout2 - (Date.now() - coins.apodown));
                const timeout3 = 3600000
                let tempo3 = parseMilliseconds(timeout3 - (Date.now() - coins.cassdown));
                const timeout4 = 8.64e+7
                let tempo4 = parseMilliseconds(timeout4 - (Date.now() - coins.robdown));
                const timeout5 = 6.048e+8
                let tempo5 = parseMilliseconds(timeout5 - (Date.now() - coins.multidown));
                const timeout6 = 1200000
                let tempo6 = parseMilliseconds(timeout6 - (Date.now() - coins.workCooldown));
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Cooldowns`)
                    .setFields([
                        {name: 'Daily', value: tempo.milliseconds > 0 ? `O k.daily será liberado em ${tempo.hours}h ${tempo.minutes}m ${tempo.seconds}s`: 'O k.daily foi liberado!'},
                        {name: 'Work', value: tempo6.milliseconds > 0 ? `O k.work será liberado em ${tempo6.minutes}m ${tempo6.seconds}s`: 'O k.work foi liberado!'},
                        {name: 'Apostar', value: tempo2.milliseconds > 0 ? `O k.apostar será liberado em ${tempo2.minutes}m ${tempo2.seconds}s`: 'O k.apostar foi liberado!'},
                        {name: 'Cassino', value: tempo3.milliseconds > 0 ? `O k.cassino será liberado em ${tempo3.minutes}m ${tempo3.seconds}s`: 'O k.cassino foi liberado!'},
                        {name: 'Multiplicador de koins', value: tempo5.milliseconds > 0 ? `O k.multiplier será liberado em ${tempo5.hours}h ${tempo5.minutes}m ${tempo5.seconds}s`: 'O k.multiplier foi liberado!'},
                    ])
                message.reply({ embeds: [embed] })
            }
        }
    }
}