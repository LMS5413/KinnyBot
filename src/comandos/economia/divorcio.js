const { MessageEmbed } = require('discord.js')
const db = require('../../../db')

module.exports = {
    config: {
        nome: 'divorcio',
        cooldown: 10,
        options: [
            {
                name: "member",
                type: "USER",
                required: true,
                description: "Membro que deseja divorciar"
            }
        ]
    },
    run: async(client, message, args) => {
        let noiva = message.options.getMember('member')
        let casado1 = await db.coins.findOne({id: message.user.id})
        let casado2 = await db.coins.findOne({id: noiva.id})
        const lan = await db.lgs.findOne({guildID: message.user.id})
        if(!lan) {
        if(noiva.id === message.user.id) return message.reply('Você não consegue se divorciar com você mesmo!')
        if(!noiva) return message.reply('Mencione a noiva')
        if(!casado1.casado2) return message.reply('Você não é casado')
        if(casado1.casado2 !== casado2.casado1) return message.reply('Você não pode se divorciar! Apenas a noiva')

        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .addField(`${client.user.username} - Diversão`, `${noiva} Divorciou do <@${casado2.casado2}>!`)
        await db.coins.findOneAndUpdate({ id: message.user.id }, { casado1: "Ninguem", casado2: "Ninguem"});
        await db.coins.findOneAndUpdate({ id: noiva.id}, { casado1: "Ninguem", casado2: "Ninguem"});
        message.reply({embeds: [embed]}) 
        } else {
            if(lan.lang === 'en') {
                if(noiva.id === message.user.id) return message.reply('You can\'t get divorced with yourself!')
                if(!noiva) return message.reply('Mention the bride')
                if(!casado1.casado2) return message.reply('You is not married')
                if(casado1.casado2 !== casado2.casado1) return message.reply('You can\'t get divorced! Just the bride')
        
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Fun`, `${noiva} Divorced from <@${casado2.casado2}>!`)
                await db.coins.findOneAndUpdate({ id: message.user.id }, { casado1: "Ninguem", casado2: "Ninguem"});
                await db.coins.findOneAndUpdate({ id: noiva.id}, { casado1: "Ninguem", casado2: "Ninguem"});
                message.reply({embeds: [embed]}) 
            }
        }


    }
}