const db = require("../../../db");
const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: 'depall',
        aliases: ['depositarall', 'depositoall'],
        cooldown: 10
    },
    run: async (client, message) => {
        let proc = await db.coins.findOne({id: message.user.id})
        const lan = await db.lgs.findOne({guildID: message.user.id})
        if(!lan) {
        if (!proc) return message.reply(`${client.user.username} - Diversão \n Você não tem dinheiro :(. Jogue no daily e ganhe um dinheirinho!`)
            if(proc.coinsc <= 0) return message.reply(`${client.user.username} - Erro \n Você não tem dinheiro!`)
        if(proc.coinsc < 0) return message.reply(`${client.user.username} - Erro \n Você tem uma divida!`)
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `😅 Você depositou uma quantia de ${Number(proc.coinsc)} koins`)
        let soma = Number(proc.coinsb + proc.coinsc)
        let dimi = Number(proc.coinsc - proc.coinsc)
           proc.coinsc = dimi
        proc.coinsb = soma
        proc.save()
            message.reply({embeds: [embed]})
        } else {
            if(lan.lang === 'en') {
            if (!proc) return message.reply(`${client.user.username} - Fun \nYou have no money :(. Play daily and earn a buck!`)
            if(proc.coinsc <= 0) return message.reply(`${client.user.username} - Error \n You do not have money!`)
        if(proc.coinsc < 0) return message.reply(`${client.user.username} - Error \nyou have a debt!`)
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Fun`, `😅 You deposited an amount of ${Number(proc.coinsc)} koins`)
        let soma = Number(proc.coinsb + proc.coinsc)
        let dimi = Number(proc.coinsc - proc.coinsc)
           proc.coinsc = dimi
        proc.coinsb = soma
        proc.save()
            message.reply({embeds: [embed]})
            }
        }
    }
}