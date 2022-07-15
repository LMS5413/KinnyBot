const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const db = require('../../../db.js')
module.exports = {
    config: {
        nome: 'fortmap',
        cooldown: 10
    },
    run: async(client, message, args) => {
         
        axios.get(`https://fortnite-api.com/v1/map`).then(async response => {
            const lan = await db.lgs.findOne({guildID: message.user.id})
            let img = response.data.data.images.blank
            if(!lan) {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Fortnite`)
                .setDescription('Mapa atual do fortnite:')
                .setImage(img)

            message.reply({embeds: [embed]})
            } else {
                if(lan.lang === 'en') {
                    const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Fortnite`)
                    .setDescription('Current fortnite map:')
                    .setImage(img)
    
                message.reply({embeds: [embed]})
                }
            }

        })
    }
}