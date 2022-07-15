const db = require("../../../db");
const { MessageEmbed } = require('discord.js')
const parseMilliseconds = require('parse-ms');
module.exports = {
    config: {
        nome: 'work',
        aliases: ['trabalhar'],
        cooldown: 10
    },
    run: async(client, message) => {
        let empregado = await db.coins.findOne({id: message.user.id})
        const lan = await db.lgs.findOne({guildID: message.user.id})
        const timeout = 1200000
        if (!empregado) return message.reply('Você não tem 1 conta')
        const grana = Math.floor(Math.random() * 100);
        if(!lan) {
        let empregos = [
            `🖥️ Você trabalhou como Programador e ganhou ${grana} koins`,
            `🖥️ Você trabalhou como Web desginer para uma empresa de sucesso e ganhou ${grana} koins`,
            `📦 Você trabalhou como Empacotador e ganhou ${grana} koins`,
            `✈️Você trabalhou como Piloto de avião da Latam e ganhou ${grana} koins`,
            `🧑‍🍳 Você trabalhou como Chefe de cozinha e ganhou ${grana} koins`,
            `🧐 Você trabalhou no Procon defendendo consumidores e ganhou ${grana} koins`
        ]
        if (empregado.workCooldown + timeout > Date.now()) {
            let infh = parseMilliseconds(timeout - (Date.now() - empregado.workCooldown));
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `Você trabalhou muito! Seu chefe deu uma folga por **${infh.hours} horas ${infh.minutes} minutos ${infh.seconds} segundos!**`)
            message.reply({embeds: [embed]})
        } else {
            await db.coins.updateOne({id: message.user.id}, {workCooldown: Date.now()})
            const random = empregos[Math.floor(Math.random() * empregos.length)]
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, random)
await db.coins.updateOne({id: message.user.id}, {coinsc: empregado.coinsc + grana, workCooldown: Date.now()})
            message.reply({embeds: [embed]})
        }

        } else {
            if(lan.lang === 'en') {
                let empregos = [
                    `🖥️ You worked as a Programmer and earned ${grana} koins`,
                    `🖥️ You worked as a web designer for a successful company and won ${grana} koins`,
                    `📦 You worked as a Packer and won ${grana} koins`,
                    `✈️ You worked as an airline pilot for Latam and won${grana} koins`,
                    `🧑‍🍳 You worked as a chef and earned ${grana} koins`,
                ]
                if (empregado.workCooldown + timeout > Date.now()) {
                    let infh = parseMilliseconds(timeout - (Date.now() - empregado.workCooldown));
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Diversão`, `You worked hard! Your boss took a break for **${infh.hours} hours ${infh.minutes} minutes ${infh.seconds} seconds!**`)
                    message.reply({embeds: [embed]})
                } else {
                    await db.coins.updateOne({id: message.user.id}, {workCooldown: Date.now()})
                    const random = empregos[Math.floor(Math.random() * empregos.length)]
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Fun`, random)
        await db.coins.updateOne({id: message.user.id}, {coinsc: empregado.coinsc + grana, workCooldown: Date.now()})
                    message.reply({embeds: [embed]})
                }
            }
        }
    }
}