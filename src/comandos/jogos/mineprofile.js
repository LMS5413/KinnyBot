const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const db = require('../../../db')
module.exports = {
    config: {
        nome: 'mineprofile',
        cooldown: 10,
        options: [{
            name: 'nick',
            type: 'STRING',
            description: 'Nick do jogador!',
            required: true,
        }],
    },
    run: async(client, message, args) => {
        const lan = await db.lgs.findOne({guildID: message.user.id})
        let nick = message.options?.getString('nick')
        if(!lan) {
        if(nick.toLowerCase() == 'leonardobr54_yt') return message.reply('Você não pode por o nick do criador!')
        axios.get(`https://mc-heads.net/minecraft/profile/${nick}`).then(async request => {
          let mine = request.data
          const embed = new MessageEmbed()
          .setColor('#9900f8')
          .setThumbnail(`https://mc-heads.net/combo/${nick}`)
          .setTitle(`${client.user.username} - Minecraft`)
          .addField('UUID', `${mine.id}`)
          .addField('Historico de nicks', `${mine.name_history?.map(h => h.name).join(' ') || "Não existe historico"}`)
          
          message.reply({embeds: [embed]})
        })
    } else {
        if(lan.lang === 'en') {
            if(nick.toLowerCase() == 'leonardobr54_yt') return message.reply('You cannot nick the creator!')
            axios.get(`https://mc-heads.net/minecraft/profile/${nick}`).then(request => {
              let mine = request.data
              const embed = new MessageEmbed()
              .setColor('#9900f8')
              .setThumbnail(`https://mc-heads.net/combo/${nick}`)
              .setTitle(`${client.user.username} - Minecraft`)
              .addField('UUID', `${mine.id}`)
              .addField('History of nicknames', `${mine.name_history?.map(h => h.name).join(' ') || "There is no history"}`)
              
              message.reply({embeds: [embed]})
            })
        }
    }
    }
}