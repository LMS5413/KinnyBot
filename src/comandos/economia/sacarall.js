const db = require("../../../db");
const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: 'sacall',
        aliases: ['sacarall', 'saqueall'],
        cooldown: 10
    },
    run: async (client, message, args) => {
        let proc = await db.coins.findOne({id: message.user.id})
        if (!proc) return message.reply(`${client.user.username} - Diversão \n Você não tem dinheiro :(. Jogue no daily e ganhe um dinheirinho!`)
        let lan =  await db.lgs.findOne({guildID: message.user.id})
        if(!lan) {
        if(proc.coinsb <= 0) return message.reply(`${client.user.username} - Erro \n Você não tem dinheiro!`)
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `😅 Você sacou uma quantia de ${proc.coinsb} koins`)
        let dimi = proc.coinsb - proc.coinsb
        let soma = proc.coinsc + proc.coinsb
        proc.coinsc = soma
        proc.coinsb = dimi
        proc.save()
            message.reply({embeds: [embed]})
        } else {
            if(lan.lang === 'en') {
                if(proc.coinsb <= 0) return message.reply(`${client.user.username} - Error \nYou do not have money!`)
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Fun`, `😅 You have withdrawn an amount of ${proc.coinsb} koins`)
            let dimi = proc.coinsb - proc.coinsb
            let soma = proc.coinsc + proc.coinsb
            proc.coinsc = soma
            proc.coinsb = dimi
            proc.save()
                message.reply({embeds: [embed]})
            }
    }
}
}