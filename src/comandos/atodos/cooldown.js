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
                    .addFields
                    .addField('Daily', 'O k.daily foi liberado!')
                    .addField('Apostar', 'O k.apostar foi liberado!')
                    .addField('Cassino', 'O k.cassino foi liberado!')
                    .addField('Roubar', 'O k.roubar foi liberado!')
                    .addField('Work', 'O k.work foi liberado!')
                    .addField('Multiplicador de koins', 'O k.mutiplier foi liberado!')
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
                    .addField('Daily', tempo.milliseconds > 0 ? `Tempo restante **${tempo.hours} horas ${tempo.minutes} minutos ${tempo.seconds} segundos**` : 'O k.daily foi liberado!')
                    .addField('Apostar', tempo2.milliseconds > 0 ? `Tempo restante **${tempo2.hours} horas ${tempo2.minutes} minutos ${tempo2.seconds} segundos**` : 'O k.apostar foi liberado!')
                    .addField('Cassino', tempo3.milliseconds > 0 ? `Tempo restante **${tempo3.hours} horas ${tempo3.minutes} minutos ${tempo3.seconds} segundos**` : 'O k.cassino foi liberado!')
                    .addField('Roubar', tempo4.milliseconds > 0 ? `Tempo restante **${tempo4.hours} horas ${tempo4.minutes} minutos ${tempo4.seconds} segundos**` : 'O k.roubar foi liberado!')
                    .addField('Multiplicador de koins', tempo5.milliseconds > 0 ? `Tempo restante **${tempo5.days} Dias ${tempo5.hours} horas ${tempo5.minutes} minutos ${tempo5.seconds} segundos**` : 'O k.mutiplier foi liberado!')
                    .addField('Work', tempo6.milliseconds > 0 ? `Tempo restante **${tempo6.hours} horas ${tempo6.minutes} minutos ${tempo6.seconds} segundos**` : 'O k.work foi liberado!')
                message.reply({ embeds: [embed] })
            }
        }
    }
}