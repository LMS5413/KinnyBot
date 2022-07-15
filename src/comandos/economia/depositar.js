const db = require("../../../db");
const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: 'dep',
        aliases: ['depositar', 'deposito'],
        cooldown: 10,
        options: [{
            name: 'quantia',
            type: 'NUMBER',
            description: 'Numero que deseja depositar!',
            required: true,
        }],
    },
    run: async (client, message, args) => {
        let proc = await db.coins.findOne({id: message.user.id})
        const lan = await db.lgs.findOne({guildID: message.user.id})
        let quantia = message.options?.getNumber('quantia')
        if(!lan) {
        if (!proc) return message.reply(`${client.user.username} - Diversão \n Você não tem dinheiro :(. Jogue no daily e ganhe um dinheirinho!`)
        if (quantia <= proc.coinsc) {
            if(proc.coinsc < 0) return message.reply(`${client.user.username} - Erro \n Você não pode depositar esse valor pois esse valor é uma divida!`)
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `😅 Você depositou uma quantia de ${quantia}`)
            let soma = Number(proc.coinsb) + quantia
            let dimi = Number(proc.coinsc) - quantia
            proc.coinsc = dimi
            proc.coinsb = soma
            proc.save()
            message.reply({embeds: [embed]})
        } else {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `Você não tem na carteira essa quantia!`)

            message.reply({embeds: [embed]})
        }
    } else {
        if(lan.lang === 'en') {
            if (!proc) return message.reply(`${client.user.username} - Fun \nYou have no money :(. Play daily and earn a buck!`)
            if (quantia <= proc.coinsc) {
                if(proc.coinsc < 0) return message.reply(`${client.user.username} - Error \n You cannot deposit this amount as that amount is a debt!`)
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Fun`, `😅 You deposited an amount of ${quantia}`)
                let soma = Number(proc.coinsb) + quantia
                let dimi = Number(proc.coinsc) - quantia
                proc.coinsc = dimi
                proc.coinsb = soma
                proc.save()
                message.reply({embeds: [embed]})
            } else {
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Fun`, `You don't have that amount in your wallet!`)
    
                message.reply({embeds: [embed]})
            }
        }
    }
}
}