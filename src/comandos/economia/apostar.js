const { MessageEmbed } = require('discord.js')
const PD = require("probability-distributions");
const parseMilliseconds = require('parse-ms');
const db = require('../../../db.js')
module.exports = {
    config: {
        nome: 'apostar',
        cooldown: 10,
        options: [{
            name: 'quantia',
            type: 'NUMBER',
            description: 'Numero que deseja apostar!',
            required: true,
        }],
    },
    run: async (client, message, args) => {
        const autor = await db.coins.findOne({ id: message.user.id })
        const lan = await db.lgs.findOne({ guildID: message.user.id })
        let quantia = message.options?.getNumber('quantia')
        if (!lan) {
            if(!autor) await db.coins.create({ id: message.user.id, coinsc: 0, coinsb: 0 })
            if (autor.coinsc < Number(quantia)) return message.reply('❌ Você não tem essa quantia')
            const grana = Math.floor(Math.random() * quantia);
            const chance = PD.sample(['5', '10'], 1, true, [0.05, 0.1])
            let som = Number(autor.coinsc + grana)
            let men = Number(autor.coinsc - grana)
            const timeout = 1.8e+7
            if (autor) {
                if (autor.apodown + timeout > Date.now()) {
                    let infh = parseMilliseconds(timeout - (Date.now() - autor.apodown));
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Diversão`, `Você ja apostou! Tente novamente daqui **${infh.hours} horas ${infh.minutes} minutos ${infh.seconds} segundos!**`)
                    !message.isCommand() ? message.reply({ embeds: [embed] }) : message.reply({ embeds: [embed] })
                } else {
                    await db.coins.updateOne({ id: message.user.id }, { apodown: Date.now() })
                    if (`${chance}` === '5') {
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Diversão`, `🤑 Você ganhou ${grana} koins!`)

                        await db.coins.updateOne({ id: message.user.id }, { coinsc: som, apodown: Date.now() })
                        !message.isCommand() ? message.reply({ embeds: [embed] }) : message.reply({ embeds: [embed] })
                    } else if (`${chance}` === '10') {
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Diversão`, `😭 Você perdeu ${grana} koins!`)
                        await db.coins.updateOne({ id: message.user.id }, { coinsc: men, apodown: Date.now() })
                        !message.isCommand() ? message.reply({ embeds: [embed] }) : message.reply({ embeds: [embed] })
                    }
                }
            }
        } else {
            if (lan.lang === 'en') {
                if (autor.coinsc < Number(quantia)) return message.reply('❌ You don \'t have that amount')
                const grana = Math.floor(Math.random() * quantia);
                const chance = PD.sample(['5', '10'], 1, true, [0.05, 0.1])
                let som = Number(autor.coinsc + grana)
                let men = Number(autor.coinsc - grana)
                const timeout = 1.8e+7
                if (autor) {
                    if (autor.apodown + timeout > Date.now()) {
                        let infh = parseMilliseconds(timeout - (Date.now() - autor.apodown));
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Fun`, `You already bet! Try again from here **${infh.hours} hours ${infh.minutes} minutes ${infh.seconds} seconds!**`)
                        !message.isCommand() ? message.reply({ embeds: [embed] }) : message.reply({ embeds: [embed] })
                    } else {
                        await db.coins.updateOne({ id: message.user.id }, { apodown: Date.now() })
                        if (`${chance}` === '5') {
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .addField(`${client.user.username} - Fun`, `🤑 You won ${grana} koins!`)

                            await db.coins.updateOne({ id: message.user.id }, { coinsc: som, apodown: Date.now() })
                            !message.isCommand() ? message.reply({ embeds: [embed] }) : message.reply({ embeds: [embed] })
                        } else if (`${chance}` === '10') {
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .addField(`${client.user.username} - Fun`, `😭 You lost ${grana} koins!`)
                            await db.coins.updateOne({ id: message.user.id }, { coinsc: men, apodown: Date.now() })
                            !message.isCommand() ? message.reply({ embeds: [embed] }) : message.reply({ embeds: [embed] })
                        }
                    }
                }
            }
        }
    }
}
